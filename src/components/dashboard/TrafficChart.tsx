import { Card } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Directo", value: 4200, color: "oklch(0.55 0.18 260)" },
  { name: "Organico", value: 3100, color: "oklch(0.65 0.16 155)" },
  { name: "Referidos", value: 1800, color: "oklch(0.75 0.16 70)" },
  { name: "Redes Sociales", value: 1200, color: "oklch(0.6 0.15 320)" },
];

const total = data.reduce((s, d) => s + d.value, 0);

export function TrafficChart() {
  return (
    <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)]">
      <div className="mb-4">
        <h3 className="font-semibold tracking-tight">Fuentes de trafico</h3>
        <p className="text-xs text-muted-foreground">Visitantes esta semana</p>
      </div>
      <div className="relative h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-semibold">{(total / 1000).toFixed(1)}k</p>
          <p className="text-xs text-muted-foreground">visitantes</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              <span className="text-foreground">{d.name}</span>
            </div>
            <span className="text-muted-foreground tabular-nums">
              {((d.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
