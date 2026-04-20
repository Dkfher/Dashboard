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
      { title: "Notificaciones — Apex" },
      { name: "description", content: "Stay up to date with orders, customers and system alerts." },
    ],
  }),
  component: NotificationsPage,
});

type Type = "pedido" | "cliente" | "alerta" | "mensaje";

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
    type: "pedido",
    title: "Nuevo pedido #A-1042",
    body: "Sofia Chen realizó un pedido por $1,240.00",
    time: "Hace 2 min",
    read: false,
  },
  {
    id: 2,
    type: "cliente",
    title: "Nuevo registro",
    body: "Diego Álvarez se unió a su plataforma",
    time: "Hace 18 min",
    read: false,
  },
  {
    id: 3,
    type: "alerta",
    title: "Advertencia de bajo stock",
    body: "3 productos están por debajo del umbral mínimo",
    time: "Hace 1 hora",
    read: false,
  },
  {
    id: 4,
    type: "mensaje",
    title: "Nuevo mensaje",
    body: "Marcus Reid: ¿Podemos programar una llamada para esta semana?",
    time: "Hace 3 horas",
    read: true,
  },
  {
    id: 5,
    type: "pedido",
    title: "Pedido reembolsado",
    body: "El pedido #A-1039 fue reembolsado a Diego Álvarez.",
    time: "Ayer",
    read: true,
  },
  {
    id: 6,
    type: "cliente",
    title: "VIP plus",
    body: "Lina Park alcanzó el status VIP.",
    time: "Ayer",
    read: true,
  },
];

const typeIcon: Record<Type, typeof ShoppingBag> = {
  pedido: ShoppingBag,
  cliente: UserPlus,
  alerta: AlertTriangle,
  mensaje: MessageSquare,
};

const typeColor: Record<Type, string> = {
  pedido: "bg-primary/10 text-primary",
  cliente: "bg-success/10 text-success",
  alerta: "bg-warning/10 text-warning",
  mensaje: "bg-accent text-accent-foreground",
};

function NotificationsPage() {
  const [items, setItems] = useState<Notif[]>(initial);
  const [filter, setFilter] = useState<Type | "todo" | "no leido">("todo");

  const filtered = useMemo(
    () =>
      items.filter((n) => {
        if (filter === "todo") return true;
        if (filter === "no leido") return !n.read;
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
          {(["todo", "no leido", "pedido", "cliente", "alerta", "mensaje"] as const).map((f) => (
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
