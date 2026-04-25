export type MateriaEstado = "activo" | "inactivo" | "archivado";

export interface Materia {
  id: string;
  user_id: string;
  nombre: string;
  codigo: string | null;
  docente: string | null;
  creditos: number | null;
  semestre: string | null;
  color: string | null;
  descripcion: string | null;
  estado: MateriaEstado;
  created_at: string;
  updated_at: string;
}
