-- =====================================================
-- Migración: Módulo de Producción — AcadémicoPro
-- Usa bloques DO para manejar "ya existe" gracefully.
-- =====================================================

-- 1. TABLA trabajos
CREATE TABLE IF NOT EXISTS public.trabajos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    materia_id UUID REFERENCES public.materias(id) ON DELETE SET NULL,
    titulo TEXT NOT NULL,
    tipo TEXT NOT NULL DEFAULT 'ensayo',
    descripcion TEXT,
    instrucciones TEXT,
    objetivos TEXT,
    palabras_clave TEXT[],
    paginas_estimadas INTEGER DEFAULT 5,
    fecha_entrega DATE,
    peso NUMERIC,
    nota NUMERIC,
    estado TEXT DEFAULT 'investigacion',
    contenido TEXT,
    contenido_humanizado TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.trabajos ENABLE ROW LEVEL SECURITY;

-- Políticas de trabajos (si ya existen, las eliminamos primero para re-crearlas limpiamente)
DROP POLICY IF EXISTS "Usuarios pueden ver sus propios trabajos" ON public.trabajos;
DROP POLICY IF EXISTS "Usuarios pueden insertar sus propios trabajos" ON public.trabajos;
DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propios trabajos" ON public.trabajos;
DROP POLICY IF EXISTS "Usuarios pueden eliminar sus propios trabajos" ON public.trabajos;

CREATE POLICY "Usuarios pueden ver sus propios trabajos"    ON public.trabajos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden insertar sus propios trabajos" ON public.trabajos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden actualizar sus propios trabajos" ON public.trabajos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden eliminar sus propios trabajos"  ON public.trabajos FOR DELETE USING (auth.uid() = user_id);


-- 2. TABLA referencias
CREATE TABLE IF NOT EXISTS public.referencias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    trabajo_id UUID NOT NULL REFERENCES public.trabajos(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL DEFAULT 'libro',
    autores TEXT NOT NULL,
    titulo TEXT NOT NULL,
    anio INTEGER,
    fuente TEXT,
    editorial TEXT,
    url TEXT,
    doi TEXT,
    cita_apa TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.referencias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios pueden ver sus propias referencias"     ON public.referencias;
DROP POLICY IF EXISTS "Usuarios pueden insertar sus propias referencias" ON public.referencias;
DROP POLICY IF EXISTS "Usuarios pueden actualizar sus propias referencias" ON public.referencias;
DROP POLICY IF EXISTS "Usuarios pueden eliminar sus propias referencias"  ON public.referencias;

CREATE POLICY "Usuarios pueden ver sus propias referencias"     ON public.referencias FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden insertar sus propias referencias" ON public.referencias FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden actualizar sus propias referencias" ON public.referencias FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden eliminar sus propias referencias"  ON public.referencias FOR DELETE USING (auth.uid() = user_id);


-- 3. TABLA trabajo_archivos
CREATE TABLE IF NOT EXISTS public.trabajo_archivos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    trabajo_id UUID NOT NULL REFERENCES public.trabajos(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    tipo TEXT,
    tamanio INTEGER,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.trabajo_archivos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios pueden ver sus propios archivos"      ON public.trabajo_archivos;
DROP POLICY IF EXISTS "Usuarios pueden insertar sus propios archivos"  ON public.trabajo_archivos;
DROP POLICY IF EXISTS "Usuarios pueden eliminar sus propios archivos"  ON public.trabajo_archivos;

CREATE POLICY "Usuarios pueden ver sus propios archivos"     ON public.trabajo_archivos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden insertar sus propios archivos" ON public.trabajo_archivos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios pueden eliminar sus propios archivos" ON public.trabajo_archivos FOR DELETE USING (auth.uid() = user_id);


-- 4. STORAGE BUCKET: trabajo-archivos
INSERT INTO storage.buckets (id, name, public)
VALUES ('trabajo-archivos', 'trabajo-archivos', false)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage (DROP IF EXISTS + CREATE para idempotencia)
DROP POLICY IF EXISTS "Upload propio bucket trabajo-archivos"    ON storage.objects;
DROP POLICY IF EXISTS "Select propio bucket trabajo-archivos"    ON storage.objects;
DROP POLICY IF EXISTS "Delete propio bucket trabajo-archivos"    ON storage.objects;

CREATE POLICY "Upload propio bucket trabajo-archivos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'trabajo-archivos'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Select propio bucket trabajo-archivos"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id = 'trabajo-archivos'
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Delete propio bucket trabajo-archivos"
ON storage.objects FOR DELETE TO authenticated
USING (
    bucket_id = 'trabajo-archivos'
    AND (storage.foldername(name))[1] = auth.uid()::text
);
