-- Migración: Módulo de Tesis
-- Tablas para gestión de proyectos de tesis de maestría

-- 1. Tabla principal de la tesis (una por usuario)
CREATE TABLE IF NOT EXISTS public.tesis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL DEFAULT 'Mi Tesis',
    subtitulo TEXT,
    director TEXT,
    co_director TEXT,
    institucion TEXT,
    programa TEXT,
    estado TEXT DEFAULT 'en_progreso', -- borrador | en_progreso | revision | aprobada | defendida
    fecha_inicio DATE,
    fecha_defensa DATE,
    palabras_objetivo INTEGER DEFAULT 50000,
    palabras_actuales INTEGER DEFAULT 0,
    resumen TEXT,
    palabras_clave TEXT[],
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.tesis ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tesis_select" ON public.tesis;
DROP POLICY IF EXISTS "tesis_insert" ON public.tesis;
DROP POLICY IF EXISTS "tesis_update" ON public.tesis;
DROP POLICY IF EXISTS "tesis_delete" ON public.tesis;
CREATE POLICY "tesis_select" ON public.tesis FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tesis_insert" ON public.tesis FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tesis_update" ON public.tesis FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "tesis_delete" ON public.tesis FOR DELETE USING (auth.uid() = user_id);


-- 2. Capítulos de la tesis
CREATE TABLE IF NOT EXISTS public.tesis_capitulos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tesis_id UUID NOT NULL REFERENCES public.tesis(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    estado TEXT DEFAULT 'pendiente', -- pendiente | en_progreso | revision | aprobado
    palabras_objetivo INTEGER DEFAULT 5000,
    palabras_actuales INTEGER DEFAULT 0,
    fecha_limite DATE,
    notas TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.tesis_capitulos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tesis_cap_select" ON public.tesis_capitulos;
DROP POLICY IF EXISTS "tesis_cap_insert" ON public.tesis_capitulos;
DROP POLICY IF EXISTS "tesis_cap_update" ON public.tesis_capitulos;
DROP POLICY IF EXISTS "tesis_cap_delete" ON public.tesis_capitulos;
CREATE POLICY "tesis_cap_select" ON public.tesis_capitulos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tesis_cap_insert" ON public.tesis_capitulos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tesis_cap_update" ON public.tesis_capitulos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "tesis_cap_delete" ON public.tesis_capitulos FOR DELETE USING (auth.uid() = user_id);


-- 3. Hitos / Cronograma
CREATE TABLE IF NOT EXISTS public.tesis_hitos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tesis_id UUID NOT NULL REFERENCES public.tesis(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha_limite DATE NOT NULL,
    completado BOOLEAN DEFAULT false,
    fecha_completado DATE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.tesis_hitos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tesis_hitos_select" ON public.tesis_hitos;
DROP POLICY IF EXISTS "tesis_hitos_insert" ON public.tesis_hitos;
DROP POLICY IF EXISTS "tesis_hitos_update" ON public.tesis_hitos;
DROP POLICY IF EXISTS "tesis_hitos_delete" ON public.tesis_hitos;
CREATE POLICY "tesis_hitos_select" ON public.tesis_hitos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tesis_hitos_insert" ON public.tesis_hitos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tesis_hitos_update" ON public.tesis_hitos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "tesis_hitos_delete" ON public.tesis_hitos FOR DELETE USING (auth.uid() = user_id);


-- 4. Documentos de la tesis
CREATE TABLE IF NOT EXISTS public.tesis_documentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tesis_id UUID NOT NULL REFERENCES public.tesis(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    tipo TEXT,        -- borrador_v1 | revision | capitulo | final | otro
    tamanio INTEGER,
    version TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.tesis_documentos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tesis_docs_select" ON public.tesis_documentos;
DROP POLICY IF EXISTS "tesis_docs_insert" ON public.tesis_documentos;
DROP POLICY IF EXISTS "tesis_docs_delete" ON public.tesis_documentos;
CREATE POLICY "tesis_docs_select" ON public.tesis_documentos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tesis_docs_insert" ON public.tesis_documentos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tesis_docs_delete" ON public.tesis_documentos FOR DELETE USING (auth.uid() = user_id);

-- Storage bucket para documentos de tesis
INSERT INTO storage.buckets (id, name, public)
VALUES ('tesis-documentos', 'tesis-documentos', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "tesis_docs_upload" ON storage.objects;
DROP POLICY IF EXISTS "tesis_docs_download" ON storage.objects;
DROP POLICY IF EXISTS "tesis_docs_remove" ON storage.objects;
CREATE POLICY "tesis_docs_upload"   ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'tesis-documentos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "tesis_docs_download" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'tesis-documentos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "tesis_docs_remove"   ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'tesis-documentos' AND (storage.foldername(name))[1] = auth.uid()::text);
