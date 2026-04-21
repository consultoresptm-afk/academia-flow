import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

const TIPOS = ["parcial", "quiz", "ensayo", "informe", "proyecto", "tarea", "examen final", "exposición"];

type NotaRow = {
  id: string;
  titulo: string;
  tipo: string;
  nota: number | null;
  peso: number | null;
};

export function NotasTab({ materiaId }: { materiaId: string }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NotaRow | null>(null);
  const [form, setForm] = useState({ titulo: "", tipo: "parcial", nota: "", peso: "" });

  const { data: trabajos = [], isLoading } = useQuery({
    queryKey: ["materia-notas", materiaId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("trabajos")
        .select("id, titulo, tipo, nota, peso")
        .eq("materia_id", materiaId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as NotaRow[];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("No autenticado");
      if (!form.titulo.trim()) throw new Error("El título es obligatorio");
      const payload = {
        titulo: form.titulo.trim(),
        tipo: form.tipo,
        nota: form.nota === "" ? null : Number(form.nota),
        peso: form.peso === "" ? null : Number(form.peso),
        materia_id: materiaId,
        user_id: user.id,
      };
      if (editing) {
        const { error } = await supabase.from("trabajos").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("trabajos").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Nota actualizada" : "Evaluación registrada");
      qc.invalidateQueries({ queryKey: ["materia-notas", materiaId] });
      qc.invalidateQueries({ queryKey: ["trabajos-todas-notas"] });
      setOpen(false); setEditing(null);
      setForm({ titulo: "", tipo: "parcial", nota: "", peso: "" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("trabajos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Eliminado");
      qc.invalidateQueries({ queryKey: ["materia-notas", materiaId] });
      qc.invalidateQueries({ queryKey: ["trabajos-todas-notas"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openNew = () => {
    setEditing(null);
    setForm({ titulo: "", tipo: "parcial", nota: "", peso: "" });
    setOpen(true);
  };
  const openEdit = (t: NotaRow) => {
    setEditing(t);
    setForm({
      titulo: t.titulo, tipo: t.tipo,
      nota: t.nota?.toString() ?? "",
      peso: t.peso?.toString() ?? "",
    });
    setOpen(true);
  };

  const conNota = trabajos.filter((t) => t.nota !== null);
  const totalPeso = conNota.reduce((s, t) => s + (t.peso ?? 0), 0);
  const promedio = totalPeso > 0
    ? conNota.reduce((s, t) => s + (t.nota ?? 0) * (t.peso ?? 0), 0) / totalPeso
    : conNota.length > 0
      ? conNota.reduce((s, t) => s + (t.nota ?? 0), 0) / conNota.length
      : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Evaluaciones y notas</h3>
          <p className="text-xs text-muted-foreground">Registra parciales, quices y trabajos con su peso y nota.</p>
        </div>
        <Button size="sm" onClick={openNew} className="gap-1">
          <Plus className="size-4" /> Nueva evaluación
        </Button>
      </div>

      {conNota.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Promedio ponderado</p>
              <p className="font-serif text-4xl font-bold text-primary mt-1">{promedio.toFixed(1)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{conNota.length} con nota · {trabajos.length} totales</p>
              <p className="text-xs text-muted-foreground mt-1">{totalPeso}% del peso registrado</p>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="h-12 bg-muted rounded animate-pulse" />)}</div>
      ) : trabajos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-md">
          <Star className="size-10 text-muted-foreground/30 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">Aún no hay evaluaciones</p>
          <p className="text-xs text-muted-foreground/70 mt-1 mb-3">Crea la primera para empezar a llevar tus notas.</p>
          <Button size="sm" variant="outline" onClick={openNew} className="gap-1">
            <Plus className="size-4" /> Nueva evaluación
          </Button>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Evaluación</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Tipo</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Peso</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">Nota</th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {trabajos.map((t) => (
                <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{t.titulo}</td>
                  <td className="px-3 py-3 text-center">
                    <Badge variant="secondary" className="capitalize text-xs">{t.tipo}</Badge>
                  </td>
                  <td className="px-3 py-3 text-center text-muted-foreground">{t.peso ? `${t.peso}%` : "—"}</td>
                  <td className="px-3 py-3 text-center">
                    {t.nota !== null ? (
                      <span className={`font-bold text-base ${t.nota >= 60 ? "text-green-600" : "text-red-500"}`}>
                        {t.nota.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Sin nota</span>
                    )}
                  </td>
                  <td className="px-2 py-3 text-right">
                    <Button size="icon" variant="ghost" className="size-7" onClick={() => openEdit(t)}>
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="size-7"
                      onClick={() => { if (confirm(`¿Eliminar "${t.titulo}"?`)) remove.mutate(t.id); }}>
                      <Trash2 className="size-3.5 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editing ? "Editar evaluación" : "Nueva evaluación"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Título *</Label>
              <Input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Parcial 1, Quiz Capítulo 3..." />
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TIPOS.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Nota (0-100)</Label>
                <Input type="number" min={0} max={100} step={0.1}
                  value={form.nota} onChange={(e) => setForm({ ...form, nota: e.target.value })}
                  placeholder="Opcional" />
              </div>
              <div>
                <Label>Peso (%)</Label>
                <Input type="number" min={0} max={100} step={0.1}
                  value={form.peso} onChange={(e) => setForm({ ...form, peso: e.target.value })}
                  placeholder="Ej. 30" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => save.mutate()} disabled={save.isPending || !form.titulo.trim()}>
              {save.isPending ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
