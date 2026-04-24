import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen } from "lucide-react";

import { MateriaSidebar } from "@/components/materias/MateriaSidebar";
import { MateriaDetailPanel } from "@/components/materias/MateriaDetailPanel";
import { MateriaFormDialog } from "@/components/materias/MateriaFormDialog";
import { AppSidebar } from "@/components/AppSidebar";

type MateriasSearch = {
  selected?: string;
};

export const Route = createFileRoute("/materias")({
  validateSearch: (search: Record<string, unknown>): MateriasSearch => {
    return {
      selected: (search.selected as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Gestión Académica — AcadémicoPro" },
      { name: "description", content: "Gestiona tus materias, calificaciones, tareas y repositorio de archivos." },
    ],
  }),
  component: MateriasPage,
});

function MateriasPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const searchParams = Route.useSearch();
  const selectedId = searchParams.selected || null;
  const setSelectedId = (id: string | null) => navigate({ to: "/materias", search: (p: { selected?: string }) => ({ ...p, selected: id || undefined }) });
  const [formOpen, setFormOpen] = useState(false);


  // Cargar materias
  const { data: materias = [], isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["materias", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("materias")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    // Seleccionar la primera materia automáticamente cuando cargue la lista
    select: (data) => {
      if (data.length > 0 && !selectedId) {
        // no muta estado aquí — se hace en el efecto de abajo
      }
      return data;
    },
  });

  // Autoselección de la primera materia al cargar
  useEffect(() => {
    if (materias.length > 0 && !selectedId) {
      setSelectedId(materias[0].id);
    }
  }, [materias, selectedId]);

  // Cargar notas para calcular el progreso visual de cada materia
  const { data: trabajosConNota = [] } = useQuery({
    enabled: !!user && materias.length > 0,
    queryKey: ["trabajos-todas-notas", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("trabajos")
        .select("materia_id, nota, peso")
        .not("nota", "is", null)
        .not("materia_id", "is", null);
      return data ?? [];
    },
  });

  // Calcular progreso promedio por materia (escala 0-100)
  const progresos = useMemo(() => {
    const map: Record<string, number> = {};
    materias.forEach((m) => {
      const notas = trabajosConNota.filter((t) => t.materia_id === m.id);
      if (!notas.length) { map[m.id] = 0; return; }
      const totalPeso = notas.reduce((s, t) => s + (t.peso ?? 0), 0);
      const promedio = totalPeso > 0
        ? notas.reduce((s, t) => s + (t.nota ?? 0) * (t.peso ?? 0), 0) / totalPeso
        : notas.reduce((s, t) => s + (t.nota ?? 0), 0) / notas.length;
      // Convertir a escala 0-100 (asumiendo notas en escala 0-100)
      map[m.id] = Math.min(100, Math.max(0, promedio));
    });
    return map;
  }, [materias, trabajosConNota]);

  const selectedMateria = materias.find((m) => m.id === selectedId) ?? null;

  if (loading || !user) return null;

  return (
    // Layout de pantalla completa, sin el padding del AppShell
    <div className="min-h-screen flex bg-background">
      {/* Sidebar de navegación global */}
      <AppSidebar />

      {/* Layout master-detail de dos columnas */}
      <div className="flex-1 flex overflow-hidden h-screen">

        {/* Columna izquierda: Lista de materias */}
        <div className="w-72 shrink-0 flex flex-col overflow-hidden border-r border-border">
          <div className="px-4 pt-6 pb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Tu semestre</p>
            <h1 className="font-serif text-2xl mt-0.5">Gestión Académica</h1>
          </div>
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="size-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <MateriaSidebar
              materias={materias}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onCreate={() => setFormOpen(true)}
              progresos={progresos}
            />
          )}
        </div>

        {/* Columna derecha: Detalle de la materia seleccionada */}
        <div className="flex-1 overflow-hidden">
          {selectedMateria ? (
            <MateriaDetailPanel materia={selectedMateria} />
          ) : (
            // Estado vacío cuando no hay materias
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="size-8 text-primary" />
              </div>
              <h2 className="font-serif text-xl mb-2">Selecciona una materia</h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                {materias.length === 0
                  ? "Crea tu primera materia usando el botón 'Nueva' en la barra lateral izquierda."
                  : "Haz clic en una materia de la lista para ver sus detalles."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de creación de materia */}
      {user && (
        <MateriaFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          userId={user.id}
        />
      )}
    </div>
  );
}
