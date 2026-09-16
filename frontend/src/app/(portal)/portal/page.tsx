"use client";

import { motion } from "framer-motion";
import { usePortalContext } from "../context";
import DashboardHome from "@/components/portal/DashboardHome";
import PlotTracker from "@/components/portal/PlotTracker";
import SalesPayments from "@/components/portal/SalesPayments";
import AgentTree from "@/components/portal/AgentTree";
import CMSSetup from "@/components/portal/CMSSetup";

export default function PortalPage() {
  const { activeView, setActiveView } = usePortalContext();

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
      case "estates":
        return <DashboardHome onNavigate={setActiveView} />;
      case "plot-tracker":
        return <PlotTracker />;
      case "sales":
        return <SalesPayments />;
      case "agents":
        return <AgentTree />;
      case "cms":
        return <CMSSetup />;
      default:
        return <DashboardHome onNavigate={setActiveView} />;
    }
  };

  return (
    <motion.div
      key={activeView}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {renderView()}
    </motion.div>
  );
}
