import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  FileText,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "General", icon: LayoutDashboard },
  { to: "/analytics", label: "Analitica", icon: BarChart3 },
  { to: "/customers", label: "Clientes", icon: Users },
  { to: "/orders", label: "Ordenes", icon: ShoppingBag },
  { to: "/reports", label: "Informes", icon: FileText },
  { to: "/notifications", label: "Notificaciones", icon: Bell },
  { to: "/settings", label: "Configuracion", icon: Settings },
] as const;

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-md)]" />
          <span className="font-semibold tracking-tight text-sidebar-foreground">Apex</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[image:var(--gradient-primary)] flex items-center justify-center text-primary-foreground text-sm font-semibold">
            LS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Luis Sierra</p>
            <p className="text-xs text-muted-foreground truncate">lsierra@apex.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
