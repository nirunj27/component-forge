import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@component-forge/app-ui/components/ui/button";
import { useAuthStore } from "../store/authStore";
import { UserAvatar } from "./UserAvatar";
import { ConfirmDialog } from "./ConfirmDialog";

export function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isAdmin = useAuthStore((s) => s.isAdmin);
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-700 bg-slate-900 px-4 text-white">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚒️</span>
          <div>
            <p className="text-sm font-semibold">Component Forge Studio</p>
            <p className="text-xs text-slate-400">Developer workspace</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm text-slate-300 hover:text-white">
            Editor
          </Link>
          {isAdmin() && (
            <>
              <Link to="/admin" className="text-sm text-slate-300 hover:text-white">
                Admin
              </Link>
              <Link to="/admin/projects" className="text-sm text-slate-300 hover:text-white">
                Projects
              </Link>
            </>
          )}
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-300 hover:text-white"
          >
            Playground
          </a>
        </nav>

        {user && (
          <div className="flex items-center gap-3">
            <UserAvatar avatarId={user.avatar} name={user.name} />
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs uppercase text-slate-400">{user.role}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 bg-slate-800 text-white hover:bg-slate-700"
              onClick={() => setLogoutOpen(true)}
            >
              Logout
            </Button>
          </div>
        )}
      </header>

      <ConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        title="Sign out?"
        description="You will need to sign in again to access the studio."
        confirmLabel="Sign out"
        onConfirm={handleLogout}
      />
    </>
  );
}
