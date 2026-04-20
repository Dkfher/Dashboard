import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, FileSpreadsheet, FileBarChart } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reportes — Apex" },
      { name: "description", content: "Genera y exporta informes comerciales." },
    ],
  }),
  component: ReportsPage,
});

interface Report {
  id: string;
  name: string;
  type: "revenue" | "customers" | "inventory";
  range: string;
  generatedAt: string;
  size: string;
}

const initial: Report[] = [
  {
    id: "R-0042",
    name: "Monthly revenue — March 2025",
    type: "revenue",
    range: "2025-03-01 to 2025-03-31",
    generatedAt: "2025-04-01",
    size: "148 KB",
  },
  {
    id: "R-0041",
    name: "New customers Q1",
    type: "customers",
    range: "2025-01-01 to 2025-03-31",
    generatedAt: "2025-04-01",
    size: "92 KB",
  },
  {
    id: "R-0040",
    name: "Inventory snapshot",
    type: "inventory",
    range: "2025-03-31",
    generatedAt: "2025-03-31",
    size: "312 KB",
  },
];

const typeIcon = {
  revenue: FileBarChart,
  customers: FileText,
  inventory: FileSpreadsheet,
};

function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initial);
  const [from, setFrom] = useState("2025-04-01");
  const [to, setTo] = useState("2025-04-30");
  const [type, setType] = useState<Report["type"]>("revenue");

  const generate = () => {
    const id = `R-00${50 + reports.length}`;
    const name = `${type[0].toUpperCase() + type.slice(1)} report — ${from} to ${to}`;
    const newReport: Report = {
      id,
      name,
      type,
      range: `${from} to ${to}`,
      generatedAt: new Date().toISOString().slice(0, 10),
      size: `${Math.floor(Math.random() * 400 + 80)} KB`,
    };
    setReports((r) => [newReport, ...r]);
    toast.success("Report generated");
  };

  const download = (r: Report) => {
    const csv = `id,name,range,generatedAt\n${r.id},"${r.name}","${r.range}",${r.generatedAt}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloading ${r.id}.csv`);
  };

  return (
    <DashboardLayout title="Informes" subtitle="Genera y descarga informes comerciales">
      <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)]">
        <h3 className="font-semibold tracking-tight mb-4">Generar nuevo informe</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Report["type"])}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="revenue">Ganancia</option>
              <option value="customers">Clientes</option>
              <option value="inventory">Inventario</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Desde</label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Hasta</label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button onClick={generate} className="w-full">
              Generar informe
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border-border/60 shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-semibold tracking-tight">Informes generados</h3>
          <p className="text-xs text-muted-foreground">{reports.length} informes disponibles</p>
        </div>
        <div className="divide-y divide-border">
          {reports.map((r) => {
            const Icon = typeIcon[r.type];
            return (
              <div
                key={r.id}
                className="flex items-center gap-4 px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{r.name}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-mono">{r.id}</span> • {r.range} • {r.size}
                  </p>
                </div>
                <Badge variant="outline" className="capitalize hidden sm:inline-flex">
                  {r.type}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => download(r)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </DashboardLayout>
  );
}
