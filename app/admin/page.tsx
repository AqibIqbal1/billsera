"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, LogOut } from "lucide-react";
import { getToken, removeToken } from "@/lib/auth";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = mounted ? getToken() : null;

  // if (mounted && !token) {
  //   return (
  //     <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-zinc-400 mb-4">You need to sign in to access the admin portal.</p>
  //         <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium">
  //           Go to login
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-violet-500" />
          <span className="font-bold">Billsera Admin</span>
        </Link>
        <button
          onClick={() => {
            removeToken();
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </header>

      <main className="p-6 md:p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-100 mb-2">Super Admin Portal</h1>
        <p className="text-zinc-500 mb-8">
          Manage users, settings, and platform-wide analytics. (Coming soon)
        </p>
        <div className="surface rounded-2xl border border-white/10 p-8 text-center text-zinc-500">
          Placeholder – integrate your Express admin APIs here.
        </div>
      </main>
    </div>
  );
}
