import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, Clock, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { AvanceGaugeChart } from "@/components/ActivityChart";
import { PromedioChart } from "@/components/PomodoroTimer";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AcadémicoPro" },
      { name: "description", content: "KPIs y resumen de tu actividad académica." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    await queryClient.invalidateQueries({ queryKey: ["materias", user?.id] });
    await queryClient.invalidateQueries({ queryKey: ["trabajos-dashboard", user?.id] });
    setTimeout(() => setIsSyncing(false), 600); // Efecto visual
  };


  const { data: materias } = useQuery({
    enabled: !!user,
    queryKey: ["materias", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("materias").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: trabajos } = useQuery({
    enabled: !!user,
    queryKey: ["trabajos-dashboard", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("trabajos").select("id, titulo, estado, fecha_entrega, nota, peso, materia_id");
      if (error) throw error;
      return data ?? [];
    },
  });

  const stats = useMemo(() => {
    const totalMaterias = 19; // Según referencia técnica
    const cursadas = materias?.filter((m) => m.estado === "activo" || m.estado === "archivado").length ?? 0;
    
    const entregados = trabajos?.filter((t) => t.estado === "entrega").length ?? 0;
    const pendientes = trabajos?.filter((t) => t.estado !== "entrega").length ?? 0;

    // Promedio ponderado real desde notas
    const conNota = trabajos?.filter((t) => t.nota != null) ?? [];
    let promedio = 0;
    if (conNota.length > 0) {
      const sumPesos = conNota.reduce((s, t) => s + (Number(t.peso) || 1), 0);
      const sumNotas = conNota.reduce((s, t) => s + (Number(t.nota) || 0) * (Number(t.peso) || 1), 0);
      promedio = sumPesos > 0 ? sumNotas / sumPesos : 0;
    }

    // Alertas: entregas en los próximos 7 días sin entregar
    const hoy = new Date();
    const en7 = new Date(); en7.setDate(hoy.getDate() + 7);
    const alertas = trabajos?.filter((t) => {
      if (!t.fecha_entrega || t.estado === "entrega") return false;
      const f = new Date(t.fecha_entrega);
      return f >= hoy && f <= en7;
    }).length ?? 0;

    return { 
      totalMaterias, 
      cursadas, 
      promedio, 
      pendientes, 
      entregados,
      alertas 
    };
  }, [materias, trabajos]);

  const proximasEntregas = useMemo(() => {
    const hoy = new Date();
    return (trabajos ?? [])
      .filter((t) => t.fecha_entrega && t.estado !== "entrega" && new Date(t.fecha_entrega) >= hoy)
      .sort((a, b) => new Date(a.fecha_entrega!).getTime() - new Date(b.fecha_entrega!).getTime())
      .slice(0, 5);
  }, [trabajos]);

  const materiaName = (id: string | null) => materias?.find((m) => m.id === id)?.nombre ?? "Sin materia";

  if (loading || !user) return null;

  return (
    <AppShell>
      <header className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
          <h1 className="font-serif text-3xl md:text-4xl mt-1">Tu panel académico</h1>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`size-3.5 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Sincronizando..." : "Sincronizar"}
        </button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPI label="Promedio" value={stats.promedio.toFixed(2)} icon={Trophy} tone="success" />
        <KPI 
          label="Materias en curso" 
          value={`${stats.cursadas} / ${stats.totalMaterias}`} 
          icon={BookOpen} 
          tone="warning"
          progress={(stats.cursadas / stats.totalMaterias) * 100}
        />
        <KPI 
          label="Trabajos pendientes" 
          value={`${stats.pendientes} / ${stats.entregados}`} 
          icon={stats.pendientes === 0 ? CheckCircle : Clock} 
          tone={stats.pendientes === 0 ? "success" : undefined}
        />
        <KPI label="Alertas (7 días)" value={String(stats.alertas)} icon={AlertTriangle} tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Avance general</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <AvanceGaugeChart />
          </CardContent>
        </Card>
        <PromedioChart />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl">Próximas entregas</CardTitle>
        </CardHeader>
        <CardContent>
          {proximasEntregas.length === 0 ? (
            <div className="text-sm text-muted-foreground py-8 text-center">
              No hay entregas próximas. Crea trabajos con fecha de entrega para verlos aquí.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {proximasEntregas.map((t) => {
                const fecha = new Date(t.fecha_entrega!);
                const diff = Math.ceil((fecha.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                const urgente = diff <= 3;
                return (
                  <li key={t.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{t.titulo}</div>
                      <div className="text-xs text-muted-foreground">{materiaName(t.materia_id)}</div>
                    </div>
                    <div className={`text-sm font-mono ${urgente ? "text-destructive" : "text-muted-foreground"}`}>
                      {fecha.toLocaleDateString()} · {diff === 0 ? "hoy" : `${diff}d`}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Outlet />
    </AppShell>
  );
}

function KPI({ 
  label, 
  value, 
  icon: Icon, 
  tone,
  progress 
}: { 
  label: string; 
  value: string; 
  icon: typeof BookOpen; 
  tone?: "success" | "warning";
  progress?: number;
}) {
  const toneClass =
    tone === "success" ? "bg-success/10 text-success" :
    tone === "warning" ? "bg-warning/15 text-warning-foreground" :
    "bg-primary/10 text-primary";
  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground uppercase tracking-wide truncate">{label}</div>
            <div className="font-serif text-2xl mt-2 flex items-baseline gap-2">
              {value}
              {progress !== undefined && (
                <span className="text-xs font-sans text-muted-foreground font-normal">
                  ({progress.toFixed(1)}%)
                </span>
              )}
            </div>
            
            {progress !== undefined && (
              <div className="mt-3 h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    tone === "success" ? "bg-success" :
                    tone === "warning" ? "bg-warning" :
                    "bg-primary"
                  }`} 
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
          <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ml-3 ${toneClass}`}>
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
