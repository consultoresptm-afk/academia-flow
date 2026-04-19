import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen, User, Calendar, Star, CheckCircle2, Clock, AlertCircle,
  FileText, Download, Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase as sb } from "@/integrations/supabase/client";

const BUCKET = "trabajo-archivos";

type Materia = {
  id: string; nombre: string; codigo: string | null; docente: string | null;
  color: string | null; estado: string; creditos: number | null;
  semestre: string | null; descripcion: string | null;
};

// ── Sección Notas ──────────────────────────────────────────────────────────────
function NotasTab({ materiaId }: { materiaId: string }) {
  const { data: trabajos, isLoading } = useQuery({
    queryKey: ["trabajos-notas", materiaId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trabajos")
        .select("id, titulo, tipo, nota, peso, estado, fecha_entrega")
        .eq("materia_id", materiaId)
        .not("nota", "is", null)
        .order("fecha_entrega");
      if (error) throw error;
      return data ?? [];
    },
  });

  if (isLoading) return <LoadingSkeleton />;

  if (!trabajos?.length) {
    return (
      <EmptyTab icon={Star} message="Aún no hay notas registradas." hint="Las notas aparecen aquí cuando asignas una nota a tus trabajos desde el módulo de Producción." />
    );
  }

  // Calcular promedio ponderado
  const totalPeso = trabajos.reduce((s, t) => s + (t.peso ?? 0), 0);
  const promedio = totalPeso > 0
    ? trabajos.reduce((s, t) => s + (t.nota ?? 0) * (t.peso ?? 0), 0) / totalPeso
    : trabajos.reduce((s, t) => s + (t.nota ?? 0), 0) / trabajos.length;

  return (
    <div className="space-y-4">
      {/* Tarjeta resumen promedio */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Promedio ponderado</p>
            <p className="font-serif text-4xl font-bold text-primary mt-1">{promedio.toFixed(1)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{trabajos.length} evaluaciones</p>
            <p className="text-xs text-muted-foreground mt-1">{totalPeso}% del peso total</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de notas */}
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Trabajo</th>
              <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Tipo</th>
              <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Peso</th>
              <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Nota</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {trabajos.map((t) => (
              <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-medium">{t.titulo}</td>
                <td className="px-3 py-3 text-center">
                  <Badge variant="secondary" className="capitalize text-xs">{t.tipo}</Badge>
                </td>
                <td className="px-3 py-3 text-center text-muted-foreground">{t.peso ? `${t.peso}%` : "—"}</td>
                <td className="px-3 py-3 text-center">
                  <span className={`font-bold text-base ${(t.nota ?? 0) >= 60 ? "text-green-600" : "text-red-500"}`}>
                    {t.nota?.toFixed(1) ?? "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Sección Tareas ─────────────────────────────────────────────────────────────
function TareasTab({ materiaId }: { materiaId: string }) {
  const { data: trabajos, isLoading } = useQuery({
    queryKey: ["trabajos-materia", materiaId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trabajos")
        .select("id, titulo, tipo, estado, fecha_entrega, peso")
        .eq("materia_id", materiaId)
        .order("fecha_entrega");
      if (error) throw error;
      return data ?? [];
    },
  });

  if (isLoading) return <LoadingSkeleton />;
  if (!trabajos?.length) return <EmptyTab icon={CheckCircle2} message="Sin tareas registradas en esta materia." />;

  const grupos = {
    pendiente: trabajos.filter((t) => t.estado === "investigacion" || t.estado === "borrador"),
    revision: trabajos.filter((t) => t.estado === "revision"),
    entregado: trabajos.filter((t) => t.estado === "entrega"),
  };

  const grupos_config = [
    { key: "pendiente" as const, label: "Pendientes", icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
    { key: "revision" as const, label: "En revisión", icon: Clock, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { key: "entregado" as const, label: "Entregados", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/20" },
  ];

  return (
    <div className="space-y-5">
      {grupos_config.map(({ key, label, icon: Icon, color, bg }) => (
        <div key={key}>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-md ${bg} mb-2`}>
            <Icon className={`size-4 ${color}`} />
            <span className={`text-sm font-medium ${color}`}>{label}</span>
            <Badge variant="secondary" className="ml-auto text-xs">{grupos[key].length}</Badge>
          </div>
          {grupos[key].length === 0 ? (
            <p className="text-xs text-muted-foreground px-3 py-1">Sin elementos.</p>
          ) : (
            <div className="space-y-1.5 pl-2">
              {grupos[key].map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-3 py-2 rounded-md border bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.titulo}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground capitalize">{t.tipo}</span>
                      {t.fecha_entrega && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="size-3" />
                          {new Date(t.fecha_entrega).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}
                        </span>
                      )}
                    </div>
                  </div>
                  {t.peso && <span className="text-xs text-muted-foreground shrink-0">{t.peso}%</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Sección Repositorio ────────────────────────────────────────────────────────
function RepositorioTab({ materiaId }: { materiaId: string }) {
  const { data: archivos, isLoading } = useQuery({
    queryKey: ["archivos-materia", materiaId],
    queryFn: async () => {
      // Obtenemos trabajos de esta materia y sus archivos adjuntos
      const { data: trabajos } = await supabase
        .from("trabajos").select("id, titulo").eq("materia_id", materiaId);
      if (!trabajos?.length) return [];
      const ids = trabajos.map((t) => t.id);
      const { data: archivos, error } = await supabase
        .from("trabajo_archivos")
        .select("*, trabajos(titulo)")
        .in("trabajo_id", ids)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return archivos ?? [];
    },
  });

  const descargar = async (path: string, nombre: string) => {
    const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(path, 60);
    if (error || !data) { toast.error("No se pudo generar el enlace"); return; }
    const a = document.createElement("a");
    a.href = data.signedUrl;
    a.download = nombre;
    a.click();
  };

  if (isLoading) return <LoadingSkeleton />;
  if (!archivos?.length) return <EmptyTab icon={FileText} message="Sin archivos en esta materia." hint="Sube archivos a tus trabajos desde el módulo de Producción y aparecerán aquí." />;

  return (
    <div className="space-y-2">
      {archivos.map((a) => (
        <div key={a.id} className="flex items-center gap-3 p-3 rounded-md border bg-card hover:bg-muted/30 transition-colors">
          <FileText className="size-5 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{a.nombre}</p>
            <p className="text-xs text-muted-foreground">
              {(a as any).trabajos?.titulo ?? "—"} · {((a.tamanio ?? 0) / 1024).toFixed(1)} KB
            </p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => descargar(a.storage_path, a.nombre)}>
            <Download className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

// ── Panel principal de detalle ─────────────────────────────────────────────────
export function MateriaDetailPanel({ materia }: { materia: Materia }) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Cabecera del detalle */}
      <div className="px-6 py-5 border-b border-border" style={{ borderTopColor: materia.color ?? "#16a34a", borderTopWidth: 4 }}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-serif text-2xl font-semibold truncate">{materia.nombre}</h2>
              <Badge variant={materia.estado === "activa" ? "default" : "secondary"}>{materia.estado}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              {materia.codigo && (
                <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">{materia.codigo}</span>
              )}
              {materia.docente && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="size-3.5" />{materia.docente}
                </span>
              )}
              {materia.creditos && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <BookOpen className="size-3.5" />{materia.creditos} créditos
                </span>
              )}
              {materia.semestre && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="size-3.5" />{materia.semestre}
                </span>
              )}
            </div>
            {materia.descripcion && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{materia.descripcion}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs de contenido */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <Tabs defaultValue="notas">
          <TabsList className="w-full">
            <TabsTrigger value="notas" className="flex-1">
              <Star className="size-4 mr-2" />Notas
            </TabsTrigger>
            <TabsTrigger value="tareas" className="flex-1">
              <CheckCircle2 className="size-4 mr-2" />Tareas
            </TabsTrigger>
            <TabsTrigger value="repositorio" className="flex-1">
              <FileText className="size-4 mr-2" />Repositorio
            </TabsTrigger>
          </TabsList>
          <TabsContent value="notas" className="mt-4">
            <NotasTab materiaId={materia.id} />
          </TabsContent>
          <TabsContent value="tareas" className="mt-4">
            <TareasTab materiaId={materia.id} />
          </TabsContent>
          <TabsContent value="repositorio" className="mt-4">
            <RepositorioTab materiaId={materia.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ── Helpers UI ─────────────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-3 pt-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-14 rounded-md bg-muted animate-pulse" />
      ))}
    </div>
  );
}

function EmptyTab({ icon: Icon, message, hint }: { icon: typeof Star; message: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <Icon className="size-10 text-muted-foreground/30 mb-3" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
      {hint && <p className="text-xs text-muted-foreground/70 mt-1 max-w-xs">{hint}</p>}
    </div>
  );
}
