
-- TRABAJOS
CREATE TABLE public.trabajos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  materia_id UUID REFERENCES public.materias(id) ON DELETE SET NULL,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'ensayo',
  estado TEXT NOT NULL DEFAULT 'investigacion',
  descripcion TEXT,
  instrucciones TEXT,
  objetivos TEXT,
  palabras_clave TEXT[],
  paginas_estimadas INTEGER DEFAULT 5,
  fecha_entrega DATE,
  nota NUMERIC(4,2),
  peso NUMERIC(5,2),
  contenido TEXT,
  contenido_humanizado TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.trabajos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own trabajos" ON public.trabajos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own trabajos" ON public.trabajos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own trabajos" ON public.trabajos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own trabajos" ON public.trabajos FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_trabajos_updated_at
BEFORE UPDATE ON public.trabajos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_trabajos_user ON public.trabajos(user_id);
CREATE INDEX idx_trabajos_materia ON public.trabajos(materia_id);
CREATE INDEX idx_trabajos_estado ON public.trabajos(estado);

-- REFERENCIAS BIBLIOGRÁFICAS (APA 7)
CREATE TABLE public.referencias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  trabajo_id UUID NOT NULL REFERENCES public.trabajos(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL DEFAULT 'libro',
  autores TEXT NOT NULL,
  anio INTEGER,
  titulo TEXT NOT NULL,
  fuente TEXT,
  editorial TEXT,
  url TEXT,
  doi TEXT,
  cita_apa TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.referencias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own referencias" ON public.referencias FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own referencias" ON public.referencias FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own referencias" ON public.referencias FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own referencias" ON public.referencias FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_referencias_trabajo ON public.referencias(trabajo_id);

-- ARCHIVOS ADJUNTOS (metadata)
CREATE TABLE public.trabajo_archivos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  trabajo_id UUID NOT NULL REFERENCES public.trabajos(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  tipo TEXT,
  tamanio BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.trabajo_archivos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own archivos" ON public.trabajo_archivos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own archivos" ON public.trabajo_archivos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own archivos" ON public.trabajo_archivos FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_archivos_trabajo ON public.trabajo_archivos(trabajo_id);

-- STORAGE BUCKET para archivos de trabajos
INSERT INTO storage.buckets (id, name, public) VALUES ('trabajo-archivos', 'trabajo-archivos', false);

-- Storage policies: cada usuario solo accede a su carpeta {user_id}/...
CREATE POLICY "Users view own files" ON storage.objects FOR SELECT
  USING (bucket_id = 'trabajo-archivos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own files" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'trabajo-archivos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own files" ON storage.objects FOR DELETE
  USING (bucket_id = 'trabajo-archivos' AND auth.uid()::text = (storage.foldername(name))[1]);
