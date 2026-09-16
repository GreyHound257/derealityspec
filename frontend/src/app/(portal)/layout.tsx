"use client";

import { useState } from "react";
import Sidebar from "@/components/portal/Sidebar";
import TopBar from "@/components/portal/TopBar";
import { PortalProvider, usePortalContext } from "./context";

function PortalLayoutContent({ children }: { children: React.ReactNode }) {
  const { activeView, setActiveView } = usePortalContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-canvas-subtle overflow-hidden">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        mobileOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          activeView={activeView}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalProvider>
      <PortalLayoutContent>{children}</PortalLayoutContent>
    </PortalProvider>
  );
}
