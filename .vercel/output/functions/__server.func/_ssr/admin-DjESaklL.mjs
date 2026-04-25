import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as supabase, r as useAuth } from "./useAuth-BL_SAut3.mjs";
import { t as Button } from "./button-DVyqAt4Q.mjs";
import { t as Input } from "./input-DW4PzhPm.mjs";
import { p as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Check, I as CircleAlert, b as Mail, g as Search, h as Shield, i as Users, n as X, o as UserCheck } from "../_libs/lucide-react.mjs";
import { t as AppSidebar } from "./AppSidebar-C1uvycgQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DjESaklL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPanel() {
	const { user, role, profile, loading } = useAuth();
	const queryClient = useQueryClient();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const { data: users, isLoading } = useQuery({
		queryKey: ["admin-users"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		},
		enabled: !!user && role === "admin"
	});
	const approveMutation = useMutation({
		mutationFn: async (userId) => {
			const { error } = await supabase.from("profiles").update({ is_approved: true }).eq("user_id", userId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			toast.success("Usuario aprobado correctamente");
		},
		onError: (err) => toast.error("Error: " + err.message)
	});
	const rejectMutation = useMutation({
		mutationFn: async (userId) => {
			const { error } = await supabase.from("profiles").update({ is_approved: false }).eq("user_id", userId);
			if (error) throw error;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			toast.success("Acceso revocado");
		},
		onError: (err) => toast.error("Error: " + err.message)
	});
	if (loading || isLoading) return null;
	if (!user || role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	const filteredUsers = users?.filter((u) => u.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.user_id.toLowerCase().includes(searchTerm.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 flex flex-col overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-16 border-b flex items-center justify-between px-6 bg-card/30 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold tracking-tight",
						children: "Panel de Administración"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-64",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar usuarios...",
							className: "pl-9 bg-background/50 border-primary/20 focus:border-primary/50",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value)
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-6 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Total Usuarios",
							value: users?.length || 0,
							icon: Users,
							color: "text-blue-400"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Pendientes",
							value: users?.filter((u) => !u.is_approved).length || 0,
							icon: CircleAlert,
							color: "text-amber-400"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Aprobados",
							value: users?.filter((u) => u.is_approved).length || 0,
							icon: UserCheck,
							color: "text-green-400"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-primary/10 bg-card/20 backdrop-blur-sm overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-primary/5 text-xs uppercase tracking-widest text-muted-foreground border-b border-primary/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium",
									children: "Usuario"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium",
									children: "Programa/Semestre"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium",
									children: "Fecha Registro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium",
									children: "Estado"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 font-medium text-right",
									children: "Acciones"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-primary/5",
							children: filteredUsers?.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-primary/5 transition-colors group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase",
												children: u.display_name?.charAt(0) || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-medium",
												children: u.display_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-muted-foreground font-mono flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3" }),
													" ",
													u.user_id.slice(0, 8),
													"..."
												]
											})] })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs",
											children: [u.programa || "No especificado", u.semestre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-1 text-muted-foreground",
												children: [
													"(",
													u.semestre,
													"º)"
												]
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-xs text-muted-foreground",
										children: new Date(u.created_at).toLocaleDateString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4",
										children: u.is_approved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-500/20",
											children: "Aprobado"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20",
											children: "Pendiente"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-end gap-2",
											children: u.is_approved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												className: "h-8 w-8 p-0 text-destructive hover:bg-destructive/10",
												onClick: () => rejectMutation.mutate(u.user_id),
												disabled: rejectMutation.isPending,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												className: "h-8 w-8 p-0 text-green-400 hover:bg-green-400/10",
												onClick: () => approveMutation.mutate(u.user_id),
												disabled: approveMutation.isPending,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })
											})
										})
									})
								]
							}, u.id))
						})]
					})
				})]
			})]
		})]
	});
}
function StatCard({ label, value, icon: Icon, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-4 rounded-xl border border-primary/10 bg-card/20 backdrop-blur-sm flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `p-3 rounded-lg bg-background/50 ${color}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-2xl font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		})] })]
	});
}
//#endregion
export { AdminPanel as component };
