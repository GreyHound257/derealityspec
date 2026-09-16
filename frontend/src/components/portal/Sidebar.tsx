"use client";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Map,
  Grid3X3,
  DollarSign,
  GitBranch,
  Settings,
  X,
  Home,
} from 'lucide-react';
import type { PortalView } from '@/app/(portal)/context';

const navItems: { id: PortalView; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'estates', label: 'Estates', icon: Map },
  { id: 'plot-tracker', label: 'Visual Plot Tracker', icon: Grid3X3 },
  { id: 'sales', label: 'Sales & Payments', icon: DollarSign },
  { id: 'agents', label: 'Agent Referral Tree', icon: GitBranch },
  { id: 'cms', label: 'CMS Setup', icon: Settings },
];

interface SidebarProps {
  activeView: PortalView;
  onNavigate: (view: PortalView) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ activeView, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  const content = (
    <div className="flex flex-col h-full w-64 bg-charcoal text-canvas">
      <div className="flex items-center justify-between px-5 h-16 border-b border-canvas/10">
        <div className="flex items-center gap-2.5">
          <img src="/images/logo-mark.png" alt="DRS" className="w-7 h-7 object-contain brightness-200" />
          <div className="leading-none">
            <span className="font-display text-sm text-canvas">De Reality Spec</span>
            <p className="text-[10px] text-canvas/40 mt-0.5 tracking-wider uppercase">REMS Portal</p>
          </div>
        </div>
        <button onClick={onCloseMobile} className="lg:hidden p-1 text-canvas/40 hover:text-canvas">
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = activeView === item.id || (item.id === 'dashboard' && activeView === 'estates');
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-purple-brand text-canvas font-medium'
                  : 'text-canvas/55 hover:text-canvas/80 hover:bg-canvas/5'
              }`}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-canvas/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-canvas/40 hover:text-canvas/70 transition-colors"
        >
          <Home size={14} />
          Back to Website
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block flex-shrink-0">
        {content}
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-charcoal/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
