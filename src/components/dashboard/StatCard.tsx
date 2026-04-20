import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  change: number;
  icon: LucideIcon;
}

export function StatCard({ label, value, change, icon: Icon }: Props) {
  const positive = change >= 0;
  return (
    <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-medium",
            positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(change)}%
        </span>
        <span className="text-muted-foreground">vs ultimo mes</span>
      </div>
    </Card>
  );
}
