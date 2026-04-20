import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, MousePointerClick, TrendingUp, Timer } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analítica — Apex" },
      {
        name: "description",
        content: "Análisis de tráfico, participación y conversión con gráficos interactivos.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const trafficData = {
  "7d": [
    { d: "Mon", visits: 1240, pageviews: 3200 },
    { d: "Tue", visits: 1580, pageviews: 3900 },
    { d: "Wed", visits: 1420, pageviews: 3600 },
    { d: "Thu", visits: 1950, pageviews: 4800 },
    { d: "Fri", visits: 2210, pageviews: 5400 },
    { d: "Sat", visits: 1780, pageviews: 4200 },
    { d: "Sun", visits: 1620, pageviews: 3800 },
  ],
  "30d": Array.from({ length: 30 }, (_, i) => ({
    d: `D${i + 1}`,
    visits: 1200 + Math.round(Math.sin(i / 3) * 500 + i * 20),
    pageviews: 3000 + Math.round(Math.cos(i / 3) * 900 + i * 40),
  })),
  "90d": Array.from({ length: 12 }, (_, i) => ({
    d: `W${i + 1}`,
    visits: 8000 + Math.round(Math.sin(i / 2) * 2000 + i * 200),
    pageviews: 22000 + Math.round(Math.cos(i / 2) * 5000 + i * 400),
  })),
};

const sources = [
  { name: "Organico", value: 42, color: "oklch(0.55 0.18 260)" },
  { name: "Directo", value: 28, color: "oklch(0.65 0.16 155)" },
  { name: "Referido", value: 18, color: "oklch(0.75 0.16 70)" },
  { name: "Redes sociales", value: 12, color: "oklch(0.6 0.15 320)" },
];

const devices = [
  { name: "Desktop", a: 58 },
  { name: "Mobile", a: 34 },
  { name: "Tablet", a: 8 },
];

function AnalyticsPage() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");
  const data = trafficData[range];

  return (
    <DashboardLayout
      title="Analítica"
      subtitle="Analiza en profundidad tus métricas de tráfico y participación."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Visualizaciones de página" value="128,430" change={14.2} icon={Eye} />
        <StatCard label="Sesiones" value="42,198" change={9.1} icon={MousePointerClick} />
        <StatCard label="Tasa de rebote" value="38.6%" change={-3.4} icon={TrendingUp} />
        <StatCard label="Duración promedio" value="3m 42s" change={5.2} icon={Timer} />
      </div>

      <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)]">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h3 className="font-semibold tracking-tight">Resumen del tráfico</h3>
            <p className="text-xs text-muted-foreground">Visitas vs visualizaciones de pagina</p>
          </div>
          <Tabs value={range} onValueChange={(v) => setRange(v as typeof range)}>
            <TabsList>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="p" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.16 155)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.65 0.16 155)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="d"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="pageviews"
                stroke="oklch(0.65 0.16 155)"
                strokeWidth={2}
                fill="url(#p)"
              />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="oklch(0.55 0.18 260)"
                strokeWidth={2}
                fill="url(#v)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)]">
          <h3 className="font-semibold tracking-tight mb-4">Fuentes de tráfico</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sources}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  stroke="none"
                >
                  {sources.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)]">
          <h3 className="font-semibold tracking-tight mb-4">Dispositivos</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={devices}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.5rem",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="a" fill="oklch(0.55 0.18 260)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
