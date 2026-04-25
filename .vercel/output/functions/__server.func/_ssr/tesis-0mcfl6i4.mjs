import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as supabase, r as useAuth } from "./useAuth-BL_SAut3.mjs";
import { t as Button } from "./button-DVyqAt4Q.mjs";
import { t as Input } from "./input-DW4PzhPm.mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Flag, C as LoaderCircle, D as GripVertical, F as CircleCheck, H as Calendar, M as Download, N as Clock, P as Circle, R as ChevronRight, T as LayoutGrid, U as BookOpen, _ as Plus, a as User, d as Trash2, f as Target, j as FileText, k as FolderOpen, u as TrendingUp, v as Pencil, y as Microscope } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Bcy6-nCM.mjs";
import { t as AppShell } from "./AppShell-CBLsldfO.mjs";
import { a as DialogHeader, i as DialogFooter, n as Dialog, o as DialogTitle, r as DialogContent, s as Textarea, t as Badge } from "./textarea-CLyuidcl.mjs";
import { t as Progress } from "./progress-CZD-ZMJu.mjs";
import { t as Route } from "./tesis-B4Yt2-J9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tesis-0mcfl6i4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ESTADO_CONFIG = {
	borrador: {
		label: "BORRADOR",
		color: "#6b7280"
	},
	en_progreso: {
		label: "EN PROGRESO",
		color: "#f59e0b"
	},
	revision: {
		label: "REVISIÓN",
		color: "#3b82f6"
	},
	aprobada: {
		label: "APROBADA",
		color: "#22c55e"
	},
	defendida: {
		label: "DEFENDIDA",
		color: "#a855f7"
	}
};
function TesisEditDialog({ tesis, open, onOpenChange }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		titulo: tesis.titulo,
		subtitulo: tesis.subtitulo ?? "",
		director: tesis.director ?? "",
		co_director: tesis.co_director ?? "",
		institucion: tesis.institucion ?? "",
		programa: tesis.programa ?? "",
		estado: tesis.estado,
		fecha_inicio: tesis.fecha_inicio ?? "",
		fecha_defensa: tesis.fecha_defensa ?? "",
		palabras_objetivo: tesis.palabras_objetivo ?? 5e4,
		palabras_actuales: tesis.palabras_actuales ?? 0,
		resumen: tesis.resumen ?? "",
		palabras_clave: (tesis.palabras_clave ?? []).join(", ")
	});
	const save = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("tesis").update({
				titulo: form.titulo,
				subtitulo: form.subtitulo || null,
				director: form.director || null,
				co_director: form.co_director || null,
				institucion: form.institucion || null,
				programa: form.programa || null,
				estado: form.estado,
				fecha_inicio: form.fecha_inicio || null,
				fecha_defensa: form.fecha_defensa || null,
				palabras_objetivo: form.palabras_objetivo,
				palabras_actuales: form.palabras_actuales,
				resumen: form.resumen || null,
				palabras_clave: form.palabras_clave ? form.palabras_clave.split(",").map((s) => s.trim()).filter(Boolean) : null,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", tesis.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Tesis actualizada");
			qc.invalidateQueries({ queryKey: ["tesis"] });
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	const f = (k) => (e) => setForm({
		...form,
		[k]: e.target.value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-serif text-2xl",
					children: "Editar Tesis"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Título *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.titulo,
							onChange: f("titulo"),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Subtítulo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.subtitulo,
							onChange: f("subtitulo"),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Director"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.director,
									onChange: f("director"),
									className: "mt-1",
									placeholder: "Dr. Apellido"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Co-Director"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.co_director,
									onChange: f("co_director"),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Institución"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.institucion,
									onChange: f("institucion"),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Programa"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.programa,
									onChange: f("programa"),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Inicio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.fecha_inicio,
									onChange: f("fecha_inicio"),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Fecha de defensa"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.fecha_defensa,
									onChange: f("fecha_defensa"),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Palabras objetivo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.palabras_objetivo,
									onChange: f("palabras_objetivo"),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Palabras escritas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.palabras_actuales,
									onChange: f("palabras_actuales"),
									className: "mt-1"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Estado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.estado,
							onChange: f("estado"),
							className: "mt-1 w-full rounded border px-3 py-2 text-sm",
							style: {
								background: "rgba(20,2,2,0.7)",
								borderColor: "rgba(245,158,11,0.25)",
								color: "#f5e6d3"
							},
							children: Object.entries(ESTADO_CONFIG).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: v.label
							}, k))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Resumen / Abstract"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 4,
							value: form.resumen,
							onChange: f("resumen"),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Palabras clave (separadas por coma)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.palabras_clave,
							onChange: f("palabras_clave"),
							className: "mt-1",
							placeholder: "investigación, metodología, análisis"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => save.mutate(),
					disabled: !form.titulo || save.isPending,
					children: [save.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), "Guardar cambios"]
				})] })
			]
		})
	});
}
function TesisInfoPanel({ tesis }) {
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const progreso = Math.min(100, (tesis.palabras_actuales ?? 0) / (tesis.palabras_objetivo || 5e4) * 100);
	const estado = ESTADO_CONFIG[tesis.estado] ?? {
		label: tesis.estado.toUpperCase(),
		color: "#f59e0b"
	};
	const diasDefensa = tesis.fecha_defensa ? Math.ceil((new Date(tesis.fecha_defensa).getTime() - Date.now()) / 864e5) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-6 border-b",
		style: { borderColor: "rgba(245,158,11,0.15)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 flex-wrap mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								style: {
									background: `${estado.color}22`,
									color: estado.color,
									border: `1px solid ${estado.color}44`
								},
								className: "text-[10px] uppercase tracking-widest font-bold",
								children: estado.label
							}), tesis.programa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground uppercase tracking-wider",
								children: tesis.programa
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl font-bold leading-tight",
							style: { color: "#fbbf24" },
							children: tesis.titulo
						}),
						tesis.subtitulo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: tesis.subtitulo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mt-3 flex-wrap",
							children: [
								tesis.director && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
										className: "size-3.5",
										style: { color: "#f59e0b" }
									}), tesis.director]
								}),
								tesis.institucion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
										className: "size-3.5",
										style: { color: "#f59e0b" }
									}), tesis.institucion]
								}),
								tesis.fecha_defensa && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 text-sm",
									style: { color: diasDefensa !== null && diasDefensa < 90 ? "#f97316" : "#d4a574" },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }),
										"Defensa: ",
										new Date(tesis.fecha_defensa).toLocaleDateString("es-ES", {
											day: "2-digit",
											month: "long",
											year: "numeric"
										}),
										diasDefensa !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs ml-1",
											children: [
												"(",
												diasDefensa > 0 ? `${diasDefensa} días` : "¡Hoy!",
												")"
											]
										})
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setEditOpen(true),
					className: "shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5 mr-1.5" }), "Editar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs uppercase tracking-wider",
						style: { color: "#d4a574" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3 inline mr-1" }), "Progreso de redacción"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs tabular-nums",
						style: { color: "#fbbf24" },
						children: [
							(tesis.palabras_actuales ?? 0).toLocaleString(),
							" / ",
							(tesis.palabras_objetivo ?? 5e4).toLocaleString(),
							" palabras",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 font-bold",
								children: [
									"(",
									progreso.toFixed(1),
									"%)"
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: progreso,
					className: "h-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-3 mt-4",
				children: [
					{
						label: "Palabras escritas",
						value: (tesis.palabras_actuales ?? 0).toLocaleString(),
						icon: FileText
					},
					{
						label: "Objetivo",
						value: (tesis.palabras_objetivo ?? 5e4).toLocaleString(),
						icon: Target
					},
					{
						label: "Días para defensa",
						value: diasDefensa !== null ? diasDefensa > 0 ? diasDefensa : "¡Hoy!" : "—",
						icon: Clock
					}
				].map(({ label, value, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded p-3 text-center",
					style: {
						background: "rgba(74,4,4,0.35)",
						border: "1px solid rgba(245,158,11,0.12)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4 mx-auto mb-1",
							style: { color: "#f59e0b" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-bold font-serif",
							style: { color: "#fbbf24" },
							children: value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-wider text-muted-foreground",
							children: label
						})
					]
				}, label))
			}),
			tesis.palabras_clave?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 flex-wrap mt-3",
				children: tesis.palabras_clave.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] px-2 py-0.5 rounded uppercase tracking-widest",
					style: {
						background: "rgba(245,158,11,0.1)",
						color: "#f59e0b",
						border: "1px solid rgba(245,158,11,0.2)"
					},
					children: k
				}, k))
			}) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TesisEditDialog, {
		tesis,
		open: editOpen,
		onOpenChange: setEditOpen
	})] });
}
function CrearTesisCard({ userId }) {
	const qc = useQueryClient();
	const [titulo, setTitulo] = (0, import_react.useState)("");
	const create = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("tesis").insert({
				user_id: userId,
				titulo: titulo || "Mi Tesis de Maestría",
				estado: "en_progreso",
				palabras_objetivo: 5e4,
				palabras_actuales: 0
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Proyecto de tesis creado");
			qc.invalidateQueries({ queryKey: ["tesis"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center h-full text-center px-8 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-20 rounded-full mb-6 flex items-center justify-center",
				style: {
					background: "rgba(245,158,11,0.1)",
					border: "2px solid rgba(245,158,11,0.3)",
					boxShadow: "0 0 30px rgba(245,158,11,0.15)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
					className: "size-10",
					style: {
						color: "#f59e0b",
						filter: "drop-shadow(0 0 6px rgba(245,158,11,0.6))"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl font-bold mb-2",
				style: { color: "#fbbf24" },
				children: "INICIAR PROYECTO DE TESIS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mb-6 max-w-sm",
				children: "Crea tu proyecto de tesis para gestionar capítulos, hitos, documentos y el avance general de tu investigación."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 w-full max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: titulo,
					onChange: (e) => setTitulo(e.target.value),
					placeholder: "Título de tu tesis...",
					className: "flex-1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => create.mutate(),
					disabled: create.isPending,
					children: create.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" })
				})]
			})
		]
	});
}
var ESTADOS = [
	{
		id: "pendiente",
		label: "PENDIENTE",
		color: "#6b7280",
		bg: "rgba(107,114,128,0.1)"
	},
	{
		id: "en_progreso",
		label: "EN PROGRESO",
		color: "#f59e0b",
		bg: "rgba(245,158,11,0.1)"
	},
	{
		id: "revision",
		label: "REVISIÓN",
		color: "#3b82f6",
		bg: "rgba(59,130,246,0.1)"
	},
	{
		id: "aprobado",
		label: "APROBADO",
		color: "#22c55e",
		bg: "rgba(34,197,94,0.1)"
	}
];
function CapituloDialog({ tesisId, userId, capitulo, open, onOpenChange }) {
	const qc = useQueryClient();
	const isEdit = !!capitulo;
	const [form, setForm] = (0, import_react.useState)({
		titulo: capitulo?.titulo ?? "",
		descripcion: capitulo?.descripcion ?? "",
		estado: capitulo?.estado ?? "pendiente",
		palabras_objetivo: capitulo?.palabras_objetivo ?? 5e3,
		palabras_actuales: capitulo?.palabras_actuales ?? 0,
		fecha_limite: capitulo?.fecha_limite ?? "",
		notas: capitulo?.notas ?? ""
	});
	const save = useMutation({
		mutationFn: async () => {
			const payload = {
				tesis_id: tesisId,
				user_id: userId,
				titulo: form.titulo,
				descripcion: form.descripcion || null,
				estado: form.estado,
				palabras_objetivo: form.palabras_objetivo,
				palabras_actuales: form.palabras_actuales,
				fecha_limite: form.fecha_limite || null,
				notas: form.notas || null
			};
			if (isEdit) {
				const { error } = await supabase.from("tesis_capitulos").update(payload).eq("id", capitulo.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("tesis_capitulos").insert(payload);
				if (error) throw error;
			}
		},
		onSuccess: () => {
			toast.success(isEdit ? "Capítulo actualizado" : "Capítulo creado");
			qc.invalidateQueries({ queryKey: ["tesis-capitulos"] });
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	const f = (k) => (e) => setForm({
		...form,
		[k]: e.target.value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-serif text-xl",
					children: isEdit ? "Editar capítulo" : "Nuevo capítulo"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Título *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.titulo,
							onChange: f("titulo"),
							className: "mt-1",
							placeholder: "Ej: Marco Teórico"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Descripción"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: form.descripcion,
							onChange: f("descripcion"),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Estado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: form.estado,
									onChange: f("estado"),
									className: "mt-1 w-full rounded border px-3 py-2 text-sm",
									style: {
										background: "rgba(20,2,2,0.7)",
										borderColor: "rgba(245,158,11,0.25)",
										color: "#f5e6d3"
									},
									children: ESTADOS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: e.id,
										children: e.label
									}, e.id))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Fecha límite"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: form.fecha_limite,
									onChange: f("fecha_limite"),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Palabras objetivo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.palabras_objetivo,
									onChange: f("palabras_objetivo"),
									className: "mt-1"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs text-muted-foreground uppercase tracking-wider",
									children: "Palabras escritas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.palabras_actuales,
									onChange: f("palabras_actuales"),
									className: "mt-1"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Notas del capítulo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: form.notas,
							onChange: f("notas"),
							className: "mt-1"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => save.mutate(),
					disabled: !form.titulo || save.isPending,
					children: [save.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), isEdit ? "Guardar" : "Crear capítulo"]
				})] })
			]
		})
	});
}
function CapituloCard({ cap, tesisId, userId, onMove }) {
	const qc = useQueryClient();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const progreso = Math.min(100, (cap.palabras_actuales ?? 0) / (cap.palabras_objetivo || 5e3) * 100);
	const estado = ESTADOS.find((e) => e.id === cap.estado) ?? ESTADOS[0];
	const del = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("tesis_capitulos").delete().eq("id", cap.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Capítulo eliminado");
			qc.invalidateQueries({ queryKey: ["tesis-capitulos"] });
		}
	});
	const nextEstado = ESTADOS[ESTADOS.findIndex((e) => e.id === cap.estado) + 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded p-3 mb-2 group relative",
		style: {
			background: "rgba(35,5,5,0.7)",
			border: "1px solid rgba(245,158,11,0.15)",
			backdropFilter: "blur(8px)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-4 text-muted-foreground/40 mt-0.5 shrink-0 cursor-grab" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold leading-tight truncate",
						style: { color: "#f5e6d3" },
						children: cap.titulo
					}), cap.descripcion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5 line-clamp-1",
						children: cap.descripcion
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2.5 px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-[10px] text-muted-foreground mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [(cap.palabras_actuales ?? 0).toLocaleString(), " palabras"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [progreso.toFixed(0), "%"] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: progreso,
					className: "h-1"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mt-2.5 px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "text-[9px] font-bold uppercase tracking-widest",
					style: {
						background: estado.bg,
						color: estado.color,
						border: `1px solid ${estado.color}33`
					},
					children: estado.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
					children: [
						nextEstado && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onMove(cap.id, nextEstado.id),
							title: `Mover a ${nextEstado.label}`,
							className: "p-1 rounded hover:bg-amber-500/10 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								className: "size-3.5",
								style: { color: "#f59e0b" }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setEditOpen(true),
							className: "p-1 rounded hover:bg-amber-500/10 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {
								className: "size-3.5",
								style: { color: "#f59e0b" }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								if (confirm("¿Eliminar capítulo?")) del.mutate();
							},
							className: "p-1 rounded hover:bg-red-500/10 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-red-400" })
						})
					]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapituloDialog, {
		tesisId,
		userId,
		capitulo: cap,
		open: editOpen,
		onOpenChange: setEditOpen
	})] });
}
function CapitulosKanban({ tesisId, userId }) {
	const qc = useQueryClient();
	const [newOpen, setNewOpen] = (0, import_react.useState)(false);
	const { data: capitulos = [], isLoading } = useQuery({
		queryKey: ["tesis-capitulos", tesisId],
		queryFn: async () => {
			const { data, error } = await supabase.from("tesis_capitulos").select("*").eq("tesis_id", tesisId).order("orden").order("created_at");
			if (error) throw error;
			return data;
		}
	});
	const moveMutation = useMutation({
		mutationFn: async ({ id, estado }) => {
			const { error } = await supabase.from("tesis_capitulos").update({ estado }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["tesis-capitulos"] }),
		onError: (e) => toast.error(e.message)
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-5 animate-spin",
			style: { color: "#f59e0b" }
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-lg font-bold uppercase tracking-widest",
				style: { color: "#fbbf24" },
				children: "Capítulos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setNewOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1.5" }), "Nuevo"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
			children: ESTADOS.map((col) => {
				const caps = capitulos.filter((c) => c.estado === col.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded p-3 min-h-[200px]",
					style: {
						background: col.bg,
						border: `1px solid ${col.color}22`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-widest",
								style: { color: col.color },
								children: col.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "text-[9px]",
								style: {
									background: `${col.color}22`,
									color: col.color,
									border: `1px solid ${col.color}33`
								},
								children: caps.length
							})]
						}),
						caps.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapituloCard, {
							cap,
							tesisId,
							userId,
							onMove: (id, estado) => moveMutation.mutate({
								id,
								estado
							})
						}, cap.id)),
						caps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-center text-muted-foreground py-6 opacity-50",
							children: "Sin capítulos"
						})
					]
				}, col.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapituloDialog, {
			tesisId,
			userId,
			open: newOpen,
			onOpenChange: setNewOpen
		})
	] });
}
function HitoDialog({ tesisId, userId, hito, open, onOpenChange }) {
	const qc = useQueryClient();
	const isEdit = !!hito;
	const [form, setForm] = (0, import_react.useState)({
		titulo: hito?.titulo ?? "",
		descripcion: hito?.descripcion ?? "",
		fecha_limite: hito?.fecha_limite ?? ""
	});
	const save = useMutation({
		mutationFn: async () => {
			if (!form.fecha_limite) throw new Error("La fecha límite es requerida");
			const payload = {
				tesis_id: tesisId,
				user_id: userId,
				titulo: form.titulo,
				descripcion: form.descripcion || null,
				fecha_limite: form.fecha_limite
			};
			if (isEdit) {
				const { error } = await supabase.from("tesis_hitos").update(payload).eq("id", hito.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("tesis_hitos").insert(payload);
				if (error) throw error;
			}
		},
		onSuccess: () => {
			toast.success(isEdit ? "Hito actualizado" : "Hito creado");
			qc.invalidateQueries({ queryKey: ["tesis-hitos"] });
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-serif text-xl",
					children: isEdit ? "Editar hito" : "Nuevo hito"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Título *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.titulo,
							onChange: (e) => setForm({
								...form,
								titulo: e.target.value
							}),
							className: "mt-1",
							placeholder: "Ej: Entrega del marco teórico"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Descripción"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: form.descripcion,
							onChange: (e) => setForm({
								...form,
								descripcion: e.target.value
							}),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Fecha límite *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: form.fecha_limite,
							onChange: (e) => setForm({
								...form,
								fecha_limite: e.target.value
							}),
							className: "mt-1"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => save.mutate(),
					disabled: !form.titulo || !form.fecha_limite || save.isPending,
					children: [save.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }), isEdit ? "Guardar" : "Crear hito"]
				})] })
			]
		})
	});
}
function HitosTimeline({ tesisId, userId }) {
	const qc = useQueryClient();
	const [newOpen, setNewOpen] = (0, import_react.useState)(false);
	const { data: hitos = [], isLoading } = useQuery({
		queryKey: ["tesis-hitos", tesisId],
		queryFn: async () => {
			const { data, error } = await supabase.from("tesis_hitos").select("*").eq("tesis_id", tesisId).order("fecha_limite");
			if (error) throw error;
			return data;
		}
	});
	const toggleMutation = useMutation({
		mutationFn: async ({ id, completado }) => {
			const { error } = await supabase.from("tesis_hitos").update({
				completado,
				fecha_completado: completado ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : null
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["tesis-hitos"] }),
		onError: (e) => toast.error(e.message)
	});
	const delMutation = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("tesis_hitos").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Hito eliminado");
			qc.invalidateQueries({ queryKey: ["tesis-hitos"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-5 animate-spin",
			style: { color: "#f59e0b" }
		})
	});
	const completados = hitos.filter((h) => h.completado).length;
	const pct = hitos.length > 0 ? completados / hitos.length * 100 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-serif text-lg font-bold uppercase tracking-widest",
					style: { color: "#fbbf24" },
					children: "Cronograma"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					style: {
						background: "rgba(245,158,11,0.1)",
						color: "#f59e0b",
						border: "1px solid rgba(245,158,11,0.3)"
					},
					className: "text-[10px] font-bold uppercase",
					children: [
						completados,
						"/",
						hitos.length,
						" completados · ",
						pct.toFixed(0),
						"%"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setNewOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5 mr-1.5" }), "Hito"]
			})]
		}),
		hitos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center py-12 rounded border border-dashed",
			style: { borderColor: "rgba(245,158,11,0.2)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-8 mx-auto mb-2 text-muted-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No hay hitos en el cronograma"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-5 top-3 bottom-3 w-px",
				style: { background: "rgba(245,158,11,0.2)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: hitos.map((h) => {
					const fecha = new Date(h.fecha_limite);
					const diasRestantes = Math.ceil((fecha.getTime() - Date.now()) / 864e5);
					const vencido = !h.completado && diasRestantes < 0;
					const urgente = !h.completado && diasRestantes >= 0 && diasRestantes <= 7;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 group relative pl-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-3 top-3 z-10 -translate-x-1/2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleMutation.mutate({
									id: h.id,
									completado: !h.completado
								}),
								className: "transition-transform hover:scale-110",
								children: h.completado ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									className: "size-5",
									style: {
										color: "#22c55e",
										filter: "drop-shadow(0 0 4px rgba(34,197,94,0.6))"
									}
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
									className: "size-5",
									style: { color: vencido ? "#ef4444" : urgente ? "#f97316" : "#f59e0b" }
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 rounded p-3",
							style: {
								background: h.completado ? "rgba(34,197,94,0.05)" : vencido ? "rgba(239,68,68,0.05)" : "rgba(35,5,5,0.6)",
								border: `1px solid ${h.completado ? "rgba(34,197,94,0.2)" : vencido ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.12)"}`
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-sm font-semibold ${h.completado ? "line-through text-muted-foreground" : ""}`,
											style: { color: h.completado ? void 0 : "#f5e6d3" },
											children: h.titulo
										}),
										h.descripcion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-0.5",
											children: h.descripcion
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mt-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
													className: "size-3",
													style: { color: vencido ? "#ef4444" : "#d4a574" }
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs",
													style: { color: vencido ? "#ef4444" : urgente ? "#f97316" : "#d4a574" },
													children: fecha.toLocaleDateString("es-ES", {
														day: "2-digit",
														month: "long",
														year: "numeric"
													})
												}),
												!h.completado && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold uppercase tracking-wider",
													style: { color: vencido ? "#ef4444" : urgente ? "#f97316" : "transparent" },
													children: vencido ? `· VENCIDO hace ${Math.abs(diasRestantes)} días` : urgente ? `· ${diasRestantes}d restantes` : ""
												}),
												h.completado && h.fecha_completado && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-green-500/70",
													children: ["· Completado ", new Date(h.fecha_completado).toLocaleDateString("es-ES")]
												})
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										if (confirm("¿Eliminar hito?")) delMutation.mutate(h.id);
									},
									className: "p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-red-400" })
								})]
							})
						})]
					}, h.id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HitoDialog, {
			tesisId,
			userId,
			open: newOpen,
			onOpenChange: setNewOpen
		})
	] });
}
var BUCKET = "tesis-documentos";
var TIPOS_DOC = [
	{
		id: "borrador",
		label: "Borrador"
	},
	{
		id: "capitulo",
		label: "Capítulo"
	},
	{
		id: "revision",
		label: "Revisión"
	},
	{
		id: "final",
		label: "Versión final"
	},
	{
		id: "otro",
		label: "Otro"
	}
];
function DocumentosPanel({ tesisId }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [tipoSeleccionado, setTipoSeleccionado] = (0, import_react.useState)("borrador");
	const [version, setVersion] = (0, import_react.useState)("");
	const { data: docs = [], isLoading } = useQuery({
		queryKey: ["tesis-docs", tesisId],
		queryFn: async () => {
			const { data, error } = await supabase.from("tesis_documentos").select("*").eq("tesis_id", tesisId).order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const handleUpload = async (files) => {
		if (!user || files.length === 0) return;
		setUploading(true);
		let ok = 0;
		for (const file of Array.from(files)) try {
			const path = `${user.id}/${tesisId}/${Date.now()}-${file.name}`;
			const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file);
			if (upErr) throw upErr;
			const { error } = await supabase.from("tesis_documentos").insert({
				tesis_id: tesisId,
				user_id: user.id,
				nombre: file.name,
				storage_path: path,
				tipo: tipoSeleccionado,
				tamanio: file.size,
				version: version || null
			});
			if (error) throw error;
			ok++;
		} catch (e) {
			toast.error(`Error subiendo ${file.name}: ${e.message}`);
		}
		setUploading(false);
		if (ok > 0) {
			toast.success(`${ok} archivo(s) subido(s)`);
			qc.invalidateQueries({ queryKey: ["tesis-docs"] });
		}
	};
	const delMutation = useMutation({
		mutationFn: async (doc) => {
			await supabase.storage.from(BUCKET).remove([doc.storage_path]);
			const { error } = await supabase.from("tesis_documentos").delete().eq("id", doc.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Documento eliminado");
			qc.invalidateQueries({ queryKey: ["tesis-docs"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const descargar = async (path, nombre) => {
		const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60);
		if (error || !data) {
			toast.error("No se pudo generar el enlace");
			return;
		}
		const a = document.createElement("a");
		a.href = data.signedUrl;
		a.download = nombre;
		a.click();
	};
	const TIPO_COLORS = {
		borrador: "#6b7280",
		capitulo: "#f59e0b",
		revision: "#3b82f6",
		final: "#22c55e",
		otro: "#a855f7"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-lg font-bold uppercase tracking-widest",
				style: { color: "#fbbf24" },
				children: "Repositorio de Documentos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded p-4",
				style: {
					background: "rgba(35,5,5,0.6)",
					border: "1px solid rgba(245,158,11,0.15)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3 items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-[120px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Tipo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: tipoSeleccionado,
								onChange: (e) => setTipoSeleccionado(e.target.value),
								className: "mt-1 w-full rounded border px-2 py-1.5 text-xs",
								style: {
									background: "rgba(20,2,2,0.8)",
									borderColor: "rgba(245,158,11,0.25)",
									color: "#f5e6d3"
								},
								children: TIPOS_DOC.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t.id,
									children: t.label
								}, t.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-[100px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Versión (opcional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: version,
								onChange: (e) => setVersion(e.target.value),
								className: "mt-1 h-8 text-xs",
								placeholder: "v1.0"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Archivo(s)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "file",
									multiple: true,
									disabled: uploading,
									onChange: (e) => {
										if (e.target.files?.length) {
											handleUpload(e.target.files);
											e.target.value = "";
										}
									},
									className: "h-8 text-xs cursor-pointer"
								})
							})]
						}),
						uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "size-4 animate-spin shrink-0",
							style: { color: "#f59e0b" }
						})
					]
				})
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "size-5 animate-spin",
					style: { color: "#f59e0b" }
				})
			}) : docs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-12 rounded border border-dashed",
				style: { borderColor: "rgba(245,158,11,0.2)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-8 mx-auto mb-2 text-muted-foreground/30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No hay documentos subidos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground/60 mt-1",
						children: "Sube versiones de tu manuscrito para tenerlas organizadas"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: docs.map((doc) => {
					const color = TIPO_COLORS[doc.tipo ?? "otro"] ?? "#6b7280";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 p-3 rounded group",
						style: {
							background: "rgba(35,5,5,0.6)",
							border: "1px solid rgba(245,158,11,0.12)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
								className: "size-5 shrink-0",
								style: { color }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium truncate",
										style: { color: "#f5e6d3" },
										children: doc.nombre
									}), doc.version && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] px-1.5 py-0.5 rounded font-bold uppercase",
										style: {
											background: `${color}22`,
											color,
											border: `1px solid ${color}33`
										},
										children: doc.version
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: [
										TIPOS_DOC.find((t) => t.id === doc.tipo)?.label ?? "—",
										" · ",
										((doc.tamanio ?? 0) / 1024).toFixed(1),
										" KB ·",
										" ",
										new Date(doc.created_at).toLocaleDateString("es-ES")
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => descargar(doc.storage_path, doc.nombre),
									className: "h-7 w-7 p-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
										className: "size-3.5",
										style: { color: "#f59e0b" }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										if (confirm("¿Eliminar?")) delMutation.mutate(doc);
									},
									className: "h-7 w-7 p-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-red-400" })
								})]
							})
						]
					}, doc.id);
				})
			})
		]
	});
}
function TesisPage() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const { tab = "capitulos" } = Route.useSearch();
	const setTab = (t) => navigate({
		to: "/tesis",
		search: { tab: t }
	});
	const { data: tesis, isLoading } = useQuery({
		enabled: !!user,
		queryKey: ["tesis", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("tesis").select("*").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	if (loading || !user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-6 flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "size-10 rounded flex items-center justify-center",
			style: {
				background: "rgba(245,158,11,0.1)",
				border: "1px solid rgba(245,158,11,0.3)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Microscope, {
				className: "size-5",
				style: {
					color: "#f59e0b",
					filter: "drop-shadow(0 0 6px rgba(245,158,11,0.6))"
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-widest text-muted-foreground",
			children: "Investigación"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-2xl font-bold",
			style: { color: "#fbbf24" },
			children: "MÓDULO DE TESIS"
		})] })]
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-6 animate-spin",
			style: { color: "#f59e0b" }
		})
	}) : !tesis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl min-h-[400px] flex items-center justify-center",
		style: {
			background: "rgba(35,5,5,0.7)",
			border: "1px solid rgba(245,158,11,0.15)",
			backdropFilter: "blur(12px)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrearTesisCard, { userId: user.id })
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl overflow-hidden",
			style: {
				background: "rgba(35,5,5,0.72)",
				border: "1px solid rgba(245,158,11,0.2)",
				backdropFilter: "blur(12px)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TesisInfoPanel, { tesis })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl overflow-hidden",
			style: {
				background: "rgba(35,5,5,0.72)",
				border: "1px solid rgba(245,158,11,0.15)",
				backdropFilter: "blur(12px)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: tab,
					onValueChange: setTab,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "capitulos",
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4 mr-2" }), "Capítulos"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "cronograma",
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4 mr-2" }), "Cronograma"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
									value: "documentos",
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4 mr-2" }), "Documentos"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "capitulos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapitulosKanban, {
								tesisId: tesis.id,
								userId: user.id
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "cronograma",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HitosTimeline, {
								tesisId: tesis.id,
								userId: user.id
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "documentos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentosPanel, { tesisId: tesis.id })
						})
					]
				})
			})
		})]
	})] });
}
//#endregion
export { TesisPage as component };
