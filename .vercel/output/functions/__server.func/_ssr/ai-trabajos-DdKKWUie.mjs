import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DgB-NHqG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-trabajos-DdKKWUie.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var LOVABLE_AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
var MODEL = "google/gemini-2.5-flash";
async function callAI(messages) {
	const apiKey = process.env.LOVABLE_API_KEY;
	if (!apiKey) throw new Error("LOVABLE_API_KEY no configurada");
	const res = await fetch(LOVABLE_AI_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			model: MODEL,
			messages
		})
	});
	if (res.status === 429) throw new Error("Límite de uso alcanzado. Intenta más tarde.");
	if (res.status === 402) throw new Error("Créditos de IA agotados. Recarga tu workspace.");
	if (!res.ok) throw new Error(`Error IA (${res.status}): ${await res.text()}`);
	return (await res.json()).choices?.[0]?.message?.content ?? "";
}
var generarContenido_createServerFn_handler = createServerRpc({
	id: "db6e750ab3259a748a797000648f9cd2761c6082601ab1de662ca8bb5caf5096",
	name: "generarContenido",
	filename: "src/server/ai-trabajos.ts"
}, (opts) => generarContenido.__executeServer(opts));
var generarContenido = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(generarContenido_createServerFn_handler, async ({ data }) => {
	const system = `Eres un experto académico. Redacta trabajos universitarios rigurosos, bien estructurados, con introducción, desarrollo argumentado y conclusiones. Usa lenguaje formal en español, cita en formato APA 7ª cuando corresponda con marcador [REF: descripción] y mantén coherencia. Extensión objetivo: ~${(data.paginas ?? 5) * 300} palabras.`;
	const user = `Redacta un ${data.tipo} titulado: "${data.titulo}".
${data.descripcion ? `\nContexto: ${data.descripcion}` : ""}
${data.instrucciones ? `\nInstrucciones del docente: ${data.instrucciones}` : ""}
${data.objetivos ? `\nObjetivos: ${data.objetivos}` : ""}
${data.palabrasClave?.length ? `\nPalabras clave: ${data.palabrasClave.join(", ")}` : ""}

Estructura el documento con encabezados claros (## Introducción, ## Desarrollo, ## Conclusiones).`;
	return { contenido: await callAI([{
		role: "system",
		content: system
	}, {
		role: "user",
		content: user
	}]) };
});
var humanizarContenido_createServerFn_handler = createServerRpc({
	id: "74376b4903187dd5393fc434b03eb4d6299598a10aee2e3e54ec98a04ec87676",
	name: "humanizarContenido",
	filename: "src/server/ai-trabajos.ts"
}, (opts) => humanizarContenido.__executeServer(opts));
var humanizarContenido = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(humanizarContenido_createServerFn_handler, async ({ data }) => {
	if (!data.contenido?.trim()) throw new Error("Contenido vacío");
	return { contenido: await callAI([{
		role: "system",
		content: `Eres un experto en reescritura académica. Tu tarea es humanizar el contenido manteniendo su esencia, calidad y estructura.

Técnicas a aplicar:
1. Reemplaza palabras comunes con sinónimos más naturales
2. Reorganiza la estructura de oraciones sin perder coherencia
3. Varía la longitud de párrafos
4. Añade transiciones más naturales entre ideas
5. Usa construcciones más conversacionales donde sea apropiado
6. Mantén el nivel académico y formal requerido
7. Preserva todas las citas, referencias y encabezados Markdown
8. Asegúrate de que el contenido sea único

Responde SOLO con el contenido humanizado, sin explicaciones adicionales.`
	}, {
		role: "user",
		content: `Humaniza este contenido académico:\n\n${data.contenido}`
	}]) };
});
//#endregion
export { generarContenido_createServerFn_handler, humanizarContenido_createServerFn_handler };
