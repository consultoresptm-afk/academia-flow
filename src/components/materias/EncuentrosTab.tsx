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
  linkGrabacion?: string;
};

const STORAGE_KEY = "academia-flow-encuentros";

// Función helper para determinar si un encuentro ya pasó
const checkEsPasado = (fecha: string, hora: string) => {
  if (!fecha) return false;
  
  try {
    // Intentar extraer la hora de inicio (ej: "18:00 - 20:00" -> "18:00")
    const startTime = hora.split("-")[0].trim();
    const [hours, minutes] = startTime.includes(":") ? startTime.split(":").map(Number) : [0, 0];
    
    // Crear objeto fecha para el encuentro
    // Usamos el formato YYYY-MM-DD para evitar problemas de zona horaria
    const [year, month, day] = fecha.split("-").map(Number);
    const encounterDate = new Date(year, month - 1, day, hours || 0, minutes || 0);
    
    return encounterDate < new Date();
  } catch (e) {
    return false;
  }
};

export function EncuentrosTab({ materiaId }: { materiaId: string }) {
  const { user } = useAuth();
  const [encuentros, setEncuentros] = useState<Encuentro[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEncuentro, setEditingEncuentro] = useState<Encuentro | null>(null);
  
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    tematica: "",
    plataforma: "Teams",
    link: "",
    linkGrabacion: ""
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

  // Efecto para actualizar los estados automáticamente cada minuto
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

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

  const handleOpenAdd = () => {
    setEditingEncuentro(null);
    setFormData({
      fecha: "",
      hora: "",
      tematica: "",
      plataforma: "Teams",
      link: "",
      linkGrabacion: ""
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (encuentro: Encuentro) => {
    setEditingEncuentro(encuentro);
    setFormData({
      fecha: encuentro.fecha,
      hora: encuentro.hora,
      tematica: encuentro.tematica,
      plataforma: encuentro.plataforma,
      link: encuentro.link || "",
      linkGrabacion: encuentro.linkGrabacion || ""
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.fecha || !formData.tematica) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    let updated: Encuentro[];

    if (editingEncuentro) {
      updated = encuentros.map(e => 
        e.id === editingEncuentro.id 
          ? { ...e, ...formData, estado: checkEsPasado(formData.fecha, formData.hora) ? "grabado" : "programado" } 
          : e
      );
      toast.success("Encuentro actualizado correctamente");
    } else {
      const encuentro: Encuentro = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        estado: checkEsPasado(formData.fecha, formData.hora) ? "grabado" : "programado"
      };
      updated = [encuentro, ...encuentros];
      toast.success("Encuentro programado correctamente");
    }

    setEncuentros(updated);
    saveToStorage(updated);
    setIsDialogOpen(false);
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
              <Button size="sm" onClick={handleOpenAdd} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="size-4" /> Nuevo Encuentro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingEncuentro ? "Editar Encuentro" : "Programar Nuevo Encuentro"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="tematica">Temática / Título</Label>
                  <Input 
                    id="tematica" 
                    placeholder="Ej. Taller Práctico de ASG" 
                    value={formData.tematica}
                    onChange={e => setFormData({...formData, tematica: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input 
                      id="fecha" 
                      type="date" 
                      value={formData.fecha}
                      onChange={e => setFormData({...formData, fecha: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="hora">Hora</Label>
                    <Input 
                      id="hora" 
                      placeholder="18:00 - 20:00" 
                      value={formData.hora}
                      onChange={e => setFormData({...formData, hora: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plataforma">Plataforma</Label>
                  <Select 
                    value={formData.plataforma} 
                    onValueChange={v => setFormData({...formData, plataforma: v})}
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
                    value={formData.link}
                    onChange={e => setFormData({...formData, link: e.target.value})}
                  />
                </div>
                
                {/* Campo de grabación habilitado si la fecha es pasada */}
                {checkEsPasado(formData.fecha, formData.hora) && (
                  <div className="grid gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20 animate-in fade-in duration-300">
                    <Label htmlFor="linkGrabacion" className="text-primary flex items-center gap-2">
                      <PlayCircle className="size-3.5" /> Link de la Grabación
                    </Label>
                    <Input 
                      id="linkGrabacion" 
                      placeholder="https://..." 
                      className="bg-background border-primary/30"
                      value={formData.linkGrabacion}
                      onChange={e => setFormData({...formData, linkGrabacion: e.target.value})}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleSave}>{editingEncuentro ? "Guardar Cambios" : "Guardar Encuentro"}</Button>
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
              onEdit={() => handleOpenEdit(encuentro)}
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

function EncuentroItem({ encuentro, onEdit, onDelete }: { encuentro: Encuentro, onEdit: () => void, onDelete: () => void }) {
  const isPastSession = checkEsPasado(encuentro.fecha, encuentro.hora);
  const isProgramado = !isPastSession;
  
  return (
    <Card className="border-border/40 bg-card/50 overflow-hidden hover:border-primary/30 transition-all group">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Fecha y Hora */}
          <div className="md:w-48 bg-muted/30 p-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border/40">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Calendar className="size-3.5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {encuentro.fecha ? new Date(encuentro.fecha + "T00:00:00").toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) : "Pendiente"}
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
                {!isProgramado && (
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${encuentro.linkGrabacion ? 'text-orange-500 border-orange-500/30' : 'text-muted-foreground border-muted-foreground/30'}`}>
                    {encuentro.linkGrabacion ? 'Grabación disponible' : 'Sesión finalizada'}
                  </Badge>
                )}
              </div>
              <h4 className="font-medium text-sm line-clamp-1 text-foreground transition-colors uppercase tracking-tight">{encuentro.tematica}</h4>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isPastSession ? (
                encuentro.linkGrabacion ? (
                  <Button 
                    size="sm" 
                    className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                    onClick={() => window.open(encuentro.linkGrabacion, '_blank')}
                  >
                    <PlayCircle className="size-3.5" /> VER GRABACIÓN
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" className="gap-2 opacity-50 cursor-not-allowed">
                    <Video className="size-3.5" /> SESIÓN FINALIZADA
                  </Button>
                )
              ) : (
                encuentro.link ? (
                  <Button 
                    size="sm" 
                    className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                    onClick={() => window.open(encuentro.link, '_blank')}
                  >
                    <ExternalLink className="size-3.5" /> UNIRSE A LA SESIÓN
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" className="gap-2 opacity-50 cursor-not-allowed">
                    <PlayCircle className="size-3.5" /> SIN LINK AÚN
                  </Button>
                )
              )}
              
              <div className="flex items-center border-l border-border/40 ml-2 pl-2 gap-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="size-8 text-muted-foreground hover:text-primary transition-colors"
                  onClick={onEdit}
                >
                  <Plus className="size-4 rotate-45" /> {/* Use Plus as Edit icon or similar */}
                </Button>
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
        </div>
      </CardContent>
    </Card>
  );
}


