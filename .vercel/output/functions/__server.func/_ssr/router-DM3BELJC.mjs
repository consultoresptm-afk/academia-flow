import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as supabase, r as useAuth, t as AuthProvider } from "./useAuth-BL_SAut3.mjs";
import { C as redirect, a as useRouterState, c as Outlet, d as createRootRoute, f as Link, h as useRouter, l as lazyRouteComponent, m as useNavigate, n as Scripts, r as HeadContent, s as createRouter, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$6 } from "./materias-Cnq3GOfA.mjs";
import { t as Route$7 } from "./produccion-ysRuKh3J.mjs";
import { t as Route$8 } from "./tesis-B4Yt2-J9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DM3BELJC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-CFuCbdg-.css";
function useRealtimeSync() {
	const qc = useQueryClient();
	const { user } = useAuth();
	(0, import_react.useEffect)(() => {
		if (!user) return;
		const channel = supabase.channel("global-db-changes").on("postgres_changes", {
			event: "*",
			schema: "public"
		}, () => {
			qc.invalidateQueries();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [user, qc]);
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
var Route$5 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AcadémicoPro — Gestión académica integral" },
			{
				name: "description",
				content: "LMS Maestria"
			},
			{
				property: "og:title",
				content: "AcadémicoPro — Gestión académica integral"
			},
			{
				property: "og:description",
				content: "LMS Maestria"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "AcadémicoPro — Gestión académica integral"
			},
			{
				name: "twitter:description",
				content: "LMS Maestria"
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/p4ZsQ3xWbSdWHspcTwr8BRxujG92/social-images/social-1776630440424-Logo_Ucentral.webp"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/p4ZsQ3xWbSdWHspcTwr8BRxujG92/social-images/social-1776630440424-Logo_Ucentral.webp"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RealtimeSync() {
	useRealtimeSync();
	return null;
}
function AuthGuard({ children }) {
	const { user, profile, loading } = useAuth();
	const navigate = useNavigate();
	const { location } = useRouterState();
	(0, import_react.useEffect)(() => {
		if (loading) return;
		const isAuthPage = location.pathname === "/auth";
		const isPendingPage = location.pathname === "/pending-approval";
		if (!user && !isAuthPage) {
			navigate({ to: "/auth" });
			return;
		}
		if (user && !profile?.is_approved && !isPendingPage && !isAuthPage) {
			navigate({ to: "/pending-approval" });
			return;
		}
		if (user && profile?.is_approved && isPendingPage) navigate({ to: "/dashboard" });
	}, [
		user,
		profile,
		loading,
		location.pathname,
		navigate
	]);
	if (loading && !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#1a0505]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function RootComponent() {
	const [queryClient] = (0, import_react.useState)(() => new QueryClient({ defaultOptions: { queries: {
		staleTime: 3e4,
		retry: 1
	} } }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthGuard, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealtimeSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				richColors: true,
				position: "top-right"
			})
		] }) })
	});
}
var $$splitComponentImporter$3 = () => import("./pending-approval-xS-GsZuv.mjs");
var Route$4 = createFileRoute("/pending-approval")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./dashboard-KxuUBI5c.mjs");
var Route$3 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — AcadémicoPro" }, {
		name: "description",
		content: "KPIs y resumen de tu actividad académica."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./auth-U_ll8LKh.mjs");
var Route$2 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Iniciar sesión — AcadémicoPro" }, {
		name: "description",
		content: "Accede a tu cuenta de AcadémicoPro."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin-DjESaklL.mjs");
var Route$1 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/")({ beforeLoad: () => {
	throw redirect({ to: "/dashboard" });
} });
var TesisRoute = Route$8.update({
	id: "/tesis",
	path: "/tesis",
	getParentRoute: () => Route$5
});
var ProduccionRoute = Route$7.update({
	id: "/produccion",
	path: "/produccion",
	getParentRoute: () => Route$5
});
var PendingApprovalRoute = Route$4.update({
	id: "/pending-approval",
	path: "/pending-approval",
	getParentRoute: () => Route$5
});
var MateriasRoute = Route$6.update({
	id: "/materias",
	path: "/materias",
	getParentRoute: () => Route$5
});
var DashboardRoute = Route$3.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$5
});
var AuthRoute = Route$2.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$5
});
var AdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$5
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$5
	}),
	AdminRoute,
	AuthRoute,
	DashboardRoute,
	MateriasRoute,
	PendingApprovalRoute,
	ProduccionRoute,
	TesisRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						xmlns: "http://www.w3.org/2000/svg",
						className: "h-8 w-8 text-destructive",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						strokeWidth: 2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "An unexpected error occurred. Please try again."
				}),
				false,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var getRouter = () => {
	return createRouter({
		routeTree,
		context: {},
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: DefaultErrorComponent
	});
};
//#endregion
export { getRouter };
