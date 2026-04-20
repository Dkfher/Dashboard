import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  LayoutDashboard,
  BarChart3,
  Users,
  ShoppingBag,
  FileText,
  Bell,
  Settings,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const pages = [
  { to: "/", label: "General", icon: LayoutDashboard },
  { to: "/analytics", label: "Analitica", icon: BarChart3 },
  { to: "/customers", label: "Clientes", icon: Users },
  { to: "/orders", label: "Ordenes", icon: ShoppingBag },
  { to: "/reports", label: "Informes", icon: FileText },
  { to: "/notifications", label: "Notificaciones", icon: Bell },
  { to: "/settings", label: "Configuracion", icon: Settings },
] as const;

const quickActions = [
  { label: "Crear nueva orden", to: "/orders" },
  { label: "Invitar al cliente", to: "/customers" },
  { label: "Generar informe", to: "/reports" },
] as const;

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate({ to });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 h-9 w-64 px-3 rounded-md bg-muted/50 border border-transparent hover:bg-muted text-sm text-muted-foreground transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Buscar...</span>
        <kbd className="text-[10px] font-mono bg-background border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </button>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-muted"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar paginas, informes,clientes..." />
        <CommandList>
          <CommandEmpty>No se encontraron resultados</CommandEmpty>
          <CommandGroup heading="Pages">
            {pages.map((p) => {
              const Icon = p.icon;
              return (
                <CommandItem key={p.to} onSelect={() => go(p.to)}>
                  <Icon className="mr-2 h-4 w-4" />
                  {p.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Accesos directos">
            {quickActions.map((a) => (
              <CommandItem key={a.label} onSelect={() => go(a.to)}>
                {a.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
