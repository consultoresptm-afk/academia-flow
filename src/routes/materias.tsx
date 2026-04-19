import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Trash2, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/materias")({
  head: () => ({
    meta: [
      { title: "Materias — AcadémicoPro" },
      { name: "description", content: "Gestiona tus materias del semestre." },
    ],
  }),
  component: MateriasPage,
});

const COLORS = ["#16a34a", "#0891b2", "#7c3aed", "#dc2626", "#d97706", "#0284c7"];

function MateriasPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const { data: materias, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["materias", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("materias").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("materias").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Materia eliminada");
      qc.invalidateQueries({ queryKey: ["materias"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (loading || !user) return null;

  return (
    <AppShell>
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-muted-foreground">Tu semestre</p>
          <h1 className="font-serif text-3xl md:text-4xl mt-1">Materias</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="size-4 mr-2" />Nueva materia</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Nueva materia</DialogTitle>
            </DialogHeader>
            <MateriaForm onDone={() => { setOpen(false); qc.invalidateQueries({ queryKey: ["materias"] }); }} userId={user.id} />
          </DialogContent>
        </Dialog>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-16"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>
      ) : !materias?.length ? (
        <EmptyState onCreate={() => setOpen(true)} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {materias.map((m) => (
            <Card key={m.id} className="overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-shadow">
              <div className="h-2" style={{ backgroundColor: m.color ?? "#16a34a" }} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl truncate">{m.nombre}</h3>
                    {m.codigo && <p className="text-xs text-muted-foreground mt-0.5">{m.codigo}</p>}
                  </div>
                  <Badge variant={m.estado === "activa" ? "default" : "secondary"}>{m.estado}</Badge>
                </div>
                {m.docente && (
                  <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1.5">
                    <User className="size-3.5" /> {m.docente}
                  </p>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-xs text-muted-foreground">{m.creditos ?? 3} créditos</span>
                  <Button size="sm" variant="ghost" onClick={() => removeMutation.mutate(m.id)} className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center text-center py-16 px-6">
        <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
          <BookOpen className="size-6" />
        </div>
        <h3 className="font-serif text-xl mb-2">Aún no hay materias</h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          Crea tu primera materia para empezar a registrar calificaciones, trabajos y archivos.
        </p>
        <Button onClick={onCreate}><Plus className="size-4 mr-2" />Crear primera materia</Button>
      </CardContent>
    </Card>
  );
}

function MateriaForm({ userId, onDone }: { userId: string; onDone: () => void }) {
  const [form, setForm] = useState({
    nombre: "", codigo: "", docente: "", creditos: 3, color: COLORS[0], descripcion: "",
  });
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("materias").insert({
      user_id: userId,
      nombre: form.nombre,
      codigo: form.codigo || null,
      docente: form.docente || null,
      creditos: form.creditos,
      color: form.color,
      descripcion: form.descripcion || null,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Materia creada");
    onDone();
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="nombre">Nombre *</Label>
        <Input id="nombre" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="codigo">Código</Label>
          <Input id="codigo" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="creditos">Créditos</Label>
          <Input id="creditos" type="number" min={1} max={10} value={form.creditos}
            onChange={(e) => setForm({ ...form, creditos: Number(e.target.value) })} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="docente">Docente</Label>
        <Input id="docente" value={form.docente} onChange={(e) => setForm({ ...form, docente: e.target.value })} />
      </div>
      <div className="space-y-1.5">
        <Label>Color</Label>
        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button key={c} type="button" onClick={() => setForm({ ...form, color: c })}
              className={`size-8 rounded-full border-2 transition-transform ${form.color === c ? "border-foreground scale-110" : "border-transparent"}`}
              style={{ backgroundColor: c }} aria-label={c} />
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="desc">Descripción</Label>
        <Textarea id="desc" rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={busy || !form.nombre}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : "Crear materia"}
        </Button>
      </DialogFooter>
    </form>
  );
}
