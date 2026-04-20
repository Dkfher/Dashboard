import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function DashboardLayout({ title, subtitle, children }: Props) {
  return (
    <div className="min-h-screen flex w-full bg-[image:var(--gradient-subtle)]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-4 md:p-8 space-y-6">{children}</main>
      </div>
    </div>
  );
}
