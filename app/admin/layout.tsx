"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { getToken, removeToken } from "@/lib/auth";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: Settings },
  { href: "/admin/waitlist", label: "Waitlist", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const stored = localStorage.getItem("billsera_admin_sidebar_collapsed");
      if (stored !== null) setSidebarCollapsed(stored === "true");
      const t = localStorage.getItem("billsera_theme");
      if (t === "light" || t === "dark") setTheme(t);
    }
  }, [mounted]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("billsera_theme", next);
      }
      return next;
    });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("billsera_admin_sidebar_collapsed", String(next));
      }
      return next;
    });
  };

  const token = mounted ? getToken() : null;

  // You can uncomment this later to require auth:
  // if (mounted && !token) { ... }

  return (
    <div
      className={`admin-panel min-h-screen bg-black text-zinc-100 overflow-x-hidden md:overflow-x-visible ${
        sidebarCollapsed ? "md:pl-20" : "md:pl-64"
      }`}
      data-theme={theme}
    >
      {/* Sidebar - desktop (collapsible, fixed) */}
      <aside
        className={`admin-sidebar-desktop hidden md:flex fixed inset-y-0 left-0 flex-col border-r border-white/6 bg-zinc-950 transition-[width] duration-200 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 border-b border-white/6 flex items-center justify-between min-w-0">
          {sidebarCollapsed ? (
            <button
              onClick={toggleSidebar}
              className="mx-auto p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5"
              title="Expand sidebar"
            >
              <Settings className="w-4 h-4" />
            </button>
          ) : (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-2 min-w-0"
              >
                <div className="w-9 h-9 rounded-xl bg-violet-500 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg truncate">
                  Billsera Admin
                </span>
              </Link>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 shrink-0"
                title="Collapse sidebar"
              >
                <Settings className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-hidden border-t border-white/6">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={sidebarCollapsed ? item.label : undefined}
                className={`flex items-center rounded-xl text-sm font-medium transition-colors ${
                  sidebarCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
                } ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/6">
          <button
            onClick={() => {
              removeToken();
              window.location.href = "/login";
            }}
            className={`flex items-center w-full rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors ${
              sidebarCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"
            }`}
            title={sidebarCollapsed ? "Logout" : undefined}
          >
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm shrink-0">
              N
            </div>
            {!sidebarCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar (overlay) */}
      {sidebarOpen && (
        <div
          className="admin-overlay fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`admin-sidebar-mobile fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-zinc-950 border-r border-white/6 transform transition-transform md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-white/6 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-violet-500" />
            <span className="font-bold">Billsera Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3">
          <button
            onClick={() => {
              removeToken();
              window.location.href = "/login";
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium"
          >
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm">
              N
            </div>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main flex flex-col min-h-screen bg-black w-full">
        <header className="admin-header sticky top-0 z-30 border-b border-white/6 bg-black/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 md:px-6 lg:px-8 py-4">
            {/* Left: mobile menu + search */}
            <div className="flex items-center gap-3 flex-1 max-w-xl">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="search"
                    placeholder="Search across platform..."
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.06] text-zinc-100 placeholder:text-zinc-500 text-sm outline-none focus:border-violet-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Right: icons + admin menu */}
            <div className="flex items-center gap-2">
              <button className="relative p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-300 hover:bg-white/5"
                >
                  <span className="text-sm font-medium">Super Admin</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 py-1 w-48 rounded-xl bg-zinc-900 border border-white/6 shadow-xl z-20">
                      <button
                        onClick={() => {
                          removeToken();
                          window.location.href = "/login";
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-left text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

