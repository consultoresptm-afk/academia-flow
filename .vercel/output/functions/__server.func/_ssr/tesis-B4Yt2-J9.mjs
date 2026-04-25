import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tesis-B4Yt2-J9.js
var $$splitComponentImporter = () => import("./tesis-0mcfl6i4.mjs");
var Route = createFileRoute("/tesis")({
	validateSearch: (search) => {
		return { tab: search.tab || "capitulos" };
	},
	head: () => ({ meta: [{ title: "Tesis — AcadémicoPro" }, {
		name: "description",
		content: "Gestiona tu proyecto de tesis: capítulos, cronograma, documentos y avance."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
