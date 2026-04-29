import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, LogOut } from "lucide-react";

export const Route = createFileRoute("/pending-approval")({
  component: PendingApproval,
});

function PendingApproval() {
  const { user, profile, signOut, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (profile?.is_approved) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a0505] p-4 font-sans text-foreground">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="size-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)",
            }}
          >
            <GraduationCap className="size-10 text-[#1a0505]" />
          </div>
          <h1
            className="text-3xl font-serif tracking-tight brand-text"
            style={{ color: "#fbbf24", letterSpacing: "0.1em" }}
          >
            ACADÉMICO<span style={{ color: "#f97316" }}>PRO</span>
          </h1>
        </div>

        {/* Status Card */}
        <div
          className="p-8 rounded-2xl border"
          style={{
            background: "rgba(30, 10, 10, 0.4)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(245, 158, 11, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="flex justify-center mb-6 text-[#f59e0b]">
            <div className="p-4 rounded-full bg-[#f59e0b]/10 animate-pulse">
              <Clock className="size-12" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-3 text-[#fbbf24]">Acceso en espera</h2>
          <p className="text-sm text-[#d4a574]/70 mb-6 leading-relaxed">
            Hola <span className="text-[#fbbf24] font-medium">{user.email}</span>. 
            Tu solicitud de acceso está en espera. Por favor, solicita autorización directamente al propietario del sistema en <a href="mailto:wmartinezm360@gmail.com" className="text-[#f59e0b] hover:underline font-medium">wmartinezm360@gmail.com</a>.
          </p>
          
          <Button
            variant="outline"
            className="w-full border-[#f59e0b]/30 hover:bg-[#f59e0b]/10 text-[#f59e0b] transition-all"
            onClick={() => signOut()}
          >
            <LogOut className="size-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>

        <p className="text-xs text-[#d4a574]/40 italic">
          Si eres el propietario, asegúrate de estar usando el correo principal.
        </p>
      </div>
    </div>
  );
}
