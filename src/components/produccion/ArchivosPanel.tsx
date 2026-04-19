import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2, FileText, Loader2, Upload, Download } from "lucide-react";
import { toast } from "sonner";

const BUCKET = "trabajo-archivos";

export function ArchivosPanel({ trabajoId }: { trabajoId: string }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: archivos } = useQuery({
    enabled: !!user,
    queryKey: ["archivos", trabajoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trabajo_archivos")
        .select("*")
        .eq("trabajo_id", trabajoId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const upload = async (file: File) => {
    if (!user) return;
    setUploading(true);
    const path = `${user.id}/${trabajoId}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file);
    if (upErr) {
      toast.error(upErr.message);
      setUploading(false);
      return;
    }
    const { error } = await supabase.from("trabajo_archivos").insert({
      user_id: user.id,
      trabajo_id: trabajoId,
      nombre: file.name,
      storage_path: path,
      tipo: file.type,
      tamanio: file.size,
    });
    setUploading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Archivo subido");
    qc.invalidateQueries({ queryKey: ["archivos", trabajoId] });
  };

  const removeMutation = useMutation({
    mutationFn: async (a: { id: string; storage_path: string }) => {
      await supabase.storage.from(BUCKET).remove([a.storage_path]);
      const { error } = await supabase.from("trabajo_archivos").delete().eq("id", a.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Archivo eliminado");
      qc.invalidateQueries({ queryKey: ["archivos", trabajoId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const descargar = async (path: string, nombre: string) => {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60);
    if (error || !data) {
      toast.error("No se pudo generar el enlace");
      return;
    }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.download = nombre;
    a.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          disabled={uploading}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
          className="cursor-pointer"
        />
        {uploading && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
      </div>

      {archivos?.length ? (
        <div className="space-y-2">
          {archivos.map((a) => (
            <Card key={a.id} className="p-3 flex items-center gap-3">
              <FileText className="size-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{a.nombre}</div>
                <div className="text-xs text-muted-foreground">
                  {((a.tamanio ?? 0) / 1024).toFixed(1)} KB
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => descargar(a.storage_path, a.nombre)}>
                <Download className="size-4" />
              </Button>
              <Button size="sm" variant="ghost"
                onClick={() => removeMutation.mutate({ id: a.id, storage_path: a.storage_path })}>
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-xs text-muted-foreground py-4 text-center border border-dashed rounded-md">
          <Upload className="size-4 mx-auto mb-1 opacity-50" />
          Sube PDFs, imágenes o documentos
        </div>
      )}
    </div>
  );
}
