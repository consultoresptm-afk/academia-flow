import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Materia } from "@/types/materias";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User, Calendar, Info, Hash, GraduationCap, Target, Lightbulb, Trophy } from "lucide-react";


export function InformacionTab({ materia }: { materia: Materia }) {
  const { data: trabajos = [] } = useQuery({
    queryKey: ["materia-notas", materia.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trabajos")
        .select("nota, peso")
        .eq("materia_id", materia.id);
      if (error) throw error;
      return data ?? [];
    },
  });

  const statsGrades = useMemo(() => {
    const conNota = trabajos.filter((t) => t.nota !== null);
    const totalPeso = conNota.reduce((s, t) => s + (Number(t.peso) || 0), 0);
    const promedio = totalPeso > 0
      ? conNota.reduce((s, t) => s + (Number(t.nota) || 0) * (Number(t.peso) || 0), 0) / totalPeso
      : conNota.length > 0
        ? conNota.reduce((s, t) => s + (Number(t.nota) || 0), 0) / conNota.length
        : 0;
    return { promedio, count: conNota.length };
  }, [trabajos]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">

      {/* Cards de Información Rápida */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InfoCard 
          icon={Hash} 
          label="Código de Materia" 
          value={materia.codigo || "MAT-104"} 
        />
        <InfoCard 
          icon={User} 
          label="Docente a Cargo" 
          value={materia.docente || "Jhon Harold Franco Trujillo"} 
        />
        <InfoCard 
          icon={GraduationCap} 
          label="Carga Académica" 
          value={materia.creditos ? `${materia.creditos} Créditos` : "2 Créditos"} 
        />
        <Card className="border-primary/30 bg-primary/10 backdrop-blur-sm group hover:border-primary/50 transition-all duration-300">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-glow-sm">
              <Trophy className="size-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary/80 font-bold">Promedio Actual</p>
              <p className="text-xl font-serif font-bold mt-0.5 text-primary">
                {statsGrades.count > 0 ? statsGrades.promedio.toFixed(2) : "—"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Descripción del Curso */}
        <Card className="border-border/40 bg-muted/10">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Info className="size-4" />
              </div>
              <h3 className="font-serif text-lg font-medium">Descripción del Curso</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {materia.descripcion || "Desarrollar competencias para diseñar e implementar proyectos sostenibles que integren criterios ambientales, sociales y de gobernanza (ASG) en el núcleo de la estrategia empresarial."}
            </p>
          </CardContent>
        </Card>


        {/* Resultados de Aprendizaje */}
        <Card className="border-border/40 bg-primary/5">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Target className="size-4" />
              </div>
              <h3 className="font-serif text-lg font-medium">Resultados de Aprendizaje</h3>
            </div>
            <ul className="space-y-3">
              <LearningOutcome 
                text="Diseño de negocios responsables con impacto positivo en el entorno." 
              />
              <LearningOutcome 
                text="Liderazgo ético orientado a la toma de decisiones sostenibles." 
              />
              <LearningOutcome 
                text="Implementación de estrategias de economía circular en modelos productivos." 
              />
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/80">{label}</p>
          <p className="text-sm font-medium mt-0.5">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function LearningOutcome({ text }: { text: string }) {
  return (
    <li className="flex gap-3 text-sm text-muted-foreground bg-background/50 p-2.5 rounded-lg border border-border/20">
      <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Lightbulb className="size-3 text-primary" />
      </div>
      <span>{text}</span>
    </li>
  );
}

