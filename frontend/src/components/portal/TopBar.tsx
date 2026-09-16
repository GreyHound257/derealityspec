"use client";
import { Menu, Bell, MessageSquare, ChevronRight } from 'lucide-react';
import type { PortalView } from '@/app/(portal)/context';

const viewLabels: Record<PortalView, string> = {
  dashboard: 'Overview',
  estates: 'Estates',
  'plot-tracker': 'Visual Plot Tracker',
  sales: 'Sales & Payments',
  agents: 'Agent Referral Tree',
  cms: 'CMS Setup',
};

interface TopBarProps {
  activeView: PortalView;
  onMenuToggle: () => void;
}

export default function TopBar({ activeView, onMenuToggle }: TopBarProps) {
  return (
    <header className="h-16 bg-canvas border-b border-border-light flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden p-1.5 text-charcoal-muted hover:text-charcoal">
          <Menu size={20} />
        </button>
        <nav className="flex items-center gap-1.5 text-sm">
          <span className="text-charcoal-faint">Portal</span>
          <ChevronRight size={13} className="text-charcoal-faint" />
          <span className="text-charcoal font-medium">{viewLabels[activeView]}</span>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-canvas-subtle rounded-lg border border-border-faint">
          <MessageSquare size={13} className="text-green-stat" />
          <span className="text-xs text-charcoal-muted">SMS:</span>
          <span className="text-xs font-semibold text-charcoal">2,450</span>
        </div>

        <button className="relative p-2 text-charcoal-muted hover:text-charcoal transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-stat rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-border-light">
          <div className="w-8 h-8 rounded-full bg-purple-brand flex items-center justify-center">
            <span className="text-xs font-semibold text-canvas">AD</span>
          </div>
          <div className="hidden sm:block leading-none">
            <p className="text-sm font-medium text-charcoal">Admin</p>
            <p className="text-[11px] text-charcoal-faint mt-0.5">ID: BTN7506</p>
          </div>
        </div>
      </div>
    </header>
  );
}
