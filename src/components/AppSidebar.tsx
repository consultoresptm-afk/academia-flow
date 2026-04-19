import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, GraduationCap, FileText, Microscope, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; disabled?: boolean };
const NAV: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/materias", label: "Materias", icon: BookOpen },
  { to: "/produccion", label: "Producción", icon: FileText },
  { to: "/tesis", label: "Tesis", icon: Microscope, disabled: true },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-lg bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <div className="font-serif text-lg leading-none">AcadémicoPro</div>
            <div className="text-xs text-sidebar-foreground/60 mt-1">Gestión integral</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, label, icon: Icon, disabled }) => {
          const active = pathname === to || pathname.startsWith(to + "/");
          if (disabled) {
            return (
              <div
                key={to}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/40 cursor-not-allowed"
                title="Próximamente"
              >
                <Icon className="size-4" />
                <span>{label}</span>
                <span className="ml-auto text-[10px] uppercase">Pronto</span>
              </div>
            );
          }
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="px-3 py-2 mb-2">
          <div className="text-xs text-sidebar-foreground/60 truncate">Conectado como</div>
          <div className="text-sm truncate">{user?.email}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-4 mr-2" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  );
}
