import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Configuración — Apex" },
      {
        name: "description",
        content: "Gestiona tu perfil, preferencias, notificaciones y seguridad.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [profile, setProfile] = useState({
    name: "Luis Sierra",
    email: "lsierra@apex.io",
    bio: "Responsable de producto en Apex. Creando mejores paneles de control.",
  });
  const [notifs, setNotifs] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false,
  });

  return (
    <DashboardLayout title="Configuración" subtitle="Gestiona tu cuenta y tus preferencias.">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)] space-y-4 max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[image:var(--gradient-primary)] flex items-center justify-center text-primary-foreground font-semibold text-lg">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Descripción</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            </div>
            <div className="pt-2">
              <Button onClick={() => toast.success("Profile saved")}>Guardar Cambios</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)] space-y-4 max-w-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Modo Oscuro</p>
                <p className="text-xs text-muted-foreground">
                  Cambia entre el tema claro y el oscuro.
                </p>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="font-medium text-sm">Modo compacto</p>
                <p className="text-xs text-muted-foreground">
                  Reduzca el espaciado y el tamaño de los elementos.
                </p>
              </div>
              <Switch />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)] space-y-4 max-w-2xl">
            {[
              {
                key: "email",
                title: "Notificaciones por email",
                desc: "Receive email about orders and account activity",
              },
              {
                key: "push",
                title: "Activar notificaciones",
                desc: "Notificaciones en el navegador para alertas en tiempo real.",
              },
              {
                key: "weekly",
                title: "Resumen semanal",
                desc: "Resumen de sus indicadores clave cada lunes",
              },
              {
                key: "marketing",
                title: "Promociones por correo",
                desc: "Actualizaciones de productos y contenido promocional",
              },
            ].map((n, i) => (
              <div
                key={n.key}
                className={
                  i > 0
                    ? "flex items-center justify-between border-t border-border pt-4"
                    : "flex items-center justify-between"
                }
              >
                <div>
                  <p className="font-medium text-sm">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                </div>
                <Switch
                  checked={notifs[n.key as keyof typeof notifs]}
                  onCheckedChange={(v) => setNotifs({ ...notifs, [n.key]: v })}
                />
              </div>
            ))}
            <div className="pt-2">
              <Button onClick={() => toast.success("Preferences saved")}>
                Guardar preferencias
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-5 border-border/60 shadow-[var(--shadow-sm)] space-y-4 max-w-2xl">
            <div>
              <Label htmlFor="current">Contraseña actual</Label>
              <Input id="current" type="password" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new">Nueva contraseña</Label>
                <Input id="new" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm">Confirmar nueva contraseña</Label>
                <Input id="confirm" type="password" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="font-medium text-sm">Autenticación de dos factores</p>
                <p className="text-xs text-muted-foreground">
                  Añade una capa adicional de seguridad a tu cuenta.
                </p>
              </div>
              <Switch />
            </div>
            <div className="pt-2">
              <Button onClick={() => toast.success("Contraseña actualizada")}>
                Actualizar contraseña
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
