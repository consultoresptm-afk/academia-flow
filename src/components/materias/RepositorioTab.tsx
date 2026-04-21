import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Trash2, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

const BUCKET = "trabajo-archivos";
const CONTENEDOR_TITULO = "📁 Repositorio de materia";

/**
 * Repositorio de archivos por materia.
 * Sube archivos de cualquier tipo y los asocia a un "trabajo contenedor" autogenerado
 * por materia para reutilizar la tabla trabajo_archivos sin cambios de schema.
 */
export function RepositorioTab({ materiaId }: { materiaId: string }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lista archivos: combina los del trabajo-contenedor + cualquier archivo de trabajos de la materia
  const { data: archivos = [], isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["materia-archivos", materiaId],
    queryFn: async () => {
      const { data: trabajos } = await supabase
        .from("trabajos").select("id, titulo").eq("materia_id", materiaId);
      if (!trabajos?.length) return [];
      const ids = trabajos.map((t) => t.id);
      const { data, error } = await supabase
        .from("trabajo_archivos")
        .select("*, trabajos(titulo)")
        .in("trabajo_id", ids)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  /** Obtiene o crea el trabajo "contenedor" del repositorio para esta materia */
  const ensureContenedor = async (): Promise<string> => {
    if (!user) throw new Error("No autenticado");
    const { data: existing } = await supabase
      .from("trabajos")
      .select("id")
      .eq("materia_id", materiaId)
      .eq("titulo", CONTENEDOR_TITULO)
      .maybeSingle();
    if (existing?.id) return existing.id;
    const { data: created, error } = await supabase
      .from("trabajos")
      .insert({
        user_id: user.id,
        materia_id: materiaId,
        titulo: CONTENEDOR_TITULO,
        tipo: "tarea",
        descripcion: "Carpeta de archivos generales de la materia",
      })
      .select("id")
      .single();
    if (error) throw error;
    return created.id;
  };

  const handleUpload = async (files: FileList) => {
    if (!user || files.length === 0) return;
    setUploading(true);
    let ok = 0;
    try {
      const trabajoId = await ensureContenedor();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          // Sin compresión: aceptamos cualquier tipo tal cual
          const safeName = file.name.replace(/[^\w.\-]/g, "_");
          const path = `${user.id}/${trabajoId}/${Date.now()}-${safeName}`;
          const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file);
          if (upErr) throw upErr;
          const { error } = await supabase.from("trabajo_archivos").insert({
            user_id: user.id,
            trabajo_id: trabajoId,
            nombre: file.name,
            storage_path: path,
            tipo: file.type || "application/octet-stream",
            tamanio: file.size,
          });
          if (error) throw error;
          ok++;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          toast.error(`Error subiendo ${file.name}: ${msg}`);
        }
      }
      if (ok > 0) {
        toast.success(`${ok} archivo(s) subido(s)`);
        qc.invalidateQueries({ queryKey: ["materia-archivos", materiaId] });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  const remove = useMutation({
    mutationFn: async (a: { id: string; storage_path: string }) => {
      await supabase.storage.from(BUCKET).remove([a.storage_path]);
      const { error } = await supabase.from("trabajo_archivos").delete().eq("id", a.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Archivo eliminado");
      qc.invalidateQueries({ queryKey: ["materia-archivos", materiaId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const descargar = async (path: string, nombre: string) => {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60);
    if (error || !data) { toast.error("No se pudo generar el enlace"); return; }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.download = nombre;
    a.click();
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        disabled={uploading}
        onChange={(e) => {
          if (e.target.files?.length) handleUpload(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !uploading) inputRef.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) handleUpload(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-md border-2 border-dashed py-8 px-4 text-center text-sm transition-colors
          ${dragOver ? "border-primary bg-primary/10" : "border-border hover:border-primary/60 hover:bg-muted/30"}
          ${uploading ? "opacity-60 pointer-events-none" : ""}`}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Subiendo...
          </div>
        ) : (
          <>
            <Upload className="size-6 mx-auto mb-2 opacity-60" />
            <div className="font-medium text-foreground mb-0.5">
              Haz clic o arrastra archivos aquí
            </div>
            <div className="text-xs text-muted-foreground">
              Cualquier tipo de archivo: PDF, Word, Excel, imágenes, ZIP, videos…
            </div>
          </>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">{[1,2].map((i) => <div key={i} className="h-14 bg-muted rounded animate-pulse" />)}</div>
      ) : archivos.length === 0 ? (
        <p className="text-xs text-center text-muted-foreground py-4">Aún no hay archivos en esta materia.</p>
      ) : (
        <div className="space-y-2">
          {archivos.map((a) => {
            const trabajoTitulo = (a as { trabajos?: { titulo?: string } }).trabajos?.titulo;
            return (
              <Card key={a.id} className="p-3 flex items-center gap-3">
                <FileText className="size-5 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{a.nombre}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {trabajoTitulo && trabajoTitulo !== CONTENEDOR_TITULO ? `${trabajoTitulo} · ` : ""}
                    {((a.tamanio ?? 0) / 1024).toFixed(1)} KB
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => descargar(a.storage_path, a.nombre)}>
                  <Download className="size-4" />
                </Button>
                <Button size="sm" variant="ghost"
                  onClick={() => { if (confirm(`¿Eliminar "${a.nombre}"?`)) remove.mutate({ id: a.id, storage_path: a.storage_path }); }}>
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
