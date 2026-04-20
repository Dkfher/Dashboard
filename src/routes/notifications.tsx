import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, UserPlus, AlertTriangle, MessageSquare, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Apex" },
      { name: "description", content: "Stay up to date with orders, customers and system alerts." },
    ],
  }),
  component: NotificationsPage,
});

type Type = "order" | "customer" | "alert" | "message";

interface Notif {
  id: number;
  type: Type;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const initial: Notif[] = [
  {
    id: 1,
    type: "order",
    title: "New order #A-1042",
    body: "Sofia Chen placed an order for $1,240.00",
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    type: "customer",
    title: "New signup",
    body: "Diego Alvarez joined your platform",
    time: "18m ago",
    read: false,
  },
  {
    id: 3,
    type: "alert",
    title: "Low stock warning",
    body: "3 products are below minimum threshold",
    time: "1h ago",
    read: false,
  },
  {
    id: 4,
    type: "message",
    title: "New message",
    body: "Marcus Reid: Can we schedule a call this week?",
    time: "3h ago",
    read: true,
  },
  {
    id: 5,
    type: "order",
    title: "Order refunded",
    body: "#A-1039 was refunded to Diego Alvarez",
    time: "Yesterday",
    read: true,
  },
  {
    id: 6,
    type: "customer",
    title: "VIP upgrade",
    body: "Lina Park reached VIP status",
    time: "Yesterday",
    read: true,
  },
];

const typeIcon: Record<Type, typeof ShoppingBag> = {
  order: ShoppingBag,
  customer: UserPlus,
  alert: AlertTriangle,
  message: MessageSquare,
};

const typeColor: Record<Type, string> = {
  order: "bg-primary/10 text-primary",
  customer: "bg-success/10 text-success",
  alert: "bg-warning/10 text-warning",
  message: "bg-accent text-accent-foreground",
};

function NotificationsPage() {
  const [items, setItems] = useState<Notif[]>(initial);
  const [filter, setFilter] = useState<Type | "all" | "unread">("all");

  const filtered = useMemo(
    () =>
      items.filter((n) => {
        if (filter === "all") return true;
        if (filter === "unread") return !n.read;
        return n.type === filter;
      }),
    [items, filter],
  );

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const toggleRead = (id: number) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));

  return (
    <DashboardLayout title="Notificaciones" subtitle={`${unreadCount} sin leer`}>
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "unread", "order", "customer", "alert", "message"] as const).map((f) => (
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
        <Button variant="outline" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
          <CheckCheck className="h-4 w-4 mr-1" /> Marcar todo como leído
        </Button>
      </div>

      <Card className="border-border/60 shadow-[var(--shadow-sm)] divide-y divide-border overflow-hidden">
        {filtered.map((n) => {
          const Icon = typeIcon[n.type];
          return (
            <button
              key={n.id}
              onClick={() => toggleRead(n.id)}
              className={cn(
                "w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors",
                !n.read && "bg-primary/5",
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                  typeColor[n.type],
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn("text-sm truncate", !n.read ? "font-semibold" : "font-medium")}>
                    {n.title}
                  </p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">{n.body}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No hay notificaciones que mostrar.
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}
