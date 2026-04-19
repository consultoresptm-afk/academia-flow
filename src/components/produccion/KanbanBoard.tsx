import {
  useDraggable,
  useDroppable,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
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
  // ✅ Fix: Sensores con activationConstraint para que los clicks funcionen sin conflicto con el drag.
  // Sin esto, cualquier click se interpretaba como inicio de drag y los trabajos no se podían abrir.
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // El drag no inicia hasta que el mouse se mueve al menos 8px
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      // En touch, esperar 200ms antes de activar drag (permite tap/click normales)
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const id = String(e.active.id);
    const estado = e.over?.id ? String(e.over.id) : null;
    if (estado && COLUMNAS.some((c) => c.id === estado)) onMove(id, estado);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNAS.map((col) => (
          <Column
            key={col.id}
            {...col}
            trabajos={trabajos.filter((t) => t.estado === col.id)}
            onSelect={onSelect}
          />
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
    <div
      ref={setNodeRef}
      className={`rounded-lg p-3 min-h-[300px] transition-colors ${color} ${isOver ? "ring-2 ring-primary" : ""}`}
    >
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
      style={style}
      className={`p-0 overflow-hidden hover:shadow-md transition-shadow ${isDragging ? "opacity-50 shadow-lg" : ""}`}
    >
      {/* ✅ Fix: Área de drag separada del área de click.
          El handle de drag (icono ⠿) recibe los listeners del drag,
          y el resto de la tarjeta recibe el onClick. */}
      <div className="flex items-stretch">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center px-2 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors select-none"
          aria-label="Arrastrar trabajo"
        >
          <svg width="8" height="16" viewBox="0 0 8 16" fill="currentColor">
            <circle cx="2" cy="2" r="1.5" /><circle cx="6" cy="2" r="1.5" />
            <circle cx="2" cy="6" r="1.5" /><circle cx="6" cy="6" r="1.5" />
            <circle cx="2" cy="10" r="1.5" /><circle cx="6" cy="10" r="1.5" />
            <circle cx="2" cy="14" r="1.5" /><circle cx="6" cy="14" r="1.5" />
          </svg>
        </div>
        <button
          onClick={() => onSelect(trabajo.id)}
          className="flex-1 p-3 text-left hover:bg-accent/50 transition-colors"
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
        </button>
      </div>
    </Card>
  );
}
