import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/materias-CScC8ORw.js
var $$splitComponentImporter = () => import("./materias-Cxt2Qzig.mjs");
var Route = createFileRoute("/materias")({
	validateSearch: (search) => {
		return { selected: search.selected || void 0 };
	},
	head: () => ({ meta: [{ title: "Gestión Académica — AcadémicoPro" }, {
		name: "description",
		content: "Gestiona tus materias, calificaciones, tareas y repositorio de archivos."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
