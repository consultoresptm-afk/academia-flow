import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * GaugeChart — Velocímetro SVG de "Avance General"
 * Muestra el progreso ponderado de todos los trabajos del usuario (0–100%).
 * - 0–40%   → zona roja (crítico)
 * - 40–70%  → zona naranja (en progreso)
 * - 70–100% → zona verde (excelente)
 */

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

// El arco del velocímetro va de -150° a +150° (semicírculo extendido)
const START_ANGLE = -150;
const END_ANGLE = 150;
const TOTAL_SWEEP = END_ANGLE - START_ANGLE; // 300°

function GaugeSVG({ value }: { value: number }) {
  // value: 0–100
  const pct = Math.min(100, Math.max(0, value));
  const needle_angle = START_ANGLE + (pct / 100) * TOTAL_SWEEP;

  const cx = 120, cy = 120, rOuter = 90, rInner = 62;

  // Zonas de color (en ángulos)
  const zones = [
    { start: START_ANGLE, end: START_ANGLE + TOTAL_SWEEP * 0.4,  color: "#ef4444" }, // 0–40%
    { start: START_ANGLE + TOTAL_SWEEP * 0.4, end: START_ANGLE + TOTAL_SWEEP * 0.7, color: "#f97316" }, // 40–70%
    { start: START_ANGLE + TOTAL_SWEEP * 0.7, end: END_ANGLE,    color: "#22c55e" }, // 70–100%
  ];

  // Ángulo a coordenadas del puntero
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const nRad = toRad(needle_angle);
  const needleLen = 70;
  const nx = cx + needleLen * Math.cos(nRad);
  const ny = cy + needleLen * Math.sin(nRad);

  // Color actual según valor
  const currentColor = pct < 40 ? "#ef4444" : pct < 70 ? "#f97316" : "#22c55e";
  const label = pct < 40 ? "CRÍTICO" : pct < 70 ? "EN PROGRESO" : "EXCELENTE";

  return (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs mx-auto select-none">
      <defs>
        <filter id="glow-needle">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-text">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Fondo del arco (pista) */}
      <path d={describeArc(cx, cy, rOuter, START_ANGLE, END_ANGLE)}
        fill="none" stroke="rgba(74,4,4,0.5)" strokeWidth={28} strokeLinecap="round" />

      {/* Zonas de color */}
      {zones.map((z, i) => (
        <path key={i} d={describeArc(cx, cy, rOuter, z.start, z.end)}
          fill="none" stroke={z.color} strokeWidth={28} strokeLinecap="butt" opacity={0.25} />
      ))}

      {/* Arco de progreso activo */}
      {pct > 0 && (
        <path d={describeArc(cx, cy, rOuter, START_ANGLE, START_ANGLE + (pct / 100) * TOTAL_SWEEP)}
          fill="none" stroke={currentColor} strokeWidth={28} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${currentColor}88)` }} />
      )}

      {/* Marcas de ticks */}
      {[0, 25, 50, 75, 100].map((tick) => {
        const angle = START_ANGLE + (tick / 100) * TOTAL_SWEEP;
        const rad = toRad(angle);
        const r1 = rOuter + 18, r2 = rOuter + 28;
        return (
          <g key={tick}>
            <line
              x1={cx + r1 * Math.cos(rad)} y1={cy + r1 * Math.sin(rad)}
              x2={cx + r2 * Math.cos(rad)} y2={cy + r2 * Math.sin(rad)}
              stroke="rgba(245,158,11,0.4)" strokeWidth={1.5} />
            <text
              x={cx + (r2 + 10) * Math.cos(rad)}
              y={cy + (r2 + 10) * Math.sin(rad)}
              textAnchor="middle" dominantBaseline="central"
              fontSize={8} fill="rgba(212,165,116,0.7)" fontFamily="Inter, sans-serif">
              {tick}
            </text>
          </g>
        );
      })}

      {/* Puntero (aguja) */}
      <line x1={cx} y1={cy} x2={nx} y2={ny}
        stroke={currentColor} strokeWidth={3} strokeLinecap="round"
        filter="url(#glow-needle)" />
      {/* Pivote central */}
      <circle cx={cx} cy={cy} r={8} fill="rgba(35,5,5,0.9)"
        stroke={currentColor} strokeWidth={2}
        style={{ filter: `drop-shadow(0 0 4px ${currentColor})` }} />
      <circle cx={cx} cy={cy} r={3} fill={currentColor} />

      {/* Valor numérico central */}
      <text x={cx} y={cy + 32} textAnchor="middle"
        fontSize={22} fontWeight="bold" fill={currentColor}
        fontFamily="Rajdhani, Inter, sans-serif" filter="url(#glow-text)">
        {pct.toFixed(1)}%
      </text>

      {/* Etiqueta de estado */}
      <text x={cx} y={cy + 50} textAnchor="middle"
        fontSize={8} fill="rgba(212,165,116,0.8)" letterSpacing={2}
        fontFamily="Inter, sans-serif">
        {label}
      </text>

      {/* Etiquetas de zona (0, 40, 70, 100 en el arco) */}
      {[
        { v: 0, text: "0" }, { v: 40, text: "40" },
        { v: 70, text: "70" }, { v: 100, text: "100" },
      ].map(({ v, text }) => {
        const a = START_ANGLE + (v / 100) * TOTAL_SWEEP;
        const r = toRad(a);
        return (
          <text key={v}
            x={cx + (rInner - 8) * Math.cos(r)}
            y={cy + (rInner - 8) * Math.sin(r)}
            textAnchor="middle" dominantBaseline="central"
            fontSize={7} fill="rgba(212,165,116,0.5)" fontFamily="Inter, sans-serif">
            {text}
          </text>
        );
      })}
    </svg>
  );
}

export function AvanceGaugeChart() {
  const { user } = useAuth();

  const { data: trabajos = [] } = useQuery({
    enabled: !!user,
    queryKey: ["trabajos-avance", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("trabajos").select("estado, peso");
      return data ?? [];
    },
  });

  // Calcular % de avance: entregados / total (ponderado por peso si existe)
  const avance = (() => {
    if (!trabajos.length) return 0;
    const total = trabajos.reduce((s, t) => s + (t.peso ?? 1), 0);
    const completados = trabajos
      .filter((t) => t.estado === "entrega")
      .reduce((s, t) => s + (t.peso ?? 1), 0);
    return total > 0 ? (completados / total) * 100 : 0;
  })();

  const stats = {
    total: trabajos.length,
    entregados: trabajos.filter((t) => t.estado === "entrega").length,
    pendientes: trabajos.filter((t) => t.estado !== "entrega").length,
  };

  return (
    <div className="flex flex-col items-center h-full justify-center py-2">
      <GaugeSVG value={avance} />

      {/* Leyenda inferior */}
      <div className="flex items-center gap-4 mt-2">
        {[
          { label: "TOTAL", value: stats.total, color: "#d4a574" },
          { label: "ENTREGADOS", value: stats.entregados, color: "#22c55e" },
          { label: "PENDIENTES", value: stats.pendientes, color: "#f97316" },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <div className="text-lg font-bold font-serif" style={{ color }}>{value}</div>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
