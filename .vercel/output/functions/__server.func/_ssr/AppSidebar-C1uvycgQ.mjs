import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as useAuth } from "./useAuth-BL_SAut3.mjs";
import { t as Button } from "./button-DVyqAt4Q.mjs";
import { f as Link, i as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as LayoutDashboard, O as GraduationCap, U as BookOpen, h as Shield, j as FileText, t as Zap, x as LogOut, y as Microscope } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppSidebar-C1uvycgQ.js
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/materias",
		label: "Gestión Académica",
		icon: BookOpen
	},
	{
		to: "/produccion",
		label: "Producción",
		icon: FileText
	},
	{
		to: "/tesis",
		label: "Tesis",
		icon: Microscope
	}
];
function AppSidebar() {
	const { pathname } = useLocation();
	const { user, role, signOut } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "hidden md:flex w-64 flex-col border-r",
		style: {
			background: "rgba(15, 2, 2, 0.90)",
			backdropFilter: "blur(20px)",
			WebkitBackdropFilter: "blur(20px)",
			borderRightColor: "rgba(245, 158, 11, 0.2)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-5 border-b",
				style: { borderColor: "rgba(245, 158, 11, 0.15)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-9 rounded flex items-center justify-center shrink-0",
						style: {
							background: "linear-gradient(135deg, #f59e0b, #f97316)",
							boxShadow: "0 0 12px rgba(245, 158, 11, 0.5)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-5 text-[#1a0505]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-serif text-base leading-none brand-text",
						style: {
							color: "#fbbf24",
							letterSpacing: "0.08em"
						},
						children: ["ACADÉMICO", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "#f97316" },
							children: "PRO"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] mt-1 uppercase tracking-widest",
						style: { color: "rgba(212, 165, 116, 0.6)" },
						children: "Gestión integral"
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex-1 px-3 py-4 space-y-0.5 overflow-y-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-widest px-3 pb-2 pt-1",
						style: { color: "rgba(212, 165, 116, 0.5)" },
						children: "Módulos"
					}),
					NAV.map(({ to, label, icon: Icon, disabled }) => {
						const active = pathname === to || pathname.startsWith(to + "/");
						if (disabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 px-3 py-2.5 rounded text-xs uppercase tracking-wider cursor-not-allowed",
							style: { color: "rgba(212, 165, 116, 0.3)" },
							title: "Próximamente",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1",
									children: label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] px-1.5 py-0.5 rounded uppercase tracking-widest",
									style: {
										background: "rgba(245, 158, 11, 0.1)",
										color: "rgba(245, 158, 11, 0.4)",
										border: "1px solid rgba(245, 158, 11, 0.15)"
									},
									children: "Pronto"
								})
							]
						}, to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to,
							className: "flex items-center gap-3 px-3 py-2.5 rounded text-xs uppercase tracking-wider transition-all group",
							style: active ? {
								background: "rgba(245, 158, 11, 0.15)",
								color: "#fbbf24",
								borderLeft: "2px solid #f59e0b",
								boxShadow: "inset 0 0 12px rgba(245, 158, 11, 0.05), 0 0 8px rgba(245, 158, 11, 0.1)"
							} : {
								color: "rgba(212, 165, 116, 0.7)",
								borderLeft: "2px solid transparent"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4 shrink-0 transition-all",
									style: active ? { filter: "drop-shadow(0 0 4px rgba(245, 158, 11, 0.8))" } : {}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1",
									children: label
								}),
								active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
									className: "size-3",
									style: {
										color: "#f59e0b",
										filter: "drop-shadow(0 0 4px rgba(245, 158, 11, 0.8))"
									}
								})
							]
						}, to);
					}),
					role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-widest px-3 pb-2 pt-4",
						style: { color: "rgba(245, 158, 11, 0.6)" },
						children: "Configuración"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						className: "flex items-center gap-3 px-3 py-2.5 rounded text-xs uppercase tracking-wider transition-all group",
						style: pathname === "/admin" ? {
							background: "rgba(245, 158, 11, 0.15)",
							color: "#fbbf24",
							borderLeft: "2px solid #f59e0b"
						} : {
							color: "rgba(212, 165, 116, 0.7)",
							borderLeft: "2px solid transparent"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 shrink-0 transition-all" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: "Administración"
						})]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 border-t",
				style: { borderColor: "rgba(245, 158, 11, 0.12)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-3 py-2 mb-2 rounded",
					style: {
						background: "rgba(74, 4, 4, 0.4)",
						border: "1px solid rgba(245, 158, 11, 0.1)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] uppercase tracking-wider flex items-center justify-between",
						style: { color: "rgba(212, 165, 116, 0.5)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Conectado como" }), role === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] px-1 bg-primary/20 text-primary rounded border border-primary/20 font-bold",
							children: "ADMIN"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs truncate mt-0.5",
						style: { color: "#d4a574" },
						children: user?.email
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: signOut,
					className: "w-full justify-start text-xs uppercase tracking-wider transition-all",
					style: { color: "rgba(212, 165, 116, 0.6)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 mr-2" }), "Cerrar sesión"]
				})]
			})
		]
	});
}
//#endregion
export { AppSidebar as t };
