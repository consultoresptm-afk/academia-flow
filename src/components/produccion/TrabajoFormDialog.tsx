import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const TIPOS = ["ensayo", "informe", "proyecto", "monografía", "presentación", "tarea"];

export type TrabajoFormValues = {
  id?: string;
  titulo: string;
  tipo: string;
  materia_id: string | null;
  descripcion: string;
  instrucciones: string;
  objetivos: string;
  palabras_clave: string;
  paginas_estimadas: number;
  fecha_entrega: string;
  peso: string;
};

export function TrabajoFormDialog({
  open, onOpenChange, initial,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Partial<TrabajoFormValues> & { id?: string };
}) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [v, setV] = useState<TrabajoFormValues>({
    titulo: "", tipo: "ensayo", materia_id: null, descripcion: "",
    instrucciones: "", objetivos: "", palabras_clave: "",
    paginas_estimadas: 5, fecha_entrega: "", peso: "",
  });

  useEffect(() => {
    if (open) {
      setV({
        id: initial?.id,
        titulo: initial?.titulo ?? "",
        tipo: initial?.tipo ?? "ensayo",
        materia_id: initial?.materia_id ?? null,
        descripcion: initial?.descripcion ?? "",
        instrucciones: initial?.instrucciones ?? "",
        objetivos: initial?.objetivos ?? "",
        palabras_clave: initial?.palabras_clave ?? "",
        paginas_estimadas: initial?.paginas_estimadas ?? 5,
        fecha_entrega: initial?.fecha_entrega ?? "",
        peso: initial?.peso ?? "",
      });
    }
  }, [open, initial]);

  const { data: materias } = useQuery({
    enabled: !!user && open,
    queryKey: ["materias-list", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("materias").select("id, nombre").order("nombre");
      return data ?? [];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No autenticado");
      const payload = {
        user_id: user.id,
        titulo: v.titulo,
        tipo: v.tipo,
        materia_id: v.materia_id || null,
        descripcion: v.descripcion || null,
        instrucciones: v.instrucciones || null,
        objetivos: v.objetivos || null,
        palabras_clave: v.palabras_clave ? v.palabras_clave.split(",").map((s) => s.trim()).filter(Boolean) : null,
        paginas_estimadas: v.paginas_estimadas,
        fecha_entrega: v.fecha_entrega || null,
        peso: v.peso ? Number(v.peso) : null,
      };
      if (v.id) {
        const { error } = await supabase.from("trabajos").update(payload).eq("id", v.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("trabajos").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(v.id ? "Trabajo actualizado" : "Trabajo creado");
      qc.invalidateQueries({ queryKey: ["trabajos"] });
      onOpenChange(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{v.id ? "Editar trabajo" : "Nuevo trabajo"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Título *</Label>
            <Input value={v.titulo} onChange={(e) => setV({ ...v, titulo: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Tipo</Label>
              <Select value={v.tipo} onValueChange={(x) => setV({ ...v, tipo: x })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TIPOS.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Materia</Label>
              <Select value={v.materia_id ?? "_none"} onValueChange={(x) => setV({ ...v, materia_id: x === "_none" ? null : x })}>
                <SelectTrigger><SelectValue placeholder="Sin materia" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="_none">Sin materia</SelectItem>
                  {materias?.map((m) => <SelectItem key={m.id} value={m.id}>{m.nombre}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Descripción / contexto</Label>
            <Textarea rows={2} value={v.descripcion} onChange={(e) => setV({ ...v, descripcion: e.target.value })} />
          </div>
          <div>
            <Label>Instrucciones del docente</Label>
            <Textarea rows={3} value={v.instrucciones} onChange={(e) => setV({ ...v, instrucciones: e.target.value })} />
          </div>
          <div>
            <Label>Objetivos</Label>
            <Textarea rows={2} value={v.objetivos} onChange={(e) => setV({ ...v, objetivos: e.target.value })} />
          </div>
          <div>
            <Label>Palabras clave (separadas por coma)</Label>
            <Input value={v.palabras_clave} onChange={(e) => setV({ ...v, palabras_clave: e.target.value })} placeholder="educación, tecnología" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Páginas estimadas</Label>
              <Input type="number" min={1} value={v.paginas_estimadas} onChange={(e) => setV({ ...v, paginas_estimadas: Number(e.target.value) })} />
            </div>
            <div>
              <Label>Fecha de entrega</Label>
              <Input type="date" value={v.fecha_entrega} onChange={(e) => setV({ ...v, fecha_entrega: e.target.value })} />
            </div>
            <div>
              <Label>Peso (%)</Label>
              <Input type="number" min={0} max={100} step={0.1} value={v.peso} onChange={(e) => setV({ ...v, peso: e.target.value })} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => save.mutate()} disabled={!v.titulo || save.isPending}>
            {save.isPending ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
