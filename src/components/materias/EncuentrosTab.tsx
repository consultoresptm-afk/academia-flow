import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Calendar, Clock, ExternalLink, PlayCircle, Users, Plus, Trash2, Link as LinkIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

type Encuentro = {
  id: string;
  fecha: string;
  hora: string;
  tematica: string;
  estado: "programado" | "grabado";
  plataforma: string;
  link?: string;
};

const STORAGE_KEY = "academia-flow-encuentros";

export function EncuentrosTab({ materiaId }: { materiaId: string }) {
  const { user } = useAuth();
  const [encuentros, setEncuentros] = useState<Encuentro[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEncuentro, setNewEncuentro] = useState({
    fecha: "",
    hora: "",
    tematica: "",
    plataforma: "Teams",
    link: ""
  });

  // Cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const allEncuentros = JSON.parse(saved);
        // Filtrar por materiaId
        const filtered = allEncuentros.filter((e: any) => e.materiaId === materiaId);
        setEncuentros(filtered);
      } catch (e) {
        console.error("Error parsing encuentros", e);
      }
    }
  }, [materiaId]);

  const saveToStorage = (updatedEncuentros: Encuentro[]) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let allEncuentros = [];
    if (saved) {
      try {
        allEncuentros = JSON.parse(saved);
      } catch (e) {}
    }
    
    // Remover los de esta materia y agregar los nuevos
    const otherEncuentros = allEncuentros.filter((e: any) => e.materiaId !== materiaId);
    const withMateriaId = updatedEncuentros.map(e => ({ ...e, materiaId }));
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...otherEncuentros, ...withMateriaId]));
  };

  const handleAdd = () => {
    if (!newEncuentro.fecha || !newEncuentro.tematica) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    const encuentro: Encuentro = {
      id: Math.random().toString(36).substr(2, 9),
      ...newEncuentro,
      estado: "programado"
    };

    const updated = [encuentro, ...encuentros];
    setEncuentros(updated);
    saveToStorage(updated);
    setIsDialogOpen(false);
    setNewEncuentro({
      fecha: "",
      hora: "",
      tematica: "",
      plataforma: "Teams",
      link: ""
    });
    toast.success("Encuentro programado correctamente");
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este encuentro?")) {
      const updated = encuentros.filter(e => e.id !== id);
      setEncuentros(updated);
      saveToStorage(updated);
      toast.success("Encuentro eliminado");
    }
  };

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
        
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="size-4" /> Nuevo Encuentro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Programar Nuevo Encuentro</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tematica">Temática / Título</Label>
                  <Input 
                    id="tematica" 
                    placeholder="Ej. Taller Práctico de ASG" 
                    value={newEncuentro.tematica}
                    onChange={e => setNewEncuentro({...newEncuentro, tematica: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input 
                      id="fecha" 
                      type="date" 
                      value={newEncuentro.fecha}
                      onChange={e => setNewEncuentro({...newEncuentro, fecha: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hora">Hora</Label>
                    <Input 
                      id="hora" 
                      placeholder="18:00 - 20:00" 
                      value={newEncuentro.hora}
                      onChange={e => setNewEncuentro({...newEncuentro, hora: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plataforma">Plataforma</Label>
                  <Select 
                    value={newEncuentro.plataforma} 
                    onValueChange={v => setNewEncuentro({...newEncuentro, plataforma: v})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Teams">Microsoft Teams</SelectItem>
                      <SelectItem value="Zoom">Zoom</SelectItem>
                      <SelectItem value="Meet">Google Meet</SelectItem>
                      <SelectItem value="Canvas">Canvas Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link">Link de la sesión (Opcional)</Label>
                  <Input 
                    id="link" 
                    placeholder="https://..." 
                    value={newEncuentro.link}
                    onChange={e => setNewEncuentro({...newEncuentro, link: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleAdd}>Guardar Encuentro</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {encuentros.length === 0 ? (
          <Card className="border-dashed border-2 bg-muted/5">
            <CardContent className="p-10 flex flex-col items-center justify-center text-center">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Video className="size-8 text-primary" />
              </div>
              <h4 className="font-serif text-xl mb-2">No hay encuentros programados</h4>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                Comienza programando tu primer encuentro sincrónico para esta materia.
              </p>
            </CardContent>
          </Card>
        ) : (
          encuentros.map((encuentro) => (
            <EncuentroItem 
              key={encuentro.id} 
              encuentro={encuentro} 
              onDelete={() => handleDelete(encuentro.id)}
            />
          ))
        )}
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

function EncuentroItem({ encuentro, onDelete }: { encuentro: Encuentro, onDelete: () => void }) {
  const isProgramado = encuentro.estado === "programado";
  
  return (
    <Card className="border-border/40 bg-card/50 overflow-hidden hover:border-primary/30 transition-all group">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Fecha y Hora */}
          <div className="md:w-48 bg-muted/30 p-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/40">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Calendar className="size-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {encuentro.fecha ? new Date(encuentro.fecha).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) : "Pendiente"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-3.5" />
              <span className="text-xs font-medium">{encuentro.hora || "Por definir"}</span>
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
              <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors uppercase tracking-tight">{encuentro.tematica}</h4>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {encuentro.link ? (
                <Button 
                  size="sm" 
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                  onClick={() => window.open(encuentro.link, '_blank')}
                >
                  <ExternalLink className="size-3.5" /> {isProgramado ? "Unirse a la sesión" : "Ver grabación"}
                </Button>
              ) : (
                <Button size="sm" variant="secondary" className="gap-2 opacity-50 cursor-not-allowed">
                  <PlayCircle className="size-3.5" /> {isProgramado ? "Sin link aún" : "Sin grabación"}
                </Button>
              )}
              
              <Button 
                size="icon" 
                variant="ghost" 
                className="size-8 text-muted-foreground hover:text-destructive transition-colors"
                onClick={onDelete}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


