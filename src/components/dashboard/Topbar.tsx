import { Bell, Plus, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "./GlobalSearch";
import { useTheme } from "@/components/theme-provider";

interface Props {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: Props) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-10">
      <div className="h-full px-4 md:px-8 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold tracking-tight truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground hidden sm:block truncate">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <GlobalSearch />
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <Button
            size="sm"
            className="bg-[image:var(--gradient-primary)] shadow-[var(--shadow-md)] hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-1" /> Nuevo
          </Button>
        </div>
      </div>
    </header>
  );
}
