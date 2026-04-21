import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Trophy, Clock, AlertTriangle } from "lucide-react";
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

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

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
    const total = materias?.length ?? 0;
    const activas = materias?.filter((m) => m.estado === "activa").length ?? 0;
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

    return { total, activas, promedio, pendientes, alertas };
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
      <header className="mb-8">
        <p className="text-sm text-muted-foreground">Hola de nuevo,</p>
        <h1 className="font-serif text-3xl md:text-4xl mt-1">Tu panel académico</h1>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPI label="Promedio" value={stats.promedio.toFixed(2)} icon={Trophy} tone="success" />
        <KPI label="Materias activas" value={String(stats.activas)} icon={BookOpen} />
        <KPI label="Trabajos pendientes" value={String(stats.pendientes)} icon={Clock} />
        <KPI label="Alertas" value="0" icon={AlertTriangle} tone="warning" />
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
          <div className="text-sm text-muted-foreground py-8 text-center">
            No hay entregas registradas. Crea materias y trabajos para empezar a verlas aquí.
          </div>
        </CardContent>
      </Card>

      <Outlet />
    </AppShell>
  );
}

function KPI({ label, value, icon: Icon, tone }: { label: string; value: string; icon: typeof BookOpen; tone?: "success" | "warning" }) {
  const toneClass =
    tone === "success" ? "bg-success/10 text-success" :
    tone === "warning" ? "bg-warning/15 text-warning-foreground" :
    "bg-primary/10 text-primary";
  return (
    <Card className="border-border/60">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
            <div className="font-serif text-3xl mt-2">{value}</div>
          </div>
          <div className={`size-10 rounded-lg flex items-center justify-center ${toneClass}`}>
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
