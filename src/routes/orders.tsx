import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Ordenes — Apex" },
      {
        name: "description",
        content:
          "Realiza el seguimiento de los pedidos, actualiza su estado y gestiona las transacciones.",
      },
    ],
  }),
  component: OrdersPage,
});

type Status = "paid" | "pending" | "refunded" | "cancelled";

interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: Status;
  date: string;
  items: { name: string; qty: number; price: number }[];
}

const seed: Order[] = [
  {
    id: "#A-1042",
    customer: "Sofia Chen",
    email: "sofia@acme.co",
    amount: 1240,
    status: "paid",
    date: "2025-04-18",
    items: [{ name: "Pro Plan (annual)", qty: 1, price: 1240 }],
  },
  {
    id: "#A-1041",
    customer: "Marcus Reid",
    email: "marcus@northwind.io",
    amount: 820.5,
    status: "pending",
    date: "2025-04-18",
    items: [{ name: "Starter Kit", qty: 2, price: 410.25 }],
  },
  {
    id: "#A-1040",
    customer: "Lina Park",
    email: "lina@vertex.dev",
    amount: 3410,
    status: "paid",
    date: "2025-04-17",
    items: [{ name: "Enterprise Seat", qty: 5, price: 682 }],
  },
  {
    id: "#A-1039",
    customer: "Diego Alvarez",
    email: "diego@studio.ai",
    amount: 215,
    status: "refunded",
    date: "2025-04-17",
    items: [{ name: "Basic", qty: 1, price: 215 }],
  },
  {
    id: "#A-1038",
    customer: "Emma Wright",
    email: "emma@bloom.co",
    amount: 1790.25,
    status: "paid",
    date: "2025-04-16",
    items: [{ name: "Pro", qty: 1, price: 1790.25 }],
  },
  {
    id: "#A-1037",
    customer: "Noah Patel",
    email: "noah@flux.app",
    amount: 540,
    status: "pending",
    date: "2025-04-16",
    items: [{ name: "Starter", qty: 1, price: 540 }],
  },
  {
    id: "#A-1036",
    customer: "Olivia Kim",
    email: "olivia@mono.io",
    amount: 99,
    status: "cancelled",
    date: "2025-04-15",
    items: [{ name: "Basic", qty: 1, price: 99 }],
  },
];

const statusStyles: Record<Status, string> = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  refunded: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(seed);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        const matchQ = q
          ? (o.id + o.customer + o.email).toLowerCase().includes(q.toLowerCase())
          : true;
        const matchF = filter === "all" ? true : o.status === filter;
        return matchQ && matchF;
      }),
    [orders, q, filter],
  );

  const updateStatus = (id: string, status: Status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    toast.success(`Order ${id} marked as ${status}`);
  };

  return (
    <DashboardLayout title="Ordenes" subtitle={`${orders.length} ordenes`}>
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="relative flex-1 min-w-60 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search orders..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "paid", "pending", "refunded", "cancelled"] as const).map((f) => (
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
        </div>
      </div>

      <Card className="border-border/60 shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border bg-muted/30">
                <th className="font-medium px-5 py-3">Ordenes</th>
                <th className="font-medium py-3">Cliente</th>
                <th className="font-medium py-3">Fecha</th>
                <th className="font-medium py-3">Status</th>
                <th className="font-medium px-5 py-3 text-right">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => setSelected(o)}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{o.id}</td>
                  <td className="py-3">
                    <p className="font-medium">{o.customer}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </td>
                  <td className="py-3 text-muted-foreground text-xs">{o.date}</td>
                  <td className="py-3">
                    <Badge
                      variant="outline"
                      className={cn("capitalize font-medium", statusStyles[o.status])}
                    >
                      {o.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-right font-medium tabular-nums">
                    ${o.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-muted-foreground text-sm">
                    No se encontraron pedidos que coincidan con su busqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <span className="font-mono">{selected.id}</span>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusStyles[selected.status])}
                  >
                    {selected.status}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {selected.customer} — {selected.email} • {selected.date}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 border-t border-border pt-4">
                {selected.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>
                      {it.name} <span className="text-muted-foreground">× {it.qty}</span>
                    </span>
                    <span className="tabular-nums">${(it.price * it.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-border pt-3 font-medium">
                  <span>Total</span>
                  <span className="tabular-nums">${selected.amount.toFixed(2)}</span>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-2">
                {selected.status !== "paid" && (
                  <Button onClick={() => updateStatus(selected.id, "paid")}>
                    Marcar como pagado
                  </Button>
                )}
                {selected.status === "paid" && (
                  <Button variant="outline" onClick={() => updateStatus(selected.id, "refunded")}>
                    Reembolso
                  </Button>
                )}
                {selected.status !== "cancelled" && (
                  <Button variant="outline" onClick={() => updateStatus(selected.id, "cancelled")}>
                    Cancelar
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
