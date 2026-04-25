import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as AppSidebar } from "./AppSidebar-C1uvycgQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-CBLsldfO.js
var import_jsx_runtime = require_jsx_runtime();
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 overflow-x-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-screen",
				style: { background: "rgba(10, 1, 1, 0.35)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto",
					children
				})
			})
		})]
	});
}
//#endregion
export { AppShell as t };
