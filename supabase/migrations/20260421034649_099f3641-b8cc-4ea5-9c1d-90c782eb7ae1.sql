-- Tabla independiente para el repositorio de la materia
CREATE TABLE public.materia_archivos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  materia_id UUID NOT NULL REFERENCES public.materias(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  storage_path TEXT NOT NULL,
  tipo TEXT,
  tamanio BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_materia_archivos_materia ON public.materia_archivos(materia_id);

ALTER TABLE public.materia_archivos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own materia_archivos"
  ON public.materia_archivos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own materia_archivos"
  ON public.materia_archivos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own materia_archivos"
  ON public.materia_archivos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own materia_archivos"
  ON public.materia_archivos FOR DELETE USING (auth.uid() = user_id);

-- Bucket dedicado para el repositorio de materias
INSERT INTO storage.buckets (id, name, public)
VALUES ('materia-archivos', 'materia-archivos', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users view own materia files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'materia-archivos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own materia files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'materia-archivos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own materia files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'materia-archivos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own materia files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'materia-archivos' AND auth.uid()::text = (storage.foldername(name))[1]);