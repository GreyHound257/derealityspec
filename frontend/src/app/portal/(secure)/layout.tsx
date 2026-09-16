"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function PortalGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await apiFetch("/users/me");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        if (!pathname.includes("/login")) {
          router.push("/portal/login");
        }
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f172a]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Simple Sidebar Placeholder */}
      <aside className="w-64 bg-[#2c2c2c] text-white flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          <span className="text-xl font-serif font-bold text-white">REMS Portal</span>
        </div>
        <nav className="p-4 space-y-2 text-sm font-sans">
          <a href="/portal/map" className="block px-4 py-2 rounded-md bg-[#1e293b] text-white hover:bg-opacity-80">Interactive Map</a>
          <a href="#" className="block px-4 py-2 rounded-md text-gray-400 hover:bg-[#1e293b] hover:text-white">Financials</a>
          <a href="#" className="block px-4 py-2 rounded-md text-gray-400 hover:bg-[#1e293b] hover:text-white">CRM</a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-white">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
