import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { r as useAuth } from "./useAuth-BL_SAut3.mjs";
import { t as Button } from "./button-DVyqAt4Q.mjs";
import { p as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as Clock, O as GraduationCap, x as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pending-approval-xS-GsZuv.js
var import_jsx_runtime = require_jsx_runtime();
function PendingApproval() {
	const { user, profile, signOut, loading } = useAuth();
	if (loading) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/auth" });
	if (profile?.is_approved) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#1a0505] p-4 font-sans text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-16 rounded-2xl flex items-center justify-center",
						style: {
							background: "linear-gradient(135deg, #f59e0b, #f97316)",
							boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-10 text-[#1a0505]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-3xl font-serif tracking-tight brand-text",
						style: {
							color: "#fbbf24",
							letterSpacing: "0.1em"
						},
						children: ["ACADÉMICO", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: "#f97316" },
							children: "PRO"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-8 rounded-2xl border",
					style: {
						background: "rgba(30, 10, 10, 0.4)",
						backdropFilter: "blur(12px)",
						borderColor: "rgba(245, 158, 11, 0.2)",
						boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center mb-6 text-[#f59e0b]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 rounded-full bg-[#f59e0b]/10 animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-12" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold mb-3 text-[#fbbf24]",
							children: "Acceso en espera"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-[#d4a574]/70 mb-6 leading-relaxed",
							children: [
								"Hola ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#fbbf24] font-medium",
									children: user.email
								}),
								". Tu solicitud de acceso está en espera. Por favor, solicita autorización directamente al propietario del sistema en ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:wmartinezm360@gmail.com",
									className: "text-[#f59e0b] hover:underline font-medium",
									children: "wmartinezm360@gmail.com"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "w-full border-[#f59e0b]/30 hover:bg-[#f59e0b]/10 text-[#f59e0b] transition-all",
							onClick: () => signOut(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 mr-2" }), "Cerrar sesión"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-[#d4a574]/40 italic",
					children: "Si eres el propietario, asegúrate de estar usando el correo principal."
				})
			]
		})
	});
}
//#endregion
export { PendingApproval as component };
