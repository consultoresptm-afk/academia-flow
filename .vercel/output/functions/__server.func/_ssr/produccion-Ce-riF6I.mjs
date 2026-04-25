import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as supabase, r as useAuth } from "./useAuth-BSBqbnp_.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DVyqAt4Q.mjs";
import { t as Input } from "./input-DW4PzhPm.mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useDroppable, i as useDraggable, n as MouseSensor, o as useSensor, r as TouchSensor, s as useSensors, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { C as LoaderCircle, H as Calendar, M as Download, T as LayoutGrid, U as BookOpen, _ as Plus, d as Trash2, j as FileText, m as Sparkles, n as X, r as WandSparkles, s as Upload, v as Pencil, w as List } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DgB-NHqG.mjs";
import { t as Label } from "./label-DltKm6Et.mjs";
import { a as Portal, i as Overlay, n as Content, o as Root, r as Description, s as Title, t as Close } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-Bcy6-nCM.mjs";
import { t as AppShell } from "./AppShell-BNZVYEEj.mjs";
import { n as CardContent, t as Card } from "./card-qCpth4Ah.mjs";
import { a as DialogHeader, i as DialogFooter, n as Dialog, o as DialogTitle, r as DialogContent, s as Textarea, t as Badge } from "./textarea-CLyuidcl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-K1gXOkVT.mjs";
import { t as Route } from "./produccion-Dxb2iL11.mjs";
import { a as HeadingLevel, c as PageOrientation, i as Header2, l as Paragraph, n as File$1, o as Packer, r as Footer2, s as PageNumber, t as AlignmentType, u as TextRun } from "../_libs/docx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produccion-Ce-riF6I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
var TIPOS$1 = [
	"ensayo",
	"informe",
	"proyecto",
	"monografía",
	"presentación",
	"tarea"
];
var ESTADOS = [
	{
		value: "investigacion",
		label: "Investigación"
	},
	{
		value: "borrador",
		label: "Borrador"
	},
	{
		value: "revision",
		label: "Revisión"
	},
	{
		value: "entrega",
		label: "Entrega"
	}
];
var MEDIOS_ENTREGA = [
	"Aula virtual",
	"Correo electrónico",
	"Presencial",
	"Plataforma externa",
	"Otro"
];
var empty = {
	titulo: "",
	tipo: "ensayo",
	estado: "investigacion",
	materia_id: null,
	descripcion: "",
	instrucciones: "",
	objetivos: "",
	palabras_clave: "",
	paginas_estimadas: 5,
	fecha_entrega: "",
	peso: "",
	borrador_notas: "",
	borrador_fecha: "",
	revision_comentarios: "",
	revision_revisor: "",
	revision_fecha: "",
	entrega_fecha_real: "",
	entrega_medio: "",
	entrega_observaciones: "",
	nota: "",
	calificacion_fecha: ""
};
function TrabajoFormDialog({ open, onOpenChange, initial }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [v, setV] = (0, import_react.useState)(empty);
	(0, import_react.useEffect)(() => {
		if (open) setV({
			...empty,
			...initial,
			id: initial?.id,
			materia_id: initial?.materia_id ?? null,
			paginas_estimadas: initial?.paginas_estimadas ?? 5
		});
	}, [open, initial]);
	const { data: materias } = useQuery({
		enabled: !!user && open,
		queryKey: ["materias-list", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("materias").select("id, nombre").order("nombre");
			return data ?? [];
		}
	});
	const save = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("No autenticado");
			const hoy = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			const payload = {
				user_id: user.id,
				titulo: v.titulo.trim(),
				tipo: v.tipo,
				estado: v.estado,
				materia_id: v.materia_id || null,
				descripcion: v.descripcion || null,
				instrucciones: v.instrucciones || null,
				objetivos: v.objetivos || null,
				palabras_clave: v.palabras_clave ? v.palabras_clave.split(",").map((s) => s.trim()).filter(Boolean) : null,
				paginas_estimadas: v.paginas_estimadas,
				fecha_entrega: v.fecha_entrega || null,
				peso: v.peso ? Number(v.peso) : null,
				borrador_notas: v.borrador_notas || null,
				borrador_fecha: v.borrador_fecha || (v.estado === "borrador" && !v.id ? hoy : null),
				revision_comentarios: v.revision_comentarios || null,
				revision_revisor: v.revision_revisor || null,
				revision_fecha: v.revision_fecha || (v.estado === "revision" && !v.id ? hoy : null),
				entrega_fecha_real: v.entrega_fecha_real || (v.estado === "entrega" && !v.id ? hoy : null),
				entrega_medio: v.entrega_medio || null,
				entrega_observaciones: v.entrega_observaciones || null,
				nota: v.nota ? Number(v.nota) : null,
				calificacion_fecha: v.calificacion_fecha || (v.nota ? hoy : null)
			};
			if (v.id) {
				const { error } = await supabase.from("trabajos").update(payload).eq("id", v.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("trabajos").insert(payload);
				if (error) throw error;
			}
		},
		onSuccess: () => {
			toast.success(v.id ? "Trabajo actualizado" : "Trabajo creado");
			qc.invalidateQueries({ queryKey: ["trabajos"] });
			qc.invalidateQueries({ queryKey: ["trabajo", v.id] });
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-serif text-2xl",
					children: v.id ? "Editar trabajo" : "Nuevo trabajo"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "general",
					className: "mt-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid grid-cols-4 w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "general",
									children: "General"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "borrador",
									children: "Borrador"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "revision",
									children: "Revisión"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "entrega",
									children: "Entrega"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "general",
							className: "space-y-4 mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Título *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: v.titulo,
									onChange: (e) => setV({
										...v,
										titulo: e.target.value
									}),
									maxLength: 200
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: v.tipo,
										onValueChange: (x) => setV({
											...v,
											tipo: x
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TIPOS$1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: t,
											className: "capitalize",
											children: t
										}, t)) })]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estado actual" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: v.estado,
										onValueChange: (x) => setV({
											...v,
											estado: x
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ESTADOS.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: e.value,
											children: e.label
										}, e.value)) })]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Materia" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: v.materia_id ?? "_none",
									onValueChange: (x) => setV({
										...v,
										materia_id: x === "_none" ? null : x
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sin materia" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "_none",
										children: "Sin materia"
									}), materias?.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: m.id,
										children: m.nombre
									}, m.id))] })]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descripción / contexto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: v.descripcion,
									onChange: (e) => setV({
										...v,
										descripcion: e.target.value
									}),
									maxLength: 1e3
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Instrucciones del docente" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 3,
									value: v.instrucciones,
									onChange: (e) => setV({
										...v,
										instrucciones: e.target.value
									}),
									maxLength: 2e3
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Objetivos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: v.objetivos,
									onChange: (e) => setV({
										...v,
										objetivos: e.target.value
									}),
									maxLength: 1e3
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Palabras clave (separadas por coma)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: v.palabras_clave,
									onChange: (e) => setV({
										...v,
										palabras_clave: e.target.value
									}),
									placeholder: "educación, tecnología"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Páginas estimadas" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 1,
											value: v.paginas_estimadas,
											onChange: (e) => setV({
												...v,
												paginas_estimadas: Number(e.target.value)
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fecha límite" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "date",
											value: v.fecha_entrega,
											onChange: (e) => setV({
												...v,
												fecha_entrega: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Peso (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 0,
											max: 100,
											step: .1,
											value: v.peso,
											onChange: (e) => setV({
												...v,
												peso: e.target.value
											})
										})] })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "borrador",
							className: "space-y-4 mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Información del primer borrador del trabajo: ideas iniciales, esquema o avance principal."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fecha del borrador" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: v.borrador_fecha,
									onChange: (e) => setV({
										...v,
										borrador_fecha: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Notas del borrador" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 5,
									value: v.borrador_notas,
									onChange: (e) => setV({
										...v,
										borrador_notas: e.target.value
									}),
									placeholder: "Esquema, ideas principales, secciones planeadas, fuentes a consultar…",
									maxLength: 3e3
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "revision",
							className: "space-y-4 mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Información del proceso de revisión (autorrevisión, revisión por pares o del docente)."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Revisor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: v.revision_revisor,
										onChange: (e) => setV({
											...v,
											revision_revisor: e.target.value
										}),
										placeholder: "Yo, compañero, docente…",
										maxLength: 120
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fecha de revisión" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: v.revision_fecha,
										onChange: (e) => setV({
											...v,
											revision_fecha: e.target.value
										})
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Comentarios y cambios sugeridos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 5,
									value: v.revision_comentarios,
									onChange: (e) => setV({
										...v,
										revision_comentarios: e.target.value
									}),
									placeholder: "Errores detectados, mejoras sugeridas, secciones a reescribir…",
									maxLength: 3e3
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "entrega",
							className: "space-y-4 mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Información de la entrega final del trabajo y su calificación."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fecha real de entrega" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: v.entrega_fecha_real,
										onChange: (e) => setV({
											...v,
											entrega_fecha_real: e.target.value
										})
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Medio de entrega" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: v.entrega_medio || "_none",
										onValueChange: (x) => setV({
											...v,
											entrega_medio: x === "_none" ? "" : x
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "_none",
											children: "—"
										}), MEDIOS_ENTREGA.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: m,
											children: m
										}, m))] })]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observaciones de la entrega" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 3,
									value: v.entrega_observaciones,
									onChange: (e) => setV({
										...v,
										entrega_observaciones: e.target.value
									}),
									placeholder: "Confirmación, número de radicado, evidencia, retroalimentación recibida…",
									maxLength: 2e3
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 pt-2 border-t",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nota obtenida (0-100)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										min: 0,
										max: 100,
										step: .1,
										value: v.nota,
										onChange: (e) => setV({
											...v,
											nota: e.target.value
										})
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fecha de calificación" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: v.calificacion_fecha,
										onChange: (e) => setV({
											...v,
											calificacion_fecha: e.target.value
										})
									})] })]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => onOpenChange(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => save.mutate(),
						disabled: !v.titulo.trim() || save.isPending,
						children: save.isPending ? "Guardando..." : "Guardar"
					})]
				})
			]
		})
	});
}
var Sheet = Root;
var SheetPortal = Portal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = Title.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = Description.displayName;
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generarContenido = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("db6e750ab3259a748a797000648f9cd2761c6082601ab1de662ca8bb5caf5096"));
var humanizarContenido = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(createSsrRpc("74376b4903187dd5393fc434b03eb4d6299598a10aee2e3e54ec98a04ec87676"));
var FONT = "Times New Roman";
var SIZE = 24;
var LINE_DOUBLE = 480;
var INDENT_FIRST = 720;
var MARGIN = 1440;
async function exportarTrabajoWord(input) {
	const fechaLarga = (/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	const portada = [];
	for (let i = 0; i < 4; i++) portada.push(blankLine());
	portada.push(new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: LINE_DOUBLE,
			after: 0
		},
		children: [new TextRun({
			text: input.titulo,
			bold: true,
			size: SIZE,
			font: FONT
		})]
	}));
	portada.push(blankLine());
	portada.push(new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: LINE_DOUBLE,
			after: 0
		},
		children: [new TextRun({
			text: input.autor ?? "Autor del trabajo",
			size: SIZE,
			font: FONT
		})]
	}));
	portada.push(new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: LINE_DOUBLE,
			after: 0
		},
		children: [new TextRun({
			text: input.institucion ?? "Institución educativa",
			size: SIZE,
			font: FONT
		})]
	}));
	if (input.curso) portada.push(new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: LINE_DOUBLE,
			after: 0
		},
		children: [new TextRun({
			text: input.curso,
			size: SIZE,
			font: FONT
		})]
	}));
	if (input.docente) portada.push(new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: LINE_DOUBLE,
			after: 0
		},
		children: [new TextRun({
			text: input.docente,
			size: SIZE,
			font: FONT
		})]
	}));
	portada.push(new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: LINE_DOUBLE,
			after: 0
		},
		children: [new TextRun({
			text: fechaLarga,
			size: SIZE,
			font: FONT
		})]
	}));
	portada.push(new Paragraph({
		pageBreakBefore: true,
		children: []
	}));
	portada.push(new Paragraph({
		alignment: AlignmentType.CENTER,
		spacing: {
			line: LINE_DOUBLE,
			after: 240
		},
		children: [new TextRun({
			text: input.titulo,
			bold: true,
			size: SIZE,
			font: FONT
		})]
	}));
	const cuerpo = [];
	const lines = input.contenido.split("\n");
	for (const raw of lines) {
		const line = raw.trimEnd();
		if (!line.trim()) continue;
		if (line.startsWith("# ")) {
			cuerpo.push(new Paragraph({
				alignment: AlignmentType.CENTER,
				spacing: {
					line: LINE_DOUBLE,
					before: 240,
					after: 0
				},
				children: [new TextRun({
					text: line.slice(2).trim(),
					bold: true,
					size: SIZE,
					font: FONT
				})]
			}));
			continue;
		}
		if (line.startsWith("## ")) {
			cuerpo.push(new Paragraph({
				heading: HeadingLevel.HEADING_2,
				alignment: AlignmentType.LEFT,
				spacing: {
					line: LINE_DOUBLE,
					before: 240,
					after: 0
				},
				children: [new TextRun({
					text: line.slice(3).trim(),
					bold: true,
					size: SIZE,
					font: FONT
				})]
			}));
			continue;
		}
		if (line.startsWith("### ")) {
			cuerpo.push(new Paragraph({
				heading: HeadingLevel.HEADING_3,
				alignment: AlignmentType.LEFT,
				spacing: {
					line: LINE_DOUBLE,
					before: 240,
					after: 0
				},
				children: [new TextRun({
					text: line.slice(4).trim(),
					bold: true,
					italics: true,
					size: SIZE,
					font: FONT
				})]
			}));
			continue;
		}
		cuerpo.push(new Paragraph({
			alignment: AlignmentType.LEFT,
			spacing: {
				line: LINE_DOUBLE,
				after: 0
			},
			indent: { firstLine: INDENT_FIRST },
			children: parseInline(line)
		}));
	}
	const referenciasParagraphs = [];
	if (input.referencias?.length) {
		referenciasParagraphs.push(new Paragraph({
			pageBreakBefore: true,
			children: []
		}));
		referenciasParagraphs.push(new Paragraph({
			alignment: AlignmentType.CENTER,
			spacing: {
				line: LINE_DOUBLE,
				after: 240
			},
			children: [new TextRun({
				text: "Referencias",
				bold: true,
				size: SIZE,
				font: FONT
			})]
		}));
		const ordenadas = [...input.referencias].map((r) => r.trim()).filter(Boolean).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));
		for (const ref of ordenadas) referenciasParagraphs.push(new Paragraph({
			alignment: AlignmentType.LEFT,
			spacing: {
				line: LINE_DOUBLE,
				after: 0
			},
			indent: {
				left: INDENT_FIRST,
				hanging: INDENT_FIRST
			},
			children: parseInline(ref)
		}));
	}
	const doc = new File$1({
		styles: { default: { document: { run: {
			font: FONT,
			size: SIZE
		} } } },
		sections: [{
			properties: { page: {
				size: {
					width: 12240,
					height: 15840,
					orientation: PageOrientation.PORTRAIT
				},
				margin: {
					top: MARGIN,
					right: MARGIN,
					bottom: MARGIN,
					left: MARGIN
				}
			} },
			headers: { default: new Header2({ children: [new Paragraph({
				alignment: AlignmentType.RIGHT,
				children: [new TextRun({
					children: [PageNumber.CURRENT],
					font: FONT,
					size: SIZE
				})]
			})] }) },
			footers: { default: new Footer2({ children: [new Paragraph({ children: [] })] }) },
			children: [
				...portada,
				...cuerpo,
				...referenciasParagraphs
			]
		}]
	});
	return await Packer.toBlob(doc);
}
function blankLine() {
	return new Paragraph({
		spacing: {
			line: LINE_DOUBLE,
			after: 0
		},
		children: [new TextRun({
			text: "",
			font: FONT,
			size: SIZE
		})]
	});
}
function parseInline(text) {
	const runs = [];
	const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
	let last = 0;
	let m;
	while ((m = regex.exec(text)) !== null) {
		if (m.index > last) runs.push(new TextRun({
			text: text.slice(last, m.index),
			font: FONT,
			size: SIZE
		}));
		const tok = m[0];
		if (tok.startsWith("**")) runs.push(new TextRun({
			text: tok.slice(2, -2),
			bold: true,
			font: FONT,
			size: SIZE
		}));
		else runs.push(new TextRun({
			text: tok.slice(1, -1),
			italics: true,
			font: FONT,
			size: SIZE
		}));
		last = m.index + tok.length;
	}
	if (last < text.length) runs.push(new TextRun({
		text: text.slice(last),
		font: FONT,
		size: SIZE
	}));
	return runs.length ? runs : [new TextRun({
		text,
		font: FONT,
		size: SIZE
	})];
}
function formatAPA(r) {
	const autores = r.autores.trim();
	const anio = r.anio ? `(${r.anio}).` : "(s.f.).";
	const titulo = r.titulo.trim().replace(/\.$/, "");
	switch (r.tipo) {
		case "libro": return `${autores} ${anio} ${italic(titulo)}. ${r.editorial ?? ""}`.trim();
		case "articulo": return `${autores} ${anio} ${titulo}. ${italic(r.fuente ?? "")}${r.doi ? `. https://doi.org/${r.doi}` : ""}`.trim();
		case "web": return `${autores} ${anio} ${italic(titulo)}. ${r.fuente ?? ""}${r.url ? ` ${r.url}` : ""}`.trim();
		case "tesis": return `${autores} ${anio} ${italic(titulo)} [Tesis]. ${r.editorial ?? ""}`.trim();
		case "capitulo": return `${autores} ${anio} ${titulo}. En ${italic(r.fuente ?? "")} (pp.). ${r.editorial ?? ""}`.trim();
		default: return `${autores} ${anio} ${titulo}. ${r.fuente ?? ""}`.trim();
	}
}
function italic(s) {
	return s ? `*${s}*` : "";
}
var TIPOS = [
	{
		v: "libro",
		l: "Libro"
	},
	{
		v: "articulo",
		l: "Artículo"
	},
	{
		v: "capitulo",
		l: "Capítulo de libro"
	},
	{
		v: "tesis",
		l: "Tesis"
	},
	{
		v: "web",
		l: "Página web"
	}
];
function BibliografiaPanel({ trabajoId }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		tipo: "libro",
		autores: "",
		titulo: "",
		anio: (/* @__PURE__ */ new Date()).getFullYear(),
		fuente: "",
		editorial: "",
		url: "",
		doi: ""
	});
	const { data: refs } = useQuery({
		enabled: !!user,
		queryKey: ["referencias", trabajoId],
		queryFn: async () => {
			const { data, error } = await supabase.from("referencias").select("*").eq("trabajo_id", trabajoId).order("autores");
			if (error) throw error;
			return data ?? [];
		}
	});
	const addMutation = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("No autenticado");
			const cita = formatAPA(form);
			const { error } = await supabase.from("referencias").insert({
				user_id: user.id,
				trabajo_id: trabajoId,
				...form,
				cita_apa: cita
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Referencia añadida");
			setOpen(false);
			setForm({
				tipo: "libro",
				autores: "",
				titulo: "",
				anio: (/* @__PURE__ */ new Date()).getFullYear(),
				fuente: "",
				editorial: "",
				url: "",
				doi: ""
			});
			qc.invalidateQueries({ queryKey: ["referencias", trabajoId] });
		},
		onError: (e) => toast.error(e.message)
	});
	const delMutation = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("referencias").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["referencias", trabajoId] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm font-medium flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }),
						" Bibliografía APA 7ª · ",
						refs?.length ?? 0
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setOpen((v) => !v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-1" }), " Añadir"]
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4 space-y-3 bg-muted/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Tipo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.tipo,
							onValueChange: (v) => setForm({
								...form,
								tipo: v
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TIPOS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: t.v,
								children: t.l
							}, t.v)) })]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Año"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: form.anio ?? "",
							onChange: (e) => setForm({
								...form,
								anio: e.target.value ? Number(e.target.value) : null
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: "Autores (Apellido, A. A., & Apellido, B. B.)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.autores,
						onChange: (e) => setForm({
							...form,
							autores: e.target.value
						}),
						placeholder: "García, M., & López, J."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-xs",
						children: "Título"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.titulo,
						onChange: (e) => setForm({
							...form,
							titulo: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Fuente / Revista"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.fuente ?? "",
								onChange: (e) => setForm({
									...form,
									fuente: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Editorial"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.editorial ?? "",
								onChange: (e) => setForm({
									...form,
									editorial: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "URL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.url ?? "",
								onChange: (e) => setForm({
									...form,
									url: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "DOI"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.doi ?? "",
								onChange: (e) => setForm({
									...form,
									doi: e.target.value
								})
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setOpen(false),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => addMutation.mutate(),
							disabled: !form.autores || !form.titulo || addMutation.isPending,
							children: "Guardar"
						})]
					})
				]
			}),
			refs?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: refs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-sm p-3 rounded-md border bg-background flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 leading-relaxed",
						dangerouslySetInnerHTML: { __html: (r.cita_apa ?? "").replace(/\*([^*]+)\*/g, "<em>$1</em>") }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => delMutation.mutate(r.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5 text-destructive" })
					})]
				}, r.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground py-4 text-center border border-dashed rounded-md",
				children: "Sin referencias todavía"
			})
		]
	});
}
var BUCKET = "trabajo-archivos";
var compressImage = async (file, maxWidth = 1920, quality = .8) => {
	if (!file.type.startsWith("image/")) return file;
	return new Promise((resolve) => {
		const img = new Image();
		img.src = URL.createObjectURL(file);
		img.onload = () => {
			URL.revokeObjectURL(img.src);
			const canvas = document.createElement("canvas");
			let { width, height } = img;
			if (width > maxWidth) {
				height = Math.round(height * maxWidth / width);
				width = maxWidth;
			}
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) return resolve(file);
			ctx.drawImage(img, 0, 0, width, height);
			canvas.toBlob((blob) => {
				if (!blob) return resolve(file);
				const newName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
				resolve(new File([blob], newName, { type: "image/jpeg" }));
			}, "image/jpeg", quality);
		};
		img.onerror = () => resolve(file);
	});
};
function ArchivosPanel({ trabajoId }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const { data: archivos } = useQuery({
		enabled: !!user,
		queryKey: ["archivos", trabajoId],
		queryFn: async () => {
			const { data, error } = await supabase.from("trabajo_archivos").select("*").eq("trabajo_id", trabajoId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const handleUploadMultiple = async (files) => {
		if (!user || files.length === 0) return;
		setUploading(true);
		let successCount = 0;
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			try {
				if (file.type.startsWith("image/")) file = await compressImage(file);
				const safeName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w.\-]+/g, "_").replace(/_+/g, "_");
				const path = `${user.id}/${trabajoId}/${Date.now()}-${safeName}`;
				const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
					contentType: file.type || "application/octet-stream",
					upsert: false
				});
				if (upErr) throw upErr;
				const { error } = await supabase.from("trabajo_archivos").insert({
					user_id: user.id,
					trabajo_id: trabajoId,
					nombre: file.name,
					storage_path: path,
					tipo: file.type,
					tamanio: file.size
				});
				if (error) throw error;
				successCount++;
			} catch (err) {
				toast.error(`Error subiendo ${file.name}: ${err.message}`);
			}
		}
		setUploading(false);
		if (successCount > 0) {
			toast.success(`${successCount} archivo(s) subido(s) correctamente`);
			qc.invalidateQueries({ queryKey: ["archivos", trabajoId] });
		}
	};
	const removeMutation = useMutation({
		mutationFn: async (a) => {
			await supabase.storage.from(BUCKET).remove([a.storage_path]);
			const { error } = await supabase.from("trabajo_archivos").delete().eq("id", a.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Archivo eliminado");
			qc.invalidateQueries({ queryKey: ["archivos", trabajoId] });
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				multiple: true,
				className: "hidden",
				disabled: uploading,
				onChange: (e) => {
					if (e.target.files?.length) handleUploadMultiple(e.target.files);
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
					if (e.dataTransfer.files?.length) handleUploadMultiple(e.dataTransfer.files);
				},
				className: `cursor-pointer rounded-md border-2 border-dashed py-6 px-4 text-center text-xs transition-colors
          ${dragOver ? "border-primary bg-primary/10" : "border-border hover:border-primary/60 hover:bg-muted/30"}
          ${uploading ? "opacity-60 pointer-events-none" : ""}`,
				children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Subiendo..."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5 mx-auto mb-2 opacity-60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-foreground mb-0.5",
						children: "Haz clic o arrastra archivos aquí"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						children: "PDFs, imágenes o documentos · las imágenes se comprimen automáticamente"
					})
				] })
			}),
			archivos?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: archivos.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-muted-foreground shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm truncate",
								children: a.nombre
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [((a.tamanio ?? 0) / 1024).toFixed(1), " KB"]
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
							onClick: () => removeMutation.mutate({
								id: a.id,
								storage_path: a.storage_path
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})
					]
				}, a.id))
			}) : null
		]
	});
}
function TrabajoDetailSheet({ trabajoId, open, onOpenChange, onEdit }) {
	const qc = useQueryClient();
	const [contenido, setContenido] = (0, import_react.useState)("");
	const [humanizado, setHumanizado] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const { data: trabajo, isLoading } = useQuery({
		enabled: !!trabajoId,
		queryKey: ["trabajo", trabajoId],
		queryFn: async () => {
			const { data, error } = await supabase.from("trabajos").select("*, materias(nombre, color, docente)").eq("id", trabajoId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		setContenido("");
		setHumanizado("");
	}, [trabajoId]);
	(0, import_react.useEffect)(() => {
		if (trabajo) {
			setContenido(trabajo.contenido ?? "");
			setHumanizado(trabajo.contenido_humanizado ?? "");
		}
	}, [trabajo?.id]);
	const { data: refs } = useQuery({
		enabled: !!trabajoId,
		queryKey: ["referencias", trabajoId],
		queryFn: async () => {
			const { data } = await supabase.from("referencias").select("cita_apa").eq("trabajo_id", trabajoId).order("autores");
			return data ?? [];
		}
	});
	const saveContent = useMutation({
		mutationFn: async (patch) => {
			if (!trabajoId) throw new Error("Sin trabajo seleccionado");
			const { error } = await supabase.from("trabajos").update(patch).eq("id", trabajoId);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["trabajo", trabajoId] }),
		onError: (e) => toast.error(e.message)
	});
	const delMutation = useMutation({
		mutationFn: async () => {
			if (!trabajoId) throw new Error("Sin trabajo seleccionado");
			const { error } = await supabase.from("trabajos").delete().eq("id", trabajoId);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Trabajo eliminado");
			qc.invalidateQueries({ queryKey: ["trabajos"] });
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	const getAuthHeaders = async () => {
		const { data } = await supabase.auth.getSession();
		const token = data.session?.access_token;
		if (!token) throw new Error("Debes iniciar sesión para usar la IA");
		return { Authorization: `Bearer ${token}` };
	};
	const handleGenerar = async () => {
		if (!trabajo) return;
		setBusy("gen");
		try {
			const res = await generarContenido({
				headers: await getAuthHeaders(),
				data: {
					titulo: trabajo.titulo,
					tipo: trabajo.tipo,
					descripcion: trabajo.descripcion ?? void 0,
					instrucciones: trabajo.instrucciones ?? void 0,
					objetivos: trabajo.objetivos ?? void 0,
					palabrasClave: trabajo.palabras_clave ?? void 0,
					paginas: trabajo.paginas_estimadas ?? 5
				}
			});
			setContenido(res.contenido);
			await saveContent.mutateAsync({ contenido: res.contenido });
			toast.success("Contenido generado");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Error generando");
		} finally {
			setBusy(null);
		}
	};
	const handleHumanizar = async () => {
		if (!contenido?.trim()) {
			toast.error("Genera contenido primero");
			return;
		}
		setBusy("hum");
		try {
			const res = await humanizarContenido({
				headers: await getAuthHeaders(),
				data: { contenido }
			});
			setHumanizado(res.contenido);
			await saveContent.mutateAsync({ contenido_humanizado: res.contenido });
			toast.success("Contenido humanizado");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Error humanizando");
		} finally {
			setBusy(null);
		}
	};
	const handleExportar = async () => {
		if (!trabajo) return;
		setBusy("exp");
		try {
			const texto = humanizado?.trim() || contenido?.trim();
			if (!texto) {
				toast.error("Sin contenido para exportar");
				setBusy(null);
				return;
			}
			const { data: { user } } = await supabase.auth.getUser();
			const { data: profile } = user ? await supabase.from("profiles").select("display_name, programa").eq("user_id", user.id).maybeSingle() : { data: null };
			const blob = await exportarTrabajoWord({
				titulo: trabajo.titulo,
				autor: profile?.display_name ?? user?.email ?? void 0,
				institucion: profile?.programa ?? void 0,
				curso: trabajo.materias?.nombre ?? void 0,
				docente: trabajo.materias?.docente ?? void 0,
				contenido: texto,
				referencias: refs?.map((r) => r.cita_apa ?? "").filter(Boolean) ?? []
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${trabajo.titulo.replace(/[^a-z0-9]+/gi, "_")}.docx`;
			a.click();
			URL.revokeObjectURL(url);
			toast.success("Documento descargado");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Error exportando");
		} finally {
			setBusy(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			className: "w-full sm:max-w-3xl overflow-y-auto",
			children: isLoading || !trabajo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-3/4 rounded-md bg-muted animate-pulse" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-20 rounded-full bg-muted animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-28 rounded-full bg-muted animate-pulse" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 rounded-md bg-muted animate-pulse mt-4" })
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "space-y-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "font-serif text-2xl",
							children: trabajo.titulo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mt-2 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "capitalize",
									children: trabajo.tipo
								}),
								trabajo.materias && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									style: {
										backgroundColor: trabajo.materias.color ?? void 0,
										color: "white"
									},
									children: trabajo.materias.nombre
								}),
								trabajo.fecha_entrega && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									children: ["Entrega: ", new Date(trabajo.fecha_entrega).toLocaleDateString("es-ES")]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => onEdit(trabajo.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							disabled: delMutation.isPending,
							onClick: () => {
								if (confirm("¿Eliminar este trabajo? Esta acción no se puede deshacer.")) delMutation.mutate();
							},
							children: delMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
						})]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "fases",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid grid-cols-4 w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "fases",
									children: "Fases"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "contenido",
									children: "Contenido"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "bibliografia",
									children: "Bibliografía"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "archivos",
									children: "Archivos"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "fases",
							className: "space-y-3 mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaseCard, {
									titulo: "Borrador",
									tone: "warning",
									fecha: trabajo.borrador_fecha,
									items: [{
										label: "Notas",
										value: trabajo.borrador_notas
									}]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaseCard, {
									titulo: "Revisión",
									tone: "primary",
									fecha: trabajo.revision_fecha,
									items: [{
										label: "Revisor",
										value: trabajo.revision_revisor
									}, {
										label: "Comentarios",
										value: trabajo.revision_comentarios
									}]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaseCard, {
									titulo: "Entrega",
									tone: "success",
									fecha: trabajo.entrega_fecha_real,
									items: [
										{
											label: "Medio",
											value: trabajo.entrega_medio
										},
										{
											label: "Observaciones",
											value: trabajo.entrega_observaciones
										},
										{
											label: "Nota",
											value: trabajo.nota != null ? `${trabajo.nota} / 100` : null
										},
										{
											label: "Calificado el",
											value: trabajo.calificacion_fecha
										}
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-center text-muted-foreground pt-2",
									children: [
										"Edita los detalles de cada fase desde el botón ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3 inline" }),
										" arriba."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "contenido",
							className: "space-y-4 mt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											onClick: handleGenerar,
											disabled: !!busy,
											children: [busy === "gen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 mr-2 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 mr-2" }), "Generar con IA"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											onClick: handleHumanizar,
											disabled: !!busy || !contenido,
											children: [busy === "hum" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 mr-2 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "size-4 mr-2" }), "Humanizar"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											onClick: handleExportar,
											disabled: !!busy,
											children: [busy === "exp" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 mr-2 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 mr-2" }), "Exportar Word"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Borrador (IA)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => saveContent.mutate({ contenido }),
										disabled: saveContent.isPending,
										children: [saveContent.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin mr-1" }), "Guardar"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 10,
									value: contenido,
									onChange: (e) => setContenido(e.target.value),
									placeholder: "Genera con IA o escribe tu contenido aquí (Markdown: ## Título)...",
									className: "font-mono text-sm"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium",
										children: "Versión humanizada"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => saveContent.mutate({ contenido_humanizado: humanizado }),
										disabled: saveContent.isPending,
										children: [saveContent.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin mr-1" }), "Guardar"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 10,
									value: humanizado,
									onChange: (e) => setHumanizado(e.target.value),
									placeholder: "Aparecerá tras humanizar...",
									className: "font-mono text-sm"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "bibliografia",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BibliografiaPanel, { trabajoId: trabajo.id })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "archivos",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchivosPanel, { trabajoId: trabajo.id })
						})
					]
				})
			})] })
		})
	});
}
/** Tarjeta resumen de una fase del trabajo (Borrador / Revisión / Entrega). */
function FaseCard({ titulo, tone, fecha, items }) {
	const visibles = items.filter((i) => i.value != null && String(i.value).trim() !== "");
	const tieneInfo = visibles.length > 0 || !!fecha;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-md border border-border border-l-4 ${tone === "warning" ? "border-l-warning" : tone === "primary" ? "border-l-primary" : "border-l-success"} p-4 bg-card`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "font-medium text-sm",
				children: titulo
			}), fecha && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: new Date(fecha).toLocaleDateString("es-ES")
			})]
		}), tieneInfo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "space-y-1.5 text-sm",
			children: visibles.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[100px_1fr] gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs text-muted-foreground pt-0.5",
					children: i.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-sm whitespace-pre-wrap break-words",
					children: i.value
				})]
			}, i.label))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground italic",
			children: "Sin información registrada para esta fase. Usa \"Editar\" para completarla."
		})]
	});
}
var COLUMNAS = [
	{
		id: "investigacion",
		label: "Investigación",
		color: "bg-muted"
	},
	{
		id: "borrador",
		label: "Borrador",
		color: "bg-warning/10"
	},
	{
		id: "revision",
		label: "Revisión",
		color: "bg-primary/10"
	},
	{
		id: "entrega",
		label: "Entrega",
		color: "bg-success/10"
	}
];
function KanbanBoard({ trabajos, onMove, onSelect }) {
	const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }), useSensor(TouchSensor, { activationConstraint: {
		delay: 200,
		tolerance: 5
	} }));
	const handleDragEnd = (e) => {
		const id = String(e.active.id);
		const estado = e.over?.id ? String(e.over.id) : null;
		if (estado && COLUMNAS.some((c) => c.id === estado)) onMove(id, estado);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
		sensors,
		onDragEnd: handleDragEnd,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
			children: COLUMNAS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
				...col,
				trabajos: trabajos.filter((t) => t.estado === col.id),
				onSelect
			}, col.id))
		})
	});
}
function Column({ id, label, color, trabajos, onSelect }) {
	const { setNodeRef, isOver } = useDroppable({ id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: setNodeRef,
		className: `rounded-lg p-3 min-h-[300px] transition-colors ${color} ${isOver ? "ring-2 ring-primary" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-medium text-sm",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				className: "text-xs",
				children: trabajos.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: trabajos.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrabajoCard, {
				trabajo: t,
				onSelect
			}, t.id))
		})]
	});
}
function TrabajoCard({ trabajo, onSelect }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: trabajo.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		ref: setNodeRef,
		style: transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : void 0,
		className: `p-0 overflow-hidden hover:shadow-md transition-shadow ${isDragging ? "opacity-50 shadow-lg" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				...attributes,
				...listeners,
				className: "flex items-center px-2 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors select-none",
				"aria-label": "Arrastrar trabajo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "8",
					height: "16",
					viewBox: "0 0 8 16",
					fill: "currentColor",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "2",
							cy: "2",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "6",
							cy: "2",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "2",
							cy: "6",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "6",
							cy: "6",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "2",
							cy: "10",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "6",
							cy: "10",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "2",
							cy: "14",
							r: "1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "6",
							cy: "14",
							r: "1.5"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onSelect(trabajo.id),
				className: "flex-1 p-3 text-left hover:bg-accent/50 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium line-clamp-2 mb-2",
					children: trabajo.titulo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize",
						children: trabajo.tipo
					}), trabajo.fecha_entrega && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3" }), new Date(trabajo.fecha_entrega).toLocaleDateString("es-ES", {
							day: "2-digit",
							month: "short"
						})]
					})]
				})]
			})]
		})
	});
}
var ESTADO_LABEL = {
	investigacion: "Investigación",
	borrador: "Borrador",
	revision: "Revisión",
	entrega: "Entrega"
};
function ProduccionPage() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)();
	const { tab = "kanban", materia = "todas", fecha = "", selected } = Route.useSearch();
	const setSelected = (id) => navigate({
		to: "/produccion",
		search: (p) => ({
			...p,
			selected: id || void 0
		})
	});
	const setFilterMateria = (m) => navigate({
		to: "/produccion",
		search: (p) => ({
			...p,
			materia: m
		})
	});
	const setFilterFecha = (f) => navigate({
		to: "/produccion",
		search: (p) => ({
			...p,
			fecha: f
		})
	});
	const setTab = (t) => navigate({
		to: "/produccion",
		search: (p) => ({
			...p,
			tab: t
		})
	});
	const { data: trabajos } = useQuery({
		enabled: !!user,
		queryKey: ["trabajos", user?.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("trabajos").select("*, materias(nombre, color)").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const moveMutation = useMutation({
		mutationFn: async ({ id, estado }) => {
			const { error } = await supabase.from("trabajos").update({ estado }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["trabajos"] }),
		onError: (e) => toast.error(e.message)
	});
	const stats = (0, import_react.useMemo)(() => {
		const t = trabajos ?? [];
		return {
			total: t.length,
			pendientes: t.filter((x) => x.estado !== "entrega").length,
			proximos: t.filter((x) => x.fecha_entrega && new Date(x.fecha_entrega).getTime() - Date.now() < 7 * 864e5 && x.estado !== "entrega").length
		};
	}, [trabajos]);
	const materiasDisponibles = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		trabajos?.forEach((t) => {
			if (t.materias?.nombre) s.add(t.materias.nombre);
		});
		return Array.from(s).sort();
	}, [trabajos]);
	const trabajosFiltrados = (0, import_react.useMemo)(() => {
		let t = trabajos ?? [];
		if (materia !== "todas") t = t.filter((x) => x.materias?.nombre === materia);
		if (fecha) t = t.filter((x) => x.fecha_entrega && x.fecha_entrega.startsWith(fecha));
		return t;
	}, [
		trabajos,
		materia,
		fecha
	]);
	const handleEdit = (id) => {
		const t = trabajos?.find((x) => x.id === id);
		if (!t) return;
		setEditing({
			id: t.id,
			titulo: t.titulo,
			tipo: t.tipo,
			estado: t.estado,
			materia_id: t.materia_id,
			descripcion: t.descripcion ?? "",
			instrucciones: t.instrucciones ?? "",
			objetivos: t.objetivos ?? "",
			palabras_clave: (t.palabras_clave ?? []).join(", "),
			paginas_estimadas: t.paginas_estimadas ?? 5,
			fecha_entrega: t.fecha_entrega ?? "",
			peso: t.peso?.toString() ?? "",
			borrador_notas: t.borrador_notas ?? "",
			borrador_fecha: t.borrador_fecha ?? "",
			revision_comentarios: t.revision_comentarios ?? "",
			revision_revisor: t.revision_revisor ?? "",
			revision_fecha: t.revision_fecha ?? "",
			entrega_fecha_real: t.entrega_fecha_real ?? "",
			entrega_medio: t.entrega_medio ?? "",
			entrega_observaciones: t.entrega_observaciones ?? "",
			nota: t.nota?.toString() ?? "",
			calificacion_fecha: t.calificacion_fecha ?? ""
		});
		setSelected(null);
		setFormOpen(true);
	};
	if (loading || !user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-6 flex items-center justify-between gap-4 flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Producción"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl md:text-4xl mt-1",
				children: "Trabajos académicos"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => {
					setEditing(void 0);
					setFormOpen(true);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-2" }), " Nuevo trabajo"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total",
					value: stats.total
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pendientes",
					value: stats.pendientes
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Próximos 7 días",
					value: stats.proximos,
					tone: "warning"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: setTab,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "kanban",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4 mr-2" }), "Kanban"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
					value: "tabla",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4 mr-2" }), "Tabla"]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "kanban",
					className: "mt-4",
					children: trabajos?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KanbanBoard, {
						trabajos: trabajos.map((t) => ({
							id: t.id,
							titulo: t.titulo,
							estado: t.estado,
							tipo: t.tipo,
							fecha_entrega: t.fecha_entrega
						})),
						onMove: (id, estado) => moveMutation.mutate({
							id,
							estado
						}),
						onSelect: (id) => setSelected(id)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { onCreate: () => setFormOpen(true) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "tabla",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b flex gap-4 items-center bg-muted/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 max-w-[200px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: materia,
									onValueChange: setFilterMateria,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Todas las materias" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "todas",
										children: "Todas las materias"
									}), materiasDisponibles.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: m,
										children: m
									}, m))] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 max-w-[200px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: fecha,
									onChange: (e) => setFilterFecha(e.target.value),
									placeholder: "Fecha de entrega"
								})
							}),
							(materia !== "todas" || fecha) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => {
									setFilterMateria("todas");
									setFilterFecha("");
								},
								children: "Limpiar filtros"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "p-0",
						children: !trabajos?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { onCreate: () => setFormOpen(true) }) : trabajosFiltrados.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Título" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Materia" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tipo" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Estado" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Entrega" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Peso" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: trabajosFiltrados.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
							className: "cursor-pointer",
							onClick: () => setSelected(t.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-medium",
									children: t.titulo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.materias?.nombre ?? "—" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "capitalize",
									children: t.tipo
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: ESTADO_LABEL[t.estado] ?? t.estado
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.fecha_entrega ? new Date(t.fecha_entrega).toLocaleDateString("es-ES") : "—" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.peso ? `${t.peso}%` : "—" })
							]
						}, t.id)) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center text-muted-foreground text-sm",
							children: "No hay trabajos que coincidan con los filtros seleccionados."
						})
					})] })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrabajoFormDialog, {
			open: formOpen,
			onOpenChange: setFormOpen,
			initial: editing
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrabajoDetailSheet, {
			trabajoId: selected ?? null,
			open: !!selected,
			onOpenChange: (v) => !v && setSelected(null),
			onEdit: handleEdit
		})
	] });
}
function StatCard({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: tone === "warning" ? "border-warning/40" : "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-wide text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-serif text-3xl mt-2",
				children: value
			})]
		})
	});
}
function EmptyState({ onCreate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-16 px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-12 mx-auto text-muted-foreground/50 mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-xl mb-1",
				children: "Sin trabajos todavía"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mb-4",
				children: "Crea tu primer trabajo y genera su contenido con IA."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: onCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-2" }), "Nuevo trabajo"]
			})
		]
	});
}
//#endregion
export { ProduccionPage as component };
