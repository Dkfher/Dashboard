import { Card } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { m: "Jan", revenue: 12400, expenses: 8200 },
  { m: "Feb", revenue: 15800, expenses: 9100 },
  { m: "Mar", revenue: 14200, expenses: 8800 },
  { m: "Apr", revenue: 19500, expenses: 10200 },
  { m: "May", revenue: 22100, expenses: 11500 },
  { m: "Jun", revenue: 25400, expenses: 12100 },
  { m: "Jul", revenue: 28900, expenses: 13400 },
  { m: "Aug", revenue: 31200, expenses: 14200 },
  { m: "Sep", revenue: 29800, expenses: 13900 },
  { m: "Oct", revenue: 34500, expenses: 15100 },
  { m: "Nov", revenue: 38200, expenses: 16400 },
  { m: "Dec", revenue: 42100, expenses: 17800 },
];

export function RevenueChart() {
  return (
    <Card className="p-5 lg:col-span-2 border-border/60 shadow-[var(--shadow-sm)]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold tracking-tight">Resumen de ingresos</h3>
          <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Ganancia
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-chart-3" />
            Gastos
          </div>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.75 0.16 70)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.75 0.16 70)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 255)" vertical={false} />
            <XAxis
              dataKey="m"
              stroke="oklch(0.5 0.02 258)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="oklch(0.5 0.02 258)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "oklch(1 0 0)",
                border: "1px solid oklch(0.92 0.01 255)",
                borderRadius: "0.5rem",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="oklch(0.55 0.18 260)"
              strokeWidth={2}
              fill="url(#rev)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="oklch(0.75 0.16 70)"
              strokeWidth={2}
              fill="url(#exp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
