import { Card, CardContent } from "@/components/ui/card";
import { Video, Calendar, Clock, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EncuentrosTab({ materiaId }: { materiaId: string }) {
  // Por ahora mostramos una interfaz elegante de "No hay encuentros" 
  // ya que no hay una tabla específica en DB, o tal vez se gestionaban externamente.
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Encuentros Sincrónicos</h3>
          <p className="text-xs text-muted-foreground">Accede a las clases en vivo y grabaciones de esta materia.</p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Calendar className="size-4" /> Ver calendario
        </Button>
      </div>

      <Card className="border-dashed border-2 bg-muted/20">
        <CardContent className="p-10 flex flex-col items-center justify-center text-center">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Video className="size-8 text-primary" />
          </div>
          <h4 className="font-serif text-xl mb-2">No hay encuentros programados</h4>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Cuando se programen sesiones sincrónicas o se publiquen enlaces de clases grabadas, aparecerán en este apartado.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="gap-2">
              <Clock className="size-4" /> Ver historial
            </Button>
            <Button className="gap-2">
              <ExternalLink className="size-4" /> Ir a plataforma LMS
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-50 grayscale pointer-events-none">
        <MockEncuentro 
          titulo="Sesión de Bienvenida" 
          fecha="Lunes, 12 de Mayo" 
          hora="6:00 PM" 
          plataforma="Microsoft Teams" 
        />
        <MockEncuentro 
          titulo="Taller Práctico #1" 
          fecha="Miércoles, 14 de Mayo" 
          hora="7:30 PM" 
          plataforma="Zoom" 
        />
      </div>
    </div>
  );
}

function MockEncuentro({ titulo, fecha, hora, plataforma }: any) {
  return (
    <Card className="border-border/40">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline" className="text-[10px] uppercase tracking-tighter">{plataforma}</Badge>
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
        </div>
        <h5 className="font-medium text-sm mb-1">{titulo}</h5>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="size-3" /> {fecha}</span>
          <span className="flex items-center gap-1"><Clock className="size-3" /> {hora}</span>
        </div>
      </CardContent>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
