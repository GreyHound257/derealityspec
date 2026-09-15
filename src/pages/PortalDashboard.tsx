"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/portal/Sidebar';
import TopBar from '../components/portal/TopBar';
import DashboardHome from '../components/portal/DashboardHome';
import PlotTracker from '../components/portal/PlotTracker';
import SalesPayments from '../components/portal/SalesPayments';
import AgentTree from '../components/portal/AgentTree';
import CMSSetup from '../components/portal/CMSSetup';

export type PortalView = 'dashboard' | 'estates' | 'plot-tracker' | 'sales' | 'agents' | 'cms';

export default function PortalDashboard() {
  const [activeView, setActiveView] = useState<PortalView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
      case 'estates':
        return <DashboardHome onNavigate={setActiveView} />;
      case 'plot-tracker':
        return <PlotTracker />;
      case 'sales':
        return <SalesPayments />;
      case 'agents':
        return <AgentTree />;
      case 'cms':
        return <CMSSetup />;
      default:
        return <DashboardHome onNavigate={setActiveView} />;
    }
  };

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
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
