import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Download, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { generarContenido, humanizarContenido } from "@/server/ai-trabajos";
import { exportarTrabajoWord } from "@/lib/word-export";
import { BibliografiaPanel } from "./BibliografiaPanel";
import { ArchivosPanel } from "./ArchivosPanel";

export function TrabajoDetailSheet({
  trabajoId, open, onOpenChange, onEdit,
}: {
  trabajoId: string | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onEdit: (id: string) => void;
}) {
  const qc = useQueryClient();
  const [contenido, setContenido] = useState("");
  const [humanizado, setHumanizado] = useState("");
  const [busy, setBusy] = useState<null | "gen" | "hum" | "exp">(null);

  const { data: trabajo } = useQuery({
    enabled: !!trabajoId,
    queryKey: ["trabajo", trabajoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trabajos").select("*, materias(nombre, color)")
        .eq("id", trabajoId!).maybeSingle();
      if (error) throw error;
      setContenido(data?.contenido ?? "");
      setHumanizado(data?.contenido_humanizado ?? "");
      return data;
    },
  });

  const { data: refs } = useQuery({
    enabled: !!trabajoId,
    queryKey: ["referencias", trabajoId],
    queryFn: async () => {
      const { data } = await supabase.from("referencias").select("cita_apa")
        .eq("trabajo_id", trabajoId!).order("autores");
      return data ?? [];
    },
  });

  const saveContent = useMutation({
    mutationFn: async (patch: { contenido?: string; contenido_humanizado?: string }) => {
      const { error } = await supabase.from("trabajos").update(patch).eq("id", trabajoId!);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["trabajo", trabajoId] }),
  });

  const delMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("trabajos").delete().eq("id", trabajoId!);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Trabajo eliminado");
      qc.invalidateQueries({ queryKey: ["trabajos"] });
      onOpenChange(false);
    },
  });

  const handleGenerar = async () => {
    if (!trabajo) return;
    setBusy("gen");
    try {
      const res = await generarContenido({ data: {
        titulo: trabajo.titulo, tipo: trabajo.tipo,
        descripcion: trabajo.descripcion ?? undefined,
        instrucciones: trabajo.instrucciones ?? undefined,
        objetivos: trabajo.objetivos ?? undefined,
        palabrasClave: trabajo.palabras_clave ?? undefined,
        paginas: trabajo.paginas_estimadas ?? 5,
      }});
      setContenido(res.contenido);
      await saveContent.mutateAsync({ contenido: res.contenido });
      toast.success("Contenido generado");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error generando");
    } finally { setBusy(null); }
  };

  const handleHumanizar = async () => {
    if (!contenido?.trim()) { toast.error("Genera contenido primero"); return; }
    setBusy("hum");
    try {
      const res = await humanizarContenido({ data: { contenido } });
      setHumanizado(res.contenido);
      await saveContent.mutateAsync({ contenido_humanizado: res.contenido });
      toast.success("Contenido humanizado");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error humanizando");
    } finally { setBusy(null); }
  };

  const handleExportar = async () => {
    if (!trabajo) return;
    setBusy("exp");
    try {
      const texto = humanizado?.trim() || contenido?.trim();
      if (!texto) { toast.error("Sin contenido para exportar"); return; }
      const blob = await exportarTrabajoWord({
        titulo: trabajo.titulo,
        contenido: texto,
        referencias: refs?.map((r) => r.cita_apa ?? "").filter(Boolean) ?? [],
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${trabajo.titulo.replace(/[^a-z0-9]+/gi, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Documento descargado");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error exportando");
    } finally { setBusy(null); }
  };

  if (!trabajo) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <SheetTitle className="font-serif text-2xl">{trabajo.titulo}</SheetTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="secondary" className="capitalize">{trabajo.tipo}</Badge>
                {trabajo.materias && (
                  <Badge style={{ backgroundColor: trabajo.materias.color ?? undefined, color: "white" }}>
                    {trabajo.materias.nombre}
                  </Badge>
                )}
                {trabajo.fecha_entrega && (
                  <Badge variant="outline">
                    Entrega: {new Date(trabajo.fecha_entrega).toLocaleDateString("es-ES")}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => onEdit(trabajo.id)}><Pencil className="size-4" /></Button>
              <Button size="sm" variant="ghost" onClick={() => {
                if (confirm("¿Eliminar este trabajo?")) delMutation.mutate();
              }}><Trash2 className="size-4 text-destructive" /></Button>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="contenido">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="contenido">Contenido</TabsTrigger>
              <TabsTrigger value="bibliografia">Bibliografía</TabsTrigger>
              <TabsTrigger value="archivos">Archivos</TabsTrigger>
            </TabsList>

            <TabsContent value="contenido" className="space-y-4 mt-4">
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleGenerar} disabled={!!busy}>
                  {busy === "gen" ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Sparkles className="size-4 mr-2" />}
                  Generar con IA
                </Button>
                <Button variant="outline" onClick={handleHumanizar} disabled={!!busy || !contenido}>
                  {busy === "hum" ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Wand2 className="size-4 mr-2" />}
                  Humanizar
                </Button>
                <Button variant="outline" onClick={handleExportar} disabled={!!busy}>
                  {busy === "exp" ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Download className="size-4 mr-2" />}
                  Exportar Word
                </Button>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">Borrador (IA)</label>
                  <Button size="sm" variant="ghost" onClick={() => saveContent.mutate({ contenido })}>Guardar</Button>
                </div>
                <Textarea rows={10} value={contenido} onChange={(e) => setContenido(e.target.value)}
                  placeholder="Genera con IA o escribe tu contenido aquí (Markdown: ## Título)..." className="font-mono text-sm" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">Versión humanizada</label>
                  <Button size="sm" variant="ghost" onClick={() => saveContent.mutate({ contenido_humanizado: humanizado })}>Guardar</Button>
                </div>
                <Textarea rows={10} value={humanizado} onChange={(e) => setHumanizado(e.target.value)}
                  placeholder="Aparecerá tras humanizar..." className="font-mono text-sm" />
              </div>
            </TabsContent>

            <TabsContent value="bibliografia" className="mt-4">
              <BibliografiaPanel trabajoId={trabajo.id} />
            </TabsContent>

            <TabsContent value="archivos" className="mt-4">
              <ArchivosPanel trabajoId={trabajo.id} />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
