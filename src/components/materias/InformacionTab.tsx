import { Materia } from "@/types/materias";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User, Calendar, Info, Hash, GraduationCap } from "lucide-react";

export function InformacionTab({ materia }: { materia: Materia }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard 
          icon={User} 
          label="Docente" 
          value={materia.docente || "No especificado"} 
        />
        <InfoCard 
          icon={Hash} 
          label="Código" 
          value={materia.codigo || "No especificado"} 
        />
        <InfoCard 
          icon={GraduationCap} 
          label="Créditos" 
          value={materia.creditos ? `${materia.creditos} Créditos` : "No especificado"} 
        />
        <InfoCard 
          icon={Calendar} 
          label="Semestre" 
          value={materia.semestre || "No especificado"} 
        />
      </div>

      <Card className="border-border/40 bg-muted/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="size-4 text-primary" />
            <h3 className="font-serif text-lg font-medium">Descripción de la materia</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {materia.descripcion || "No hay una descripción disponible para esta materia."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
          <p className="text-sm font-medium mt-0.5">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
