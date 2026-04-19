import { useDraggable, useDroppable, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export type Trabajo = {
  id: string;
  titulo: string;
  estado: string;
  tipo: string;
  fecha_entrega: string | null;
};

const COLUMNAS = [
  { id: "investigacion", label: "Investigación", color: "bg-muted" },
  { id: "borrador", label: "Borrador", color: "bg-warning/10" },
  { id: "revision", label: "Revisión", color: "bg-primary/10" },
  { id: "entrega", label: "Entrega", color: "bg-success/10" },
];

export function KanbanBoard({
  trabajos, onMove, onSelect,
}: {
  trabajos: Trabajo[];
  onMove: (id: string, estado: string) => void;
  onSelect: (id: string) => void;
}) {
  const handleDragEnd = (e: DragEndEvent) => {
    const id = String(e.active.id);
    const estado = e.over?.id ? String(e.over.id) : null;
    if (estado && COLUMNAS.some((c) => c.id === estado)) onMove(id, estado);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNAS.map((col) => (
          <Column key={col.id} {...col} trabajos={trabajos.filter((t) => t.estado === col.id)} onSelect={onSelect} />
        ))}
      </div>
    </DndContext>
  );
}

function Column({ id, label, color, trabajos, onSelect }: {
  id: string; label: string; color: string; trabajos: Trabajo[]; onSelect: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`rounded-lg p-3 min-h-[300px] transition-colors ${color} ${isOver ? "ring-2 ring-primary" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-sm">{label}</h3>
        <Badge variant="secondary" className="text-xs">{trabajos.length}</Badge>
      </div>
      <div className="space-y-2">
        {trabajos.map((t) => <TrabajoCard key={t.id} trabajo={t} onSelect={onSelect} />)}
      </div>
    </div>
  );
}

function TrabajoCard({ trabajo, onSelect }: { trabajo: Trabajo; onSelect: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: trabajo.id });
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;
  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() => onSelect(trabajo.id)}
      className={`p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="text-sm font-medium line-clamp-2 mb-2">{trabajo.titulo}</div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="capitalize">{trabajo.tipo}</span>
        {trabajo.fecha_entrega && (
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {new Date(trabajo.fecha_entrega).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}
          </span>
        )}
      </div>
    </Card>
  );
}
