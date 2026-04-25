import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/produccion-ysRuKh3J.js
var $$splitComponentImporter = () => import("./produccion-DHygFH2Q.mjs");
var Route = createFileRoute("/produccion")({
	validateSearch: (search) => {
		return {
			tab: search.tab || "kanban",
			materia: search.materia || "todas",
			fecha: search.fecha || "",
			selected: search.selected || void 0
		};
	},
	head: () => ({ meta: [{ title: "Producción Académica — AcadémicoPro" }, {
		name: "description",
		content: "Gestiona trabajos académicos: redacción con IA, bibliografía APA, archivos y exportación Word."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
