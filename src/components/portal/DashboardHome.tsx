"use client";
import { motion } from 'framer-motion';
import {
  TrendingUp,
  MapPin,
  Users,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Grid3X3,
} from 'lucide-react';
import type { PortalView } from '../../pages/PortalDashboard';

const summaryCards = [
  { label: 'Total Revenue', value: '₦142.5M', change: '+12.3%', up: true, icon: DollarSign, color: 'text-green-stat', bg: 'bg-green-stat/10' },
  { label: 'Active Estates', value: '7', change: '+2', up: true, icon: MapPin, color: 'text-purple-brand', bg: 'bg-purple-soft' },
  { label: 'Registered Clients', value: '1,240', change: '+48', up: true, icon: Users, color: 'text-blue-stat', bg: 'bg-blue-stat/10' },
  { label: 'Conversion Rate', value: '34.2%', change: '-2.1%', up: false, icon: TrendingUp, color: 'text-amber-stat', bg: 'bg-amber-stat/10' },
];

const recentTransactions = [
  { client: 'Adebayo Johnson', estate: 'Royal Gardens', plot: 'RG-045', amount: '₦8,500,000', status: 'Completed', date: 'Sep 4, 2026' },
  { client: 'Chioma Okafor', estate: 'Emerald City', plot: 'EC-112', amount: '₦5,200,000', status: 'Pending', date: 'Sep 3, 2026' },
  { client: 'Ibrahim Musa', estate: 'Royal Gardens', plot: 'RG-078', amount: '₦8,500,000', status: 'Completed', date: 'Sep 2, 2026' },
  { client: 'Grace Eze', estate: 'Emerald City', plot: 'EC-089', amount: '₦2,600,000', status: 'Installment', date: 'Sep 1, 2026' },
  { client: 'Oluwaseun Bello', estate: 'Royal Gardens', plot: 'RG-023', amount: '₦4,250,000', status: 'Installment', date: 'Aug 30, 2026' },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-green-stat/10 text-green-stat',
  Pending: 'bg-amber-stat/10 text-amber-stat',
  Installment: 'bg-blue-stat/10 text-blue-stat',
};

interface Props {
  onNavigate: (view: PortalView) => void;
}

export default function DashboardHome({ onNavigate }: Props) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-canvas rounded-xl border border-border-light p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon size={18} className={card.color} />
              </div>
              <button className="p-1 text-charcoal-faint hover:text-charcoal-muted">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <p className="text-2xl font-semibold text-charcoal tracking-tight">{card.value}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-charcoal-muted">{card.label}</p>
              <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${card.up ? 'text-green-stat' : 'text-red-stat'}`}>
                {card.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {card.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Inventory Stats + Quick Plot Map */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 bg-canvas rounded-xl border border-border-light"
        >
          <div className="px-5 py-4 border-b border-border-faint flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">Inventory Overview</h3>
            <button
              onClick={() => onNavigate('plot-tracker')}
              className="text-xs text-purple-brand hover:text-purple-deep font-medium flex items-center gap-1"
            >
              <Grid3X3 size={12} />
              Plot Tracker
            </button>
          </div>
          <div className="p-5 space-y-4">
            {/* Stat Chips */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-green-stat/5 rounded-lg border border-green-stat/10">
                <p className="text-xl font-semibold text-green-stat">78</p>
                <p className="text-[11px] text-charcoal-muted mt-0.5">Available</p>
              </div>
              <div className="text-center p-3 bg-amber-stat/5 rounded-lg border border-amber-stat/10">
                <p className="text-xl font-semibold text-amber-stat">34</p>
                <p className="text-[11px] text-charcoal-muted mt-0.5">Reserved</p>
              </div>
              <div className="text-center p-3 bg-red-stat/5 rounded-lg border border-red-stat/10">
                <p className="text-xl font-semibold text-red-stat">208</p>
                <p className="text-[11px] text-charcoal-muted mt-0.5">Sold</p>
              </div>
            </div>

            {/* Mini SVG Plot Map Preview */}
            <div className="rounded-lg border border-border-faint bg-canvas-subtle p-4">
              <p className="text-[11px] uppercase tracking-wider text-charcoal-faint font-medium mb-3">Royal Gardens — Phase 2 Preview</p>
              <svg viewBox="0 0 280 160" className="w-full h-auto">
                {/* Grid of plots */}
                {Array.from({ length: 5 }).map((_, row) =>
                  Array.from({ length: 8 }).map((_, col) => {
                    const idx = row * 8 + col;
                    const sold = [0,1,2,5,8,9,10,13,16,17,20,21,24,25,26,29,32,33,34,35];
                    const reserved = [3,7,11,15,19,23,27,31];
                    let fill = '#16A34A';
                    let opacity = 0.2;
                    if (sold.includes(idx)) { fill = '#DC2626'; opacity = 0.25; }
                    else if (reserved.includes(idx)) { fill = '#D97706'; opacity = 0.25; }
                    return (
                      <rect
                        key={`${row}-${col}`}
                        x={col * 34 + 4}
                        y={row * 30 + 4}
                        width={30}
                        height={26}
                        rx={3}
                        fill={fill}
                        fillOpacity={opacity}
                        stroke={fill}
                        strokeWidth={1}
                        strokeOpacity={0.4}
                        className="hover:fill-opacity-50 transition-all cursor-pointer"
                      />
                    );
                  })
                )}
              </svg>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-green-stat/30 border border-green-stat/40" />
                  <span className="text-[10px] text-charcoal-muted">Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-stat/30 border border-amber-stat/40" />
                  <span className="text-[10px] text-charcoal-muted">Reserved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-stat/30 border border-red-stat/40" />
                  <span className="text-[10px] text-charcoal-muted">Sold</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-3 bg-canvas rounded-xl border border-border-light"
        >
          <div className="px-5 py-4 border-b border-border-faint flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">Recent Transactions</h3>
            <button className="text-xs text-purple-brand hover:text-purple-deep font-medium">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-faint">
                  <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3">Client</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3 hidden sm:table-cell">Estate / Plot</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3">Amount</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3">Status</th>
                  <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3 hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, i) => (
                  <tr key={i} className="border-b border-border-faint last:border-0 hover:bg-canvas-subtle transition-colors">
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-charcoal">{tx.client}</p>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <p className="text-sm text-charcoal-muted">{tx.estate}</p>
                      <p className="text-[11px] text-charcoal-faint">{tx.plot}</p>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-charcoal">{tx.amount}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColors[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <p className="text-sm text-charcoal-muted">{tx.date}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
