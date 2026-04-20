import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Mail, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Clientes — Apex" },
      { name: "description", content: "Gestiona clientes, segmentos y datos de contacto." },
    ],
  }),
  component: CustomersPage,
});

type Segment = "vip" | "active" | "new" | "churned";

const all = [
  {
    id: 1,
    name: "Sofia Chen",
    email: "sofia@acme.co",
    spent: 12400,
    orders: 42,
    segment: "vip" as Segment,
    joined: "2023-01-14",
  },
  {
    id: 2,
    name: "Marcus Reid",
    email: "marcus@northwind.io",
    spent: 3200,
    orders: 11,
    segment: "active" as Segment,
    joined: "2023-08-02",
  },
  {
    id: 3,
    name: "Lina Park",
    email: "lina@vertex.dev",
    spent: 18900,
    orders: 67,
    segment: "vip" as Segment,
    joined: "2022-06-21",
  },
  {
    id: 4,
    name: "Diego Alvarez",
    email: "diego@studio.ai",
    spent: 420,
    orders: 3,
    segment: "new" as Segment,
    joined: "2025-03-10",
  },
  {
    id: 5,
    name: "Emma Wright",
    email: "emma@bloom.co",
    spent: 7450,
    orders: 22,
    segment: "active" as Segment,
    joined: "2024-02-11",
  },
  {
    id: 6,
    name: "Noah Patel",
    email: "noah@flux.app",
    spent: 980,
    orders: 5,
    segment: "new" as Segment,
    joined: "2025-01-20",
  },
  {
    id: 7,
    name: "Olivia Kim",
    email: "olivia@mono.io",
    spent: 215,
    orders: 1,
    segment: "churned" as Segment,
    joined: "2023-11-04",
  },
  {
    id: 8,
    name: "Lucas Silva",
    email: "lucas@alpha.co",
    spent: 5420,
    orders: 18,
    segment: "active" as Segment,
    joined: "2024-05-08",
  },
];

const segmentStyle: Record<Segment, string> = {
  vip: "bg-primary/10 text-primary border-primary/20",
  active: "bg-success/10 text-success border-success/20",
  new: "bg-accent text-accent-foreground border-accent",
  churned: "bg-muted text-muted-foreground border-border",
};

function CustomersPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Segment | "all">("all");

  const filtered = useMemo(() => {
    return all.filter((c) => {
      const matchQ = q ? (c.name + c.email).toLowerCase().includes(q.toLowerCase()) : true;
      const matchF = filter === "all" ? true : c.segment === filter;
      return matchQ && matchF;
    });
  }, [q, filter]);

  return (
    <DashboardLayout
      title="Clientes"
      subtitle={`${all.length} total de clientes en todos los segmentos`}
    >
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="relative flex-1 min-w-60 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["all", "vip", "active", "new", "churned"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 h-8 rounded-md text-xs font-medium capitalize transition-colors border",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:bg-muted",
              )}
            >
              {f}
            </button>
          ))}
          <Button size="sm" onClick={() => toast.success("Invitation sent")}>
            <UserPlus className="h-4 w-4 mr-1" /> Invitar
          </Button>
        </div>
      </div>

      <Card className="border-border/60 shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border bg-muted/30">
                <th className="font-medium px-5 py-3">Cliente</th>
                <th className="font-medium py-3">Segmento</th>
                <th className="font-medium py-3">Ordenes</th>
                <th className="font-medium py-3 text-right">Total gastado</th>
                <th className="font-medium py-3">Joined</th>
                <th className="font-medium px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[image:var(--gradient-primary)] flex items-center justify-center text-primary-foreground text-xs font-semibold">
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge
                      variant="outline"
                      className={cn("capitalize font-medium", segmentStyle[c.segment])}
                    >
                      {c.segment}
                    </Badge>
                  </td>
                  <td className="py-3 tabular-nums">{c.orders}</td>
                  <td className="py-3 text-right font-medium tabular-nums">
                    ${c.spent.toLocaleString()}
                  </td>
                  <td className="py-3 text-muted-foreground text-xs">{c.joined}</td>
                  <td className="px-5 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast(`Email copied: ${c.email}`)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground text-sm">
                    No se encontraron clientes que coincidan con su busqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
