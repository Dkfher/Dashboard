import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Users, ShoppingCart, Activity } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex — Admin Dashboard" },
      {
        name: "description",
        content:
          "Clean, modern admin dashboard with analytics, revenue tracking and recent orders.",
      },
      { property: "og:title", content: "Apex — Admin Dashboard" },
      {
        property: "og:description",
        content:
          "Clean, modern admin dashboard with analytics, revenue tracking and recent orders.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <DashboardLayout
      title="General"
      subtitle="Bienvenido nuevamente, este es el resumen del dia de hoy."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Ingresos totales" value="$284,192" change={12.4} icon={DollarSign} />
        <StatCard label="Usuarios activos" value="18,294" change={8.2} icon={Users} />
        <StatCard label="Ordenes" value="2,847" change={-2.1} icon={ShoppingCart} />
        <StatCard label="Conversión" value="3.84%" change={4.5} icon={Activity} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RevenueChart />
        <TrafficChart />
      </div>
      <RecentOrders />
    </DashboardLayout>
  );
}
