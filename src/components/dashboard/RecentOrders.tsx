import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#A-1042",
    customer: "Sofia Chen",
    email: "sofia@acme.co",
    amount: "$1,240.00",
    status: "paid",
  },
  {
    id: "#A-1041",
    customer: "Marcus Reid",
    email: "marcus@northwind.io",
    amount: "$820.50",
    status: "pending",
  },
  {
    id: "#A-1040",
    customer: "Lina Park",
    email: "lina@vertex.dev",
    amount: "$3,410.00",
    status: "paid",
  },
  {
    id: "#A-1039",
    customer: "Diego Alvarez",
    email: "diego@studio.ai",
    amount: "$215.00",
    status: "refunded",
  },
  {
    id: "#A-1038",
    customer: "Emma Wright",
    email: "emma@bloom.co",
    amount: "$1,790.25",
    status: "paid",
  },
  {
    id: "#A-1037",
    customer: "Noah Patel",
    email: "noah@flux.app",
    amount: "$540.00",
    status: "pending",
  },
];

const statusStyles: Record<string, string> = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  refunded: "bg-muted text-muted-foreground border-border",
};

export function RecentOrders() {
  return (
    <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold tracking-tight">Pedidos recientes</h3>
          <p className="text-xs text-muted-foreground">Últimas transacciones en tu tienda</p>
        </div>
        <button className="text-xs font-medium text-primary hover:underline">Ver todo</button>
      </div>
      <div className="overflow-x-auto -mx-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="font-medium px-5 py-2">Pedido</th>
              <th className="font-medium py-2">Cliente</th>
              <th className="font-medium py-2">Status</th>
              <th className="font-medium px-5 py-2 text-right">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-b border-border/50 last:border-0 hover:bg-muted/40 transition-colors"
              >
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{o.id}</td>
                <td className="py-3">
                  <p className="font-medium">{o.customer}</p>
                  <p className="text-xs text-muted-foreground">{o.email}</p>
                </td>
                <td className="py-3">
                  <Badge
                    variant="outline"
                    className={cn("capitalize font-medium", statusStyles[o.status])}
                  >
                    {o.status}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-right font-medium tabular-nums">{o.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
