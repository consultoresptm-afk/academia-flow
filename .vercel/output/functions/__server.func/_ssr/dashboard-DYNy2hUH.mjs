import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as supabase, r as useAuth } from "./useAuth-BSBqbnp_.mjs";
import { c as Outlet, m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as Clock, U as BookOpen, V as ChartNoAxesColumn, c as Trophy, l as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-BNZVYEEj.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-qCpth4Ah.mjs";
import { a as CartesianGrid, c as Tooltip, i as Line, n as YAxis, o as ReferenceLine, r as XAxis, s as ResponsiveContainer, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DYNy2hUH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* GaugeChart — Velocímetro SVG de "Avance General"
* Muestra el progreso ponderado de todos los trabajos del usuario (0–100%).
* - 0–40%   → zona roja (crítico)
* - 40–70%  → zona naranja (en progreso)
* - 70–100% → zona verde (excelente)
*/
function describeArc(cx, cy, r, startAngle, endAngle) {
	const toRad = (deg) => (deg - 90) * Math.PI / 180;
	const x1 = cx + r * Math.cos(toRad(startAngle));
	const y1 = cy + r * Math.sin(toRad(startAngle));
	const x2 = cx + r * Math.cos(toRad(endAngle));
	const y2 = cy + r * Math.sin(toRad(endAngle));
	return `M ${x1} ${y1} A ${r} ${r} 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}
var START_ANGLE = -150;
var END_ANGLE = 150;
var TOTAL_SWEEP = END_ANGLE - START_ANGLE;
function GaugeSVG({ value }) {
	const pct = Math.min(100, Math.max(0, value));
	const needle_angle = START_ANGLE + pct / 100 * TOTAL_SWEEP;
	const cx = 120, cy = 120, rOuter = 90, rInner = 62;
	const zones = [
		{
			start: START_ANGLE,
			end: START_ANGLE + TOTAL_SWEEP * .4,
			color: "#ef4444"
		},
		{
			start: START_ANGLE + TOTAL_SWEEP * .4,
			end: START_ANGLE + TOTAL_SWEEP * .7,
			color: "#f97316"
		},
		{
			start: START_ANGLE + TOTAL_SWEEP * .7,
			end: END_ANGLE,
			color: "#22c55e"
		}
	];
	const toRad = (deg) => (deg - 90) * Math.PI / 180;
	const nRad = toRad(needle_angle);
	const needleLen = 70;
	const nx = cx + needleLen * Math.cos(nRad);
	const ny = cy + needleLen * Math.sin(nRad);
	const currentColor = pct < 40 ? "#ef4444" : pct < 70 ? "#f97316" : "#22c55e";
	const label = pct < 40 ? "CRÍTICO" : pct < 70 ? "EN PROGRESO" : "EXCELENTE";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 240 180",
		className: "w-full max-w-xs mx-auto select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
				id: "glow-needle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
					stdDeviation: "3",
					result: "blur"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
				id: "glow-text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
					stdDeviation: "2",
					result: "blur"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: describeArc(cx, cy, rOuter, START_ANGLE, END_ANGLE),
				fill: "none",
				stroke: "rgba(74,4,4,0.5)",
				strokeWidth: 28,
				strokeLinecap: "round"
			}),
			zones.map((z, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: describeArc(cx, cy, rOuter, z.start, z.end),
				fill: "none",
				stroke: z.color,
				strokeWidth: 28,
				strokeLinecap: "butt",
				opacity: .25
			}, i)),
			pct > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: describeArc(cx, cy, rOuter, START_ANGLE, START_ANGLE + pct / 100 * TOTAL_SWEEP),
				fill: "none",
				stroke: currentColor,
				strokeWidth: 28,
				strokeLinecap: "round",
				style: { filter: `drop-shadow(0 0 6px ${currentColor}88)` }
			}),
			[
				0,
				25,
				50,
				75,
				100
			].map((tick) => {
				const rad = toRad(START_ANGLE + tick / 100 * TOTAL_SWEEP);
				const r1 = rOuter + 18, r2 = rOuter + 28;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: cx + r1 * Math.cos(rad),
					y1: cy + r1 * Math.sin(rad),
					x2: cx + r2 * Math.cos(rad),
					y2: cy + r2 * Math.sin(rad),
					stroke: "rgba(245,158,11,0.4)",
					strokeWidth: 1.5
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: cx + (r2 + 10) * Math.cos(rad),
					y: cy + (r2 + 10) * Math.sin(rad),
					textAnchor: "middle",
					dominantBaseline: "central",
					fontSize: 8,
					fill: "rgba(212,165,116,0.7)",
					fontFamily: "Inter, sans-serif",
					children: tick
				})] }, tick);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx,
				y1: cy,
				x2: nx,
				y2: ny,
				stroke: currentColor,
				strokeWidth: 3,
				strokeLinecap: "round",
				filter: "url(#glow-needle)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: 8,
				fill: "rgba(35,5,5,0.9)",
				stroke: currentColor,
				strokeWidth: 2,
				style: { filter: `drop-shadow(0 0 4px ${currentColor})` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx,
				cy,
				r: 3,
				fill: currentColor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: cx,
				y: cy + 32,
				textAnchor: "middle",
				fontSize: 22,
				fontWeight: "bold",
				fill: currentColor,
				fontFamily: "Rajdhani, Inter, sans-serif",
				filter: "url(#glow-text)",
				children: [pct.toFixed(1), "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: cx,
				y: cy + 50,
				textAnchor: "middle",
				fontSize: 8,
				fill: "rgba(212,165,116,0.8)",
				letterSpacing: 2,
				fontFamily: "Inter, sans-serif",
				children: label
			}),
			[
				{
					v: 0,
					text: "0"
				},
				{
					v: 40,
					text: "40"
				},
				{
					v: 70,
					text: "70"
				},
				{
					v: 100,
					text: "100"
				}
			].map(({ v, text }) => {
				const r = toRad(START_ANGLE + v / 100 * TOTAL_SWEEP);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: cx + (rInner - 8) * Math.cos(r),
					y: cy + (rInner - 8) * Math.sin(r),
					textAnchor: "middle",
					dominantBaseline: "central",
					fontSize: 7,
					fill: "rgba(212,165,116,0.5)",
					fontFamily: "Inter, sans-serif",
					children: text
				}, v);
			})
		]
	});
}
function AvanceGaugeChart() {
	const { user } = useAuth();
	const { data: trabajos = [] } = useQuery({
		enabled: !!user,
		queryKey: ["trabajos-avance", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("trabajos").select("estado, peso");
			return data ?? [];
		}
	});
	const avance = (() => {
		if (!trabajos.length) return 0;
		const total = trabajos.reduce((s, t) => s + (t.peso ?? 1), 0);
		const completados = trabajos.filter((t) => t.estado === "entrega").reduce((s, t) => s + (t.peso ?? 1), 0);
		return total > 0 ? completados / total * 100 : 0;
	})();
	const stats = {
		total: trabajos.length,
		entregados: trabajos.filter((t) => t.estado === "entrega").length,
		pendientes: trabajos.filter((t) => t.estado !== "entrega").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center h-full justify-center py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GaugeSVG, { value: avance }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-4 mt-2",
			children: [
				{
					label: "TOTAL",
					value: stats.total,
					color: "#d4a574"
				},
				{
					label: "ENTREGADOS",
					value: stats.entregados,
					color: "#22c55e"
				},
				{
					label: "PENDIENTES",
					value: stats.pendientes,
					color: "#f97316"
				}
			].map(({ label, value, color }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-lg font-bold font-serif",
					style: { color },
					children: value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[9px] uppercase tracking-widest text-muted-foreground",
					children: label
				})]
			}, label))
		})]
	});
}
var PROMEDIO_MINIMO = 3.5;
/** Tooltip customizado con estética cyberpunk cálida */
function CustomTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	const nota = payload[0]?.value;
	const color = nota >= PROMEDIO_MINIMO ? "#22c55e" : "#ef4444";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded px-3 py-2 text-xs",
		style: {
			background: "rgba(15,2,2,0.96)",
			border: `1px solid ${color}55`,
			boxShadow: `0 0 12px ${color}33`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-bold uppercase tracking-widest mb-1",
			style: { color: "rgba(212,165,116,0.8)" },
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			style: { color },
			children: ["Promedio: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: typeof nota === "number" ? nota.toFixed(2) : "—" })]
		})]
	});
}
function PromedioChart() {
	const { user } = useAuth();
	const { data: trabajos = [] } = useQuery({
		enabled: !!user,
		queryKey: ["trabajos-promedio-chart", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("trabajos").select("nota, peso, materia_id, materias(nombre), fecha_entrega").not("nota", "is", null).order("fecha_entrega", { ascending: true });
			return data ?? [];
		}
	});
	const dataByMateria = (() => {
		const map = /* @__PURE__ */ new Map();
		trabajos.forEach((t) => {
			const nombre = t.materias?.nombre ?? "Sin materia";
			if (!map.has(nombre)) map.set(nombre, {
				nombre,
				notas: []
			});
			map.get(nombre).notas.push({
				nota: t.nota ?? 0,
				peso: t.peso ?? 1
			});
		});
		return Array.from(map.entries()).map(([nombre, { notas }]) => {
			const totalPeso = notas.reduce((s, n) => s + n.peso, 0);
			const promedio = totalPeso > 0 ? notas.reduce((s, n) => s + n.nota * n.peso, 0) / totalPeso : notas.reduce((s, n) => s + n.nota, 0) / notas.length;
			return {
				materia: nombre.length > 14 ? nombre.slice(0, 14) + "…" : nombre,
				promedio: +promedio.toFixed(2)
			};
		});
	})();
	const promedioGlobal = (() => {
		if (!trabajos.length) return null;
		const all = trabajos.filter((t) => t.nota !== null);
		if (!all.length) return null;
		const totalPeso = all.reduce((s, t) => s + (t.peso ?? 1), 0);
		const suma = all.reduce((s, t) => s + (t.nota ?? 0) * (t.peso ?? 1), 0);
		return totalPeso > 0 ? suma / totalPeso : null;
	})();
	const sinDatos = dataByMateria.length === 0;
	const globalColor = promedioGlobal === null ? "#d4a574" : promedioGlobal >= PROMEDIO_MINIMO ? "#22c55e" : "#ef4444";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-full flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "font-serif text-xl flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, {
						className: "size-5",
						style: { color: "#f59e0b" }
					}), "Promedio por materia"]
				}), promedioGlobal !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Promedio global"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold font-serif",
						style: {
							color: globalColor,
							filter: `drop-shadow(0 0 6px ${globalColor}88)`
						},
						children: promedioGlobal.toFixed(2)
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 mt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-6 h-px border-t-2 border-dashed",
					style: { borderColor: "#ef4444" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] uppercase tracking-widest",
					style: { color: "rgba(239,68,68,0.7)" },
					children: ["Mínimo aprobatorio: ", PROMEDIO_MINIMO]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex-1 pt-0",
			children: [sinDatos ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center h-48 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "size-8 text-muted-foreground/20 mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Aún no hay notas registradas.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Asigna notas a tus trabajos en el módulo de Producción."
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-56",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: dataByMateria,
						margin: {
							top: 8,
							right: 12,
							left: -16,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
								id: "glow-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
									stdDeviation: "2",
									result: "blur"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "rgba(245,158,11,0.08)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "materia",
								stroke: "rgba(212,165,116,0.4)",
								fontSize: 9,
								tickLine: false,
								axisLine: false,
								tick: {
									fill: "rgba(212,165,116,0.7)",
									fontFamily: "Inter, sans-serif",
									fontSize: 9
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								domain: [0, 5],
								ticks: [
									0,
									1,
									2,
									3,
									3.5,
									4,
									5
								],
								stroke: "rgba(212,165,116,0.4)",
								fontSize: 9,
								tickLine: false,
								axisLine: false,
								tick: {
									fill: "rgba(212,165,116,0.7)",
									fontFamily: "Inter, sans-serif",
									fontSize: 9
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTooltip, {}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: PROMEDIO_MINIMO,
								stroke: "#ef4444",
								strokeWidth: 1.5,
								strokeDasharray: "6 4",
								label: {
									value: "3.5 MÍN",
									position: "right",
									fontSize: 8,
									fill: "#ef4444",
									fontFamily: "Inter, sans-serif",
									fontWeight: "bold"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
								y: PROMEDIO_MINIMO,
								stroke: "transparent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "promedio",
								stroke: "#f59e0b",
								strokeWidth: 2.5,
								dot: (props) => {
									const { cx, cy, payload } = props;
									const color = payload.promedio >= PROMEDIO_MINIMO ? "#22c55e" : "#ef4444";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx,
										cy,
										r: 5,
										fill: color,
										stroke: "rgba(15,2,2,0.8)",
										strokeWidth: 2,
										style: { filter: `drop-shadow(0 0 4px ${color})` }
									}, `dot-${cx}-${cy}`);
								},
								activeDot: {
									r: 7,
									stroke: "#f59e0b",
									strokeWidth: 2,
									fill: "#f59e0b"
								}
							})
						]
					})
				})
			}), !sinDatos && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-4 mt-2 justify-center",
				children: [{
					color: "#22c55e",
					label: "≥ 3.5 · Aprobado"
				}, {
					color: "#ef4444",
					label: "< 3.5 · En riesgo"
				}].map(({ color, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-2.5 rounded-full",
						style: {
							background: color,
							boxShadow: `0 0 4px ${color}`
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: label
					})]
				}, label))
			})]
		})]
	});
}
function DashboardPage() {
	const { user, loading } = useAuth();
	useNavigate();
	const { data: materias } = useQuery({
		enabled: !!user,
		queryKey: ["materias", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("materias").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: trabajos } = useQuery({
		enabled: !!user,
		queryKey: ["trabajos-dashboard", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("trabajos").select("id, titulo, estado, fecha_entrega, nota, peso, materia_id");
			if (error) throw error;
			return data ?? [];
		}
	});
	const stats = (0, import_react.useMemo)(() => {
		const total = materias?.length ?? 0;
		const activas = materias?.filter((m) => m.estado === "activa").length ?? 0;
		const pendientes = trabajos?.filter((t) => t.estado !== "entrega").length ?? 0;
		const conNota = trabajos?.filter((t) => t.nota != null) ?? [];
		let promedio = 0;
		if (conNota.length > 0) {
			const sumPesos = conNota.reduce((s, t) => s + (Number(t.peso) || 1), 0);
			const sumNotas = conNota.reduce((s, t) => s + (Number(t.nota) || 0) * (Number(t.peso) || 1), 0);
			promedio = sumPesos > 0 ? sumNotas / sumPesos : 0;
		}
		const hoy = /* @__PURE__ */ new Date();
		const en7 = /* @__PURE__ */ new Date();
		en7.setDate(hoy.getDate() + 7);
		const alertas = trabajos?.filter((t) => {
			if (!t.fecha_entrega || t.estado === "entrega") return false;
			const f = new Date(t.fecha_entrega);
			return f >= hoy && f <= en7;
		}).length ?? 0;
		return {
			total,
			activas,
			promedio,
			pendientes,
			alertas
		};
	}, [materias, trabajos]);
	const proximasEntregas = (0, import_react.useMemo)(() => {
		const hoy = /* @__PURE__ */ new Date();
		return (trabajos ?? []).filter((t) => t.fecha_entrega && t.estado !== "entrega" && new Date(t.fecha_entrega) >= hoy).sort((a, b) => new Date(a.fecha_entrega).getTime() - new Date(b.fecha_entrega).getTime()).slice(0, 5);
	}, [trabajos]);
	const materiaName = (id) => materias?.find((m) => m.id === id)?.nombre ?? "Sin materia";
	if (loading || !user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Hola de nuevo,"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl md:text-4xl mt-1",
				children: "Tu panel académico"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					label: "Promedio",
					value: stats.promedio.toFixed(2),
					icon: Trophy,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					label: "Materias activas",
					value: String(stats.activas),
					icon: BookOpen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					label: "Trabajos pendientes",
					value: String(stats.pendientes),
					icon: Clock
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KPI, {
					label: "Alertas (7 días)",
					value: String(stats.alertas),
					icon: TriangleAlert,
					tone: "warning"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-6 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "font-serif text-xl",
					children: "Avance general"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvanceGaugeChart, {})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromedioChart, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "font-serif text-xl",
			children: "Próximas entregas"
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: proximasEntregas.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground py-8 text-center",
			children: "No hay entregas próximas. Crea trabajos con fecha de entrega para verlos aquí."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border",
			children: proximasEntregas.map((t) => {
				const fecha = new Date(t.fecha_entrega);
				const diff = Math.ceil((fecha.getTime() - Date.now()) / (1e3 * 60 * 60 * 24));
				const urgente = diff <= 3;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium truncate",
							children: t.titulo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: materiaName(t.materia_id)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `text-sm font-mono ${urgente ? "text-destructive" : "text-muted-foreground"}`,
						children: [
							fecha.toLocaleDateString(),
							" · ",
							diff === 0 ? "hoy" : `${diff}d`
						]
					})]
				}, t.id);
			})
		}) })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	] });
}
function KPI({ label, value, icon: Icon, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground uppercase tracking-wide",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-serif text-3xl mt-2",
					children: value
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `size-10 rounded-lg flex items-center justify-center ${tone === "success" ? "bg-success/10 text-success" : tone === "warning" ? "bg-warning/15 text-warning-foreground" : "bg-primary/10 text-primary"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
				})]
			})
		})
	});
}
//#endregion
export { DashboardPage as component };
