-- Agregar columnas para trayecto y tipo de actividad en trabajos
ALTER TABLE IF EXISTS public.trabajos 
ADD COLUMN IF NOT EXISTS trayecto integer,
ADD COLUMN IF NOT EXISTS tipo_actividad text,
ADD COLUMN IF NOT EXISTS documento_url text;

-- Comentario para documentar las opciones
COMMENT ON COLUMN public.trabajos.tipo_actividad IS 'Opciones: Autogestionable, Actividad Entregable, Puntos Adicionales, Autoevaluación';
