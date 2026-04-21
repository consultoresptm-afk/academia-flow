ALTER TABLE public.trabajos
  ADD COLUMN IF NOT EXISTS borrador_notas TEXT,
  ADD COLUMN IF NOT EXISTS borrador_fecha DATE,
  ADD COLUMN IF NOT EXISTS revision_comentarios TEXT,
  ADD COLUMN IF NOT EXISTS revision_revisor TEXT,
  ADD COLUMN IF NOT EXISTS revision_fecha DATE,
  ADD COLUMN IF NOT EXISTS entrega_fecha_real DATE,
  ADD COLUMN IF NOT EXISTS entrega_medio TEXT,
  ADD COLUMN IF NOT EXISTS entrega_observaciones TEXT,
  ADD COLUMN IF NOT EXISTS calificacion_fecha DATE;