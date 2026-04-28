import { Card, CardContent } from "@/components/ui/card";
import { Video, Calendar, Clock, ExternalLink, PlayCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_ENCUENTROS = [
  {
    id: "1",
    fecha: "2026-05-12",
    hora: "18:00 - 20:00",
    tematica: "Introducción a la Estrategia Sostenible y Modelos ASG",
    estado: "programado",
    plataforma: "Teams"
  },
  {
    id: "2",
    fecha: "2026-05-19",
    hora: "18:00 - 20:00",
    tematica: "Análisis de Riesgos Ambientales en la Cadena de Valor",
    estado: "programado",
    plataforma: "Teams"
  },
  {
    id: "3",
    fecha: "2026-04-21",
    hora: "18:30 - 20:30",
    tematica: "Sesión de Nivelación: Fundamentos de Economía Circular",
    estado: "grabado",
    plataforma: "Zoom"
  }
];

export function EncuentrosTab({ materiaId }: { materiaId: string }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Video className="size-5" />
          </div>
          <div>
            <h3 className="font-medium text-lg">Encuentros Sincrónicos</h3>
            <p className="text-xs text-muted-foreground">Sesiones en vivo y biblioteca de grabaciones.</p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary">
          <Calendar className="size-4" /> Calendario Completo
        </Button>
      </div>

      <div className="grid gap-4">
        {MOCK_ENCUENTROS.map((encuentro) => (
          <EncuentroItem key={encuentro.id} encuentro={encuentro} />
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5 border-dashed">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="size-5 text-primary" />
            <span className="text-sm font-medium">¿Necesitas una tutoría personalizada?</span>
          </div>
          <Button variant="link" className="text-primary text-xs h-auto p-0">Solicitar encuentro individual</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function EncuentroItem({ encuentro }: { encuentro: typeof MOCK_ENCUENTROS[0] }) {
  const isProgramado = encuentro.estado === "programado";
  
  return (
    <Card className="border-border/40 bg-card/50 overflow-hidden hover:border-primary/30 transition-all group">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Fecha y Hora */}
          <div className="md:w-48 bg-muted/30 p-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/40">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Calendar className="size-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">{new Date(encuentro.fecha).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-3.5" />
              <span className="text-xs font-medium">{encuentro.hora}</span>
            </div>
          </div>

          {/* Temática y Acción */}
          <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={isProgramado ? "outline" : "secondary"} className={`text-[10px] px-1.5 py-0 ${isProgramado ? 'text-blue-500 border-blue-500/30' : 'text-muted-foreground'}`}>
                  {encuentro.plataforma}
                </Badge>
                {!isProgramado && <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-orange-500 border-orange-500/30">Grabación disponible</Badge>}
              </div>
              <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">{encuentro.tematica}</h4>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isProgramado ? (
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                  <ExternalLink className="size-3.5" /> Unirse a la sesión
                </Button>
              ) : (
                <Button size="sm" variant="secondary" className="gap-2">
                  <PlayCircle className="size-3.5" /> Ver grabación
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

