import { Link, useLocation } from "react-router-dom";
import { Users, ArrowLeft, FolderKanban } from "lucide-react";
import { cn } from "@component-forge/app-ui/lib/utils";
import { Navbar } from "./Navbar";

const NAV = [
  { to: "/admin", label: "User management", icon: Users, end: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban, end: true },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="flex w-56 shrink-0 flex-col border-r bg-card">
          <div className="border-b p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Admin panel
            </p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {NAV.map(({ to, label, icon: Icon, end }) => {
              const active = end
                ? location.pathname === to
                : location.pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t p-3">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to editor
            </Link>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
