import { i as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useAuth-BSBqbnp_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function createSupabaseClient() {
	const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
	const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) throw new Error("Supabase: define SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY en el proyecto (Vercel → Settings → Environment Variables) para el runtime del servidor.");
	return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [authLoading, setAuthLoading] = (0, import_react.useState)(true);
	const { data: profileData, isLoading: profileLoading } = useQuery({
		queryKey: ["user-profile", user?.id],
		queryFn: async () => {
			if (!user) return null;
			const [pRes, rRes] = await Promise.all([supabase.from("profiles").select("*").eq("user_id", user.id).single(), supabase.from("user_roles").select("role").eq("user_id", user.id).single()]);
			const isOwner = user.email === "wmartinezm360@gmail.com" || user.email === "lauradanielagaleanomoton@gmail.com";
			const profileData = pRes.data || {};
			if (isOwner) profileData.is_approved = true;
			return {
				profile: profileData,
				role: isOwner ? "admin" : rRes.data?.role ?? "estudiante"
			};
		},
		enabled: !!user,
		staleTime: 1e3 * 60 * 5
	});
	(0, import_react.useEffect)(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
			setSession(newSession);
			setUser(newSession?.user ?? null);
			setAuthLoading(false);
		});
		supabase.auth.getSession().then(({ data: { session: s } }) => {
			setSession(s);
			setUser(s?.user ?? null);
			setAuthLoading(false);
		});
		return () => subscription.unsubscribe();
	}, []);
	const signOut = async () => {
		await supabase.auth.signOut();
	};
	const loading = authLoading || !!user && profileLoading;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			profile: profileData?.profile || null,
			role: profileData?.role || null,
			loading,
			signOut
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) return {
		user: null,
		session: null,
		profile: null,
		role: null,
		loading: true,
		signOut: async () => {}
	};
	return ctx;
}
//#endregion
export { supabase as n, useAuth as r, AuthProvider as t };
