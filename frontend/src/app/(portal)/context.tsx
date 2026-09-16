"use client";

import { createContext, useContext, useState } from "react";

export type PortalView = 'dashboard' | 'estates' | 'plot-tracker' | 'sales' | 'agents' | 'cms';

interface PortalContextType {
  activeView: PortalView;
  setActiveView: (view: PortalView) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<PortalView>('dashboard');
  
  return (
    <PortalContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortalContext() {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error("usePortalContext must be used within a PortalProvider");
  }
  return context;
}
