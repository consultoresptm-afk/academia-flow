import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as supabase, r as useAuth } from "./useAuth-BSBqbnp_.mjs";
import { n as cn, t as Button } from "./button-DVyqAt4Q.mjs";
import { t as Input } from "./input-DW4PzhPm.mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as LoaderCircle, F as CircleCheck, H as Calendar, I as CircleAlert, M as Download, N as Clock, U as BookOpen, _ as Plus, a as User, d as Trash2, j as FileText, k as FolderOpen, p as Star, s as Upload, v as Pencil } from "../_libs/lucide-react.mjs";
import { t as AppSidebar } from "./AppSidebar-CRfsJLX1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DltKm6Et.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Bcy6-nCM.mjs";
import { n as CardContent, t as Card } from "./card-qCpth4Ah.mjs";
import { t as Route } from "./materias-CScC8ORw.mjs";
import { a as DialogHeader, i as DialogFooter, n as Dialog, o as DialogTitle, r as DialogContent, s as Textarea, t as Badge } from "./textarea-CLyuidcl.mjs";
import { t as Progress } from "./progress-CZD-ZMJu.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-K1gXOkVT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/materias-Cxt2Qzig.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MateriaSidebar({ materias, selectedId, onSelect, onCreate, onEdit, progresos = {} }) {
	const qc = useQueryClient();
	const removeMutation = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("materias").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Materia eliminada");
			qc.invalidateQueries({ queryKey: ["materias"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex flex-col h-full border-r border-border bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-4 border-b border-border flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-sm",
						children: "Gestión Académica"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "text-xs",
						children: materias.length
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: onCreate,
				className: "h-7 px-2 text-xs gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), " Nueva"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto py-2",
			children: materias.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-12 px-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-8 text-muted-foreground/40 mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Sin materias aún"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "link",
						onClick: onCreate,
						className: "mt-2 text-xs",
						children: "Crear la primera"
					})
				]
			}) : materias.map((m) => {
				const progreso = progresos[m.id] ?? 0;
				const isSelected = m.id === selectedId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: () => onSelect(m.id),
					className: cn("group relative px-4 py-3 cursor-pointer transition-colors border-l-[3px]", isSelected ? "bg-primary/8 border-l-primary" : "border-l-transparent hover:bg-muted/50"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2.5 rounded-full shrink-0",
								style: { backgroundColor: m.color ?? "#16a34a" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("text-sm font-medium truncate", isSelected && "text-primary"),
								children: m.nombre
							})]
						}),
						m.docente && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 mt-1 ml-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground truncate",
								children: m.docente
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 ml-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: progreso,
								className: "h-1 flex-1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-muted-foreground tabular-nums w-7 text-right",
								children: progreso > 0 ? `${progreso.toFixed(0)}%` : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									onEdit(m);
								},
								className: "p-1 rounded hover:bg-muted text-muted-foreground transition-colors",
								"aria-label": "Editar materia",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: (e) => {
									e.stopPropagation();
									if (confirm(`¿Eliminar "${m.nombre}"?`)) removeMutation.mutate(m.id);
								},
								className: "p-1 rounded hover:bg-destructive/10 text-destructive transition-colors",
								"aria-label": "Eliminar materia",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
							})]
						})
					]
				}, m.id);
			})
		})]
	});
}
var TIPOS = [
	"parcial",
	"quiz",
	"ensayo",
	"informe",
	"proyecto",
	"tarea",
	"examen final",
	"exposición"
];
var TRAYECTOS = [
	1,
	2,
	3
];
var ACTIVIDADES = [
	"Autogestionable",
	"Actividad Entregable",
	"Puntos Adicionales",
	"Autoevaluación"
];
function NotasTab({ materiaId }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		titulo: "",
		tipo: "parcial",
		nota: "",
		peso: "",
		trayecto: "1",
		tipo_actividad: "Autogestionable",
		documento_url: ""
	});
	const [file, setFile] = (0, import_react.useState)(null);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const { data: trabajos = [], isLoading } = useQuery({
		queryKey: ["materia-notas", materiaId],
		queryFn: async () => {
			const { data, error } = await supabase.from("trabajos").select("id, titulo, tipo, nota, peso, trayecto, tipo_actividad, documento_url").eq("materia_id", materiaId).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	const save = useMutation({
		mutationFn: async () => {
			let finalDocUrl = form.documento_url;
			if (file && form.tipo_actividad === "Actividad Entregable") {
				setIsUploading(true);
				const fileExt = file.name.split(".").pop();
				const fileName = `${Math.random()}.${fileExt}`;
				if (!user) throw new Error("No autenticado");
				const filePath = `${user.id}/${materiaId}/${fileName}`;
				const { error: uploadError } = await supabase.storage.from("materia-archivos").upload(filePath, file);
				if (uploadError) {
					setIsUploading(false);
					throw uploadError;
				}
				finalDocUrl = filePath;
			}
			const payload = {
				titulo: form.titulo.trim(),
				tipo: form.tipo,
				nota: form.nota === "" ? null : Number(form.nota),
				peso: form.peso === "" ? null : Number(form.peso),
				trayecto: Number(form.trayecto),
				tipo_actividad: form.tipo_actividad,
				documento_url: finalDocUrl,
				materia_id: materiaId,
				user_id: user?.id || ""
			};
			if (editing) {
				const { error } = await supabase.from("trabajos").update(payload).eq("id", editing.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("trabajos").insert(payload);
				if (error) throw error;
			}
			setIsUploading(false);
		},
		onSuccess: () => {
			toast.success(editing ? "Nota actualizada" : "Evaluación registrada");
			qc.invalidateQueries({ queryKey: ["materia-notas", materiaId] });
			qc.invalidateQueries({ queryKey: ["trabajos-todas-notas"] });
			setOpen(false);
			setEditing(null);
			setForm({
				titulo: "",
				tipo: "parcial",
				nota: "",
				peso: "",
				trayecto: "1",
				tipo_actividad: "Autogestionable",
				documento_url: ""
			});
			setFile(null);
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("trabajos").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Eliminado");
			qc.invalidateQueries({ queryKey: ["materia-notas", materiaId] });
			qc.invalidateQueries({ queryKey: ["trabajos-todas-notas"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const openNew = () => {
		setEditing(null);
		setForm({
			titulo: "",
			tipo: "parcial",
			nota: "",
			peso: "",
			trayecto: "1",
			tipo_actividad: "Autogestionable",
			documento_url: ""
		});
		setFile(null);
		setOpen(true);
	};
	const openEdit = (t) => {
		setEditing(t);
		setForm({
			titulo: t.titulo,
			tipo: t.tipo,
			nota: t.nota?.toString() ?? "",
			peso: t.peso?.toString() ?? "",
			trayecto: t.trayecto?.toString() ?? "1",
			tipo_actividad: t.tipo_actividad ?? "Autogestionable",
			documento_url: t.documento_url ?? ""
		});
		setFile(null);
		setOpen(true);
	};
	const conNota = trabajos.filter((t) => t.nota !== null);
	const totalPeso = conNota.reduce((s, t) => s + (t.peso ?? 0), 0);
	const promedio = totalPeso > 0 ? conNota.reduce((s, t) => s + (t.nota ?? 0) * (t.peso ?? 0), 0) / totalPeso : conNota.length > 0 ? conNota.reduce((s, t) => s + (t.nota ?? 0), 0) / conNota.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium",
					children: "Evaluaciones y notas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Registra parciales, quices y trabajos con su peso y nota."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: openNew,
					className: "gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nueva evaluación"]
				})]
			}),
			conNota.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-primary/20 bg-primary/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground uppercase tracking-wide",
						children: "Promedio ponderado"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-4xl font-bold text-primary mt-1",
						children: promedio.toFixed(1)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								conNota.length,
								" con nota · ",
								trabajos.length,
								" totales"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: [totalPeso, "% del peso registrado"]
						})]
					})]
				})
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 bg-muted rounded animate-pulse" }, i))
			}) : trabajos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-10 text-muted-foreground/30 mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground",
						children: "Aún no hay evaluaciones"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground/70 mt-1 mb-3",
						children: "Crea la primera para empezar a llevar tus notas."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: openNew,
						className: "gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nueva evaluación"]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-md border overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-4 py-2.5 font-medium text-muted-foreground",
								children: "Evaluación"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-center px-3 py-2.5 font-medium text-muted-foreground",
								children: "Trayecto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-center px-3 py-2.5 font-medium text-muted-foreground",
								children: "Tipo Actividad"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-center px-3 py-2.5 font-medium text-muted-foreground",
								children: "Tipo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-center px-3 py-2.5 font-medium text-muted-foreground",
								children: "Peso"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-center px-3 py-2.5 font-medium text-muted-foreground",
								children: "Nota"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-20" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: trabajos.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-muted/20 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 font-medium",
									children: [t.titulo, t.documento_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `${supabase.storage.from("materia-archivos").getPublicUrl(t.documento_url).data.publicUrl}`,
										target: "_blank",
										rel: "noreferrer",
										className: "block text-[10px] text-primary hover:underline mt-0.5",
										children: "Ver documento"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "text-xs",
										children: ["T", t.trayecto]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-center text-xs text-muted-foreground",
									children: t.tipo_actividad
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "capitalize text-xs",
										children: t.tipo
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-center text-muted-foreground",
									children: t.peso ? `${t.peso}%` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3 text-center",
									children: t.nota !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-bold text-base ${t.nota >= 60 ? "text-green-600" : "text-red-500"}`,
										children: t.nota.toFixed(1)
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground italic",
										children: "Sin nota"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-2 py-3 text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "size-7",
										onClick: () => openEdit(t),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "size-7",
										onClick: () => {
											if (confirm(`¿Eliminar "${t.titulo}"?`)) remove.mutate(t.id);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-destructive" })
									})]
								})
							]
						}, t.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-serif text-xl",
						children: editing ? "Editar evaluación" : "Nueva evaluación"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Título *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.titulo,
								onChange: (e) => setForm({
									...form,
									titulo: e.target.value
								}),
								placeholder: "Parcial 1, Quiz Capítulo 3..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Trayecto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.trayecto,
									onValueChange: (v) => setForm({
										...form,
										trayecto: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TRAYECTOS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: t.toString(),
										children: ["Trayecto ", t]
									}, t)) })]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo de Actividad" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.tipo_actividad,
									onValueChange: (v) => setForm({
										...form,
										tipo_actividad: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ACTIVIDADES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: a,
										children: a
									}, a)) })]
								})] })]
							}),
							form.tipo_actividad === "Actividad Entregable" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Documento entregable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "file",
									onChange: (e) => setFile(e.target.files?.[0] || null),
									className: "text-xs"
								}),
								form.documento_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground mt-1",
									children: "Ya tiene un archivo asociado."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoría (Tipo)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.tipo,
								onValueChange: (v) => setForm({
									...form,
									tipo: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TIPOS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									className: "capitalize",
									children: t
								}, t)) })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nota (0-100)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									max: 100,
									step: .1,
									value: form.nota,
									onChange: (e) => setForm({
										...form,
										nota: e.target.value
									}),
									placeholder: "Opcional"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Peso (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: 0,
									max: 100,
									step: .1,
									value: form.peso,
									onChange: (e) => setForm({
										...form,
										peso: e.target.value
									}),
									placeholder: "Ej. 30"
								})] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setOpen(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => save.mutate(),
						disabled: save.isPending || isUploading || !form.titulo.trim(),
						children: save.isPending || isUploading ? "Guardando..." : "Guardar"
					})] })
				] })
			})
		]
	});
}
var BUCKET = "materia-archivos";
/**
* Repositorio de archivos por materia.
*
* IMPORTANTE: Este repositorio es INDEPENDIENTE del módulo de Producción.
* - Aquí se guarda documentación general de la materia: programas, lecturas,
*   apuntes, presentaciones, bibliografía base, etc.
* - En Producción se guardan los archivos vinculados a un trabajo específico
*   (borradores, anexos del trabajo). Son repositorios distintos a propósito.
*
* Usa la tabla `materia_archivos` y el bucket `materia-archivos`.
*/
function RepositorioTab({ materiaId }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const { data: archivos = [], isLoading } = useQuery({
		enabled: !!user,
		queryKey: ["materia-archivos", materiaId],
		queryFn: async () => {
			const { data, error } = await supabase.from("materia_archivos").select("*").eq("materia_id", materiaId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const handleUpload = async (files) => {
		if (!user || files.length === 0) return;
		setUploading(true);
		let ok = 0;
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			try {
				const safeName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w.\-]+/g, "_").replace(/_+/g, "_");
				const path = `${user.id}/${materiaId}/${Date.now()}-${safeName}`;
				const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
					contentType: file.type || "application/octet-stream",
					upsert: false
				});
				if (upErr) throw upErr;
				const { error } = await supabase.from("materia_archivos").insert({
					user_id: user.id,
					materia_id: materiaId,
					nombre: file.name,
					storage_path: path,
					tipo: file.type || "application/octet-stream",
					tamanio: file.size
				});
				if (error) throw error;
				ok++;
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				toast.error(`Error subiendo ${file.name}: ${msg}`);
			}
		}
		setUploading(false);
		if (ok > 0) {
			toast.success(`${ok} archivo(s) agregados al repositorio`);
			qc.invalidateQueries({ queryKey: ["materia-archivos", materiaId] });
		}
	};
	const remove = useMutation({
		mutationFn: async (a) => {
			await supabase.storage.from(BUCKET).remove([a.storage_path]);
			const { error } = await supabase.from("materia_archivos").delete().eq("id", a.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Archivo eliminado");
			qc.invalidateQueries({ queryKey: ["materia-archivos", materiaId] });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "size-4 mt-0.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"Repositorio general de la materia: programas, lecturas, apuntes y bibliografía base. Los archivos de cada trabajo se gestionan dentro de su ficha en ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Producción" }),
					"."
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				multiple: true,
				className: "hidden",
				disabled: uploading,
				onChange: (e) => {
					if (e.target.files?.length) handleUpload(e.target.files);
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "button",
				tabIndex: 0,
				onClick: () => !uploading && inputRef.current?.click(),
				onKeyDown: (e) => {
					if ((e.key === "Enter" || e.key === " ") && !uploading) inputRef.current?.click();
				},
				onDragOver: (e) => {
					e.preventDefault();
					setDragOver(true);
				},
				onDragLeave: () => setDragOver(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragOver(false);
					if (e.dataTransfer.files?.length) handleUpload(e.dataTransfer.files);
				},
				className: `cursor-pointer rounded-md border-2 border-dashed py-8 px-4 text-center text-sm transition-colors
          ${dragOver ? "border-primary bg-primary/10" : "border-border hover:border-primary/60 hover:bg-muted/30"}
          ${uploading ? "opacity-60 pointer-events-none" : ""}`,
				children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Subiendo..."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6 mx-auto mb-2 opacity-60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-foreground mb-0.5",
						children: "Haz clic o arrastra archivos aquí"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "Cualquier tipo de archivo: PDF, Word, Excel, imágenes, ZIP, videos…"
					})
				] })
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: [1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 bg-muted rounded animate-pulse" }, i))
			}) : archivos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-center text-muted-foreground py-4",
				children: "Aún no hay documentos en el repositorio de esta materia."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: archivos.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-muted-foreground shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium truncate",
								children: a.nombre
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground truncate",
								children: [
									((a.tamanio ?? 0) / 1024).toFixed(1),
									" KB · ",
									new Date(a.created_at).toLocaleDateString()
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => descargar(a.storage_path, a.nombre),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => {
								if (confirm(`¿Eliminar "${a.nombre}"?`)) remove.mutate({
									id: a.id,
									storage_path: a.storage_path
								});
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})
					]
				}, a.id))
			})
		]
	});
}
function TareasTab({ materiaId }) {
	const { data: trabajos = [], isLoading } = useQuery({
		queryKey: ["materia-tareas", materiaId],
		queryFn: async () => {
			const { data, error } = await supabase.from("trabajos").select("id, titulo, tipo, estado, fecha_entrega, peso").eq("materia_id", materiaId).order("fecha_entrega");
			if (error) throw error;
			return data ?? [];
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: [
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 bg-muted rounded animate-pulse" }, i))
	});
	if (!trabajos.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-10 text-muted-foreground/30 mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Sin tareas registradas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground/70 mt-1",
				children: "Las evaluaciones que crees aparecerán aquí agrupadas por estado."
			})
		]
	});
	const grupos = {
		pendiente: trabajos.filter((t) => t.estado === "investigacion" || t.estado === "borrador"),
		revision: trabajos.filter((t) => t.estado === "revision"),
		entregado: trabajos.filter((t) => t.estado === "entrega")
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-5",
		children: [
			{
				key: "pendiente",
				label: "Pendientes",
				icon: CircleAlert,
				color: "text-orange-500",
				bg: "bg-orange-50 dark:bg-orange-950/20"
			},
			{
				key: "revision",
				label: "En revisión",
				icon: Clock,
				color: "text-blue-500",
				bg: "bg-blue-50 dark:bg-blue-950/20"
			},
			{
				key: "entregado",
				label: "Entregados",
				icon: CircleCheck,
				color: "text-green-600",
				bg: "bg-green-50 dark:bg-green-950/20"
			}
		].map(({ key, label, icon: Icon, color, bg }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center gap-2 px-3 py-2 rounded-md ${bg} mb-2`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-4 ${color}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-sm font-medium ${color}`,
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "ml-auto text-xs",
					children: grupos[key].length
				})
			]
		}), grupos[key].length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground px-3 py-1",
			children: "Sin elementos."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-1.5 pl-2",
			children: grupos[key].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 px-3 py-2 rounded-md border bg-card hover:bg-muted/30 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium truncate",
						children: t.titulo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mt-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground capitalize",
							children: t.tipo
						}), t.fecha_entrega && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3" }), new Date(t.fecha_entrega).toLocaleDateString("es-ES", {
								day: "2-digit",
								month: "short"
							})]
						})]
					})]
				}), t.peso && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground shrink-0",
					children: [t.peso, "%"]
				})]
			}, t.id))
		})] }, key))
	});
}
function MateriaDetailPanel({ materia }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-6 py-5 border-b border-border",
			style: {
				borderTopColor: materia.color ?? "#16a34a",
				borderTopWidth: 4
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-start justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl font-semibold truncate",
								children: materia.nombre
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: materia.estado === "activa" ? "default" : "secondary",
								children: materia.estado
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mt-2 flex-wrap",
							children: [
								materia.codigo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded",
									children: materia.codigo
								}),
								materia.docente && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5" }), materia.docente]
								}),
								materia.creditos && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5" }),
										materia.creditos,
										" créditos"
									]
								}),
								materia.semestre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), materia.semestre]
								})
							]
						}),
						materia.descripcion && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-2 line-clamp-2",
							children: materia.descripcion
						})
					]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto px-6 py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "notas",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "notas",
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 mr-2" }), "Notas"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "tareas",
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 mr-2" }), "Tareas"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "repositorio",
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 mr-2" }), "Repositorio"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "notas",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotasTab, { materiaId: materia.id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "tareas",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TareasTab, { materiaId: materia.id })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "repositorio",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepositorioTab, { materiaId: materia.id })
					})
				]
			})
		})]
	});
}
var COLORS = [
	"#16a34a",
	"#0891b2",
	"#7c3aed",
	"#dc2626",
	"#d97706",
	"#0284c7",
	"#db2777",
	"#ea580c"
];
function MateriaFormDialog({ open, onOpenChange, userId, materia }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		nombre: "",
		codigo: "",
		docente: "",
		creditos: 3,
		semestre: "",
		color: COLORS[0],
		descripcion: "",
		estado: "Materia Activa"
	});
	const isEditing = !!materia;
	(0, import_react.useState)(() => {
		if (materia) setForm({
			nombre: materia.nombre || "",
			codigo: materia.codigo || "",
			docente: materia.docente || "",
			creditos: materia.creditos || 3,
			semestre: materia.semestre || "",
			color: materia.color || COLORS[0],
			descripcion: materia.descripcion || "",
			estado: materia.estado || "Materia Activa"
		});
	});
	(0, import_react.useState)(() => {
		if (open && materia) setForm({
			nombre: materia.nombre || "",
			codigo: materia.codigo || "",
			docente: materia.docente || "",
			creditos: materia.creditos || 3,
			semestre: materia.semestre || "",
			color: materia.color || COLORS[0],
			descripcion: materia.descripcion || "",
			estado: materia.estado || "Materia Activa"
		});
		else if (open && !materia) setForm({
			nombre: "",
			codigo: "",
			docente: "",
			creditos: 3,
			semestre: "",
			color: COLORS[0],
			descripcion: "",
			estado: "Materia Activa"
		});
	});
	const save = useMutation({
		mutationFn: async () => {
			const payload = {
				user_id: userId,
				nombre: form.nombre,
				codigo: form.codigo || null,
				docente: form.docente || null,
				creditos: form.creditos,
				semestre: form.semestre || null,
				color: form.color,
				descripcion: form.descripcion || null,
				estado: form.estado
			};
			if (isEditing) {
				const { error } = await supabase.from("materias").update(payload).eq("id", materia.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("materias").insert(payload);
				if (error) throw error;
			}
		},
		onSuccess: () => {
			toast.success(isEditing ? "Materia actualizada" : "Materia creada");
			qc.invalidateQueries({ queryKey: ["materias"] });
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "font-serif text-2xl flex items-center gap-2",
					children: [isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" }), isEditing ? "Editar materia" : "Nueva materia"]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "mat-nombre",
							children: "Nombre *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "mat-nombre",
							required: true,
							value: form.nombre,
							onChange: (e) => setForm({
								...form,
								nombre: e.target.value
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "mat-codigo",
								children: "Código"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "mat-codigo",
								value: form.codigo,
								onChange: (e) => setForm({
									...form,
									codigo: e.target.value
								}),
								placeholder: "MAT-101"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "mat-creditos",
								children: "Créditos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "mat-creditos",
								type: "number",
								min: 1,
								max: 10,
								value: form.creditos,
								onChange: (e) => setForm({
									...form,
									creditos: Number(e.target.value)
								})
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "mat-docente",
								children: "Docente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "mat-docente",
								value: form.docente,
								onChange: (e) => setForm({
									...form,
									docente: e.target.value
								})
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "mat-semestre",
								children: "Semestre"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "mat-semestre",
								value: form.semestre,
								onChange: (e) => setForm({
									...form,
									semestre: e.target.value
								}),
								placeholder: "2025-I"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "mat-estado",
							children: "Estado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.estado,
							onValueChange: (v) => setForm({
								...form,
								estado: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "mat-estado",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona un estado" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Materia Activa",
									children: "Materia Activa"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Materia Consolidada",
									children: "Materia Consolidada"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Materia En Progreso",
									children: "Materia En Progreso"
								})
							] })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Color de identificación" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 mt-2",
							children: COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									color: c
								}),
								className: `size-8 rounded-full border-2 transition-transform hover:scale-110 ${form.color === c ? "border-foreground scale-110 ring-2 ring-offset-2 ring-foreground/30" : "border-transparent"}`,
								style: { backgroundColor: c },
								"aria-label": c
							}, c))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "mat-desc",
							children: "Descripción"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "mat-desc",
							rows: 2,
							value: form.descripcion,
							onChange: (e) => setForm({
								...form,
								descripcion: e.target.value
							})
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => save.mutate(),
					disabled: !form.nombre || save.isPending,
					children: [save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-2" }) : null, isEditing ? "Guardar cambios" : "Crear materia"]
				})] })
			]
		})
	});
}
function MateriasPage() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const selectedId = Route.useSearch().selected || null;
	const setSelectedId = (id) => navigate({
		to: "/materias",
		search: (p) => ({
			...p,
			selected: id || void 0
		})
	});
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editingMateria, setEditingMateria] = (0, import_react.useState)(null);
	const handleCreate = () => {
		setEditingMateria(null);
		setFormOpen(true);
	};
	const handleEdit = (materia) => {
		setEditingMateria(materia);
		setFormOpen(true);
	};
	const { data: materias = [], isLoading } = useQuery({
		enabled: !!user,
		queryKey: ["materias", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("materias").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		},
		select: (data) => {
			if (data.length > 0 && !selectedId) {}
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (materias.length > 0 && !selectedId) setSelectedId(materias[0].id);
	}, [materias, selectedId]);
	const { data: trabajosConNota = [] } = useQuery({
		enabled: !!user && materias.length > 0,
		queryKey: ["trabajos-todas-notas", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("trabajos").select("materia_id, nota, peso").not("nota", "is", null).not("materia_id", "is", null);
			return data ?? [];
		}
	});
	const progresos = (0, import_react.useMemo)(() => {
		const map = {};
		materias.forEach((m) => {
			const notas = trabajosConNota.filter((t) => t.materia_id === m.id);
			if (!notas.length) {
				map[m.id] = 0;
				return;
			}
			const totalPeso = notas.reduce((s, t) => s + (t.peso ?? 0), 0);
			const promedio = totalPeso > 0 ? notas.reduce((s, t) => s + (t.nota ?? 0) * (t.peso ?? 0), 0) / totalPeso : notas.reduce((s, t) => s + (t.nota ?? 0), 0) / notas.length;
			map[m.id] = Math.min(100, Math.max(0, promedio));
		});
		return map;
	}, [materias, trabajosConNota]);
	const selectedMateria = materias.find((m) => m.id === selectedId) ?? null;
	if (loading || !user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex overflow-hidden h-screen",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-72 shrink-0 flex flex-col overflow-hidden border-r border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 pt-6 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground uppercase tracking-wider",
							children: "Tu semestre"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-2xl mt-0.5",
							children: "Gestión Académica"
						})]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-5 border-2 border-primary border-t-transparent rounded-full animate-spin" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MateriaSidebar, {
						materias,
						selectedId,
						onSelect: setSelectedId,
						onCreate: handleCreate,
						onEdit: handleEdit,
						progresos
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-hidden",
					children: selectedMateria ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MateriaDetailPanel, { materia: selectedMateria }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center h-full text-center px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "size-16 rounded-full bg-primary/10 flex items-center justify-center mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-8 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-xl mb-2",
								children: "Selecciona una materia"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-sm",
								children: materias.length === 0 ? "Crea tu primera materia usando el botón 'Nueva' en la barra lateral izquierda." : "Haz clic en una materia de la lista para ver sus detalles."
							})
						]
					})
				})]
			}),
			user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MateriaFormDialog, {
				open: formOpen,
				onOpenChange: setFormOpen,
				userId: user.id,
				materia: editingMateria
			})
		]
	});
}
//#endregion
export { MateriasPage as component };
