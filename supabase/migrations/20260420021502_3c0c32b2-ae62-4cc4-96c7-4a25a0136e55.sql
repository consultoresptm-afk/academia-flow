
-- TESIS
CREATE TABLE public.tesis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  titulo text NOT NULL,
  subtitulo text,
  director text,
  co_director text,
  institucion text,
  programa text,
  estado text NOT NULL DEFAULT 'borrador',
  fecha_inicio date,
  fecha_defensa date,
  palabras_objetivo integer DEFAULT 50000,
  palabras_actuales integer DEFAULT 0,
  resumen text,
  palabras_clave text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tesis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own tesis"   ON public.tesis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own tesis" ON public.tesis FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own tesis" ON public.tesis FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own tesis" ON public.tesis FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_tesis_updated_at BEFORE UPDATE ON public.tesis
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- CAPITULOS
CREATE TABLE public.tesis_capitulos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tesis_id uuid NOT NULL REFERENCES public.tesis(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  descripcion text,
  orden integer NOT NULL DEFAULT 0,
  estado text NOT NULL DEFAULT 'pendiente',
  palabras_objetivo integer DEFAULT 5000,
  palabras_actuales integer DEFAULT 0,
  fecha_limite date,
  notas text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tesis_capitulos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own capitulos"   ON public.tesis_capitulos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own capitulos" ON public.tesis_capitulos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own capitulos" ON public.tesis_capitulos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own capitulos" ON public.tesis_capitulos FOR DELETE USING (auth.uid() = user_id);
CREATE TRIGGER update_tesis_capitulos_updated_at BEFORE UPDATE ON public.tesis_capitulos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- HITOS
CREATE TABLE public.tesis_hitos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tesis_id uuid NOT NULL REFERENCES public.tesis(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  descripcion text,
  fecha_limite date NOT NULL,
  completado boolean NOT NULL DEFAULT false,
  fecha_completado timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tesis_hitos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own hitos"   ON public.tesis_hitos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own hitos" ON public.tesis_hitos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own hitos" ON public.tesis_hitos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own hitos" ON public.tesis_hitos FOR DELETE USING (auth.uid() = user_id);

-- DOCUMENTOS
CREATE TABLE public.tesis_documentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tesis_id uuid NOT NULL REFERENCES public.tesis(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  storage_path text NOT NULL,
  tipo text,
  tamanio bigint,
  version text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tesis_documentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own tesis docs"   ON public.tesis_documentos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own tesis docs" ON public.tesis_documentos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own tesis docs" ON public.tesis_documentos FOR DELETE USING (auth.uid() = user_id);

-- BUCKET tesis-documentos (privado)
INSERT INTO storage.buckets (id, name, public) VALUES ('tesis-documentos', 'tesis-documentos', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users view own tesis files" ON storage.objects FOR SELECT
  USING (bucket_id = 'tesis-documentos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users upload own tesis files" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'tesis-documentos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users delete own tesis files" ON storage.objects FOR DELETE
  USING (bucket_id = 'tesis-documentos' AND auth.uid()::text = (storage.foldername(name))[1]);
