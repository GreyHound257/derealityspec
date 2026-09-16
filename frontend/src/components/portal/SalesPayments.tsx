"use client";
import { motion } from 'framer-motion';
import { Download, Search, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const payments = [
  { id: 'PAY-001', client: 'Adebayo Johnson', estate: 'Royal Gardens', plot: 'RG-045', amount: '₦8,500,000', paid: '₦8,500,000', balance: '₦0', status: 'Fully Paid', date: 'Sep 4, 2026', method: 'Bank Transfer' },
  { id: 'PAY-002', client: 'Chioma Okafor', estate: 'Emerald City', plot: 'EC-112', amount: '₦5,200,000', paid: '₦2,600,000', balance: '₦2,600,000', status: 'Installment', date: 'Sep 3, 2026', method: 'Bank Transfer' },
  { id: 'PAY-003', client: 'Ibrahim Musa', estate: 'Royal Gardens', plot: 'RG-078', amount: '₦8,500,000', paid: '₦8,500,000', balance: '₦0', status: 'Fully Paid', date: 'Sep 2, 2026', method: 'Online Payment' },
  { id: 'PAY-004', client: 'Grace Eze', estate: 'Emerald City', plot: 'EC-089', amount: '₦5,200,000', paid: '₦1,300,000', balance: '₦3,900,000', status: 'Installment', date: 'Sep 1, 2026', method: 'Cash Deposit' },
  { id: 'PAY-005', client: 'Oluwaseun Bello', estate: 'Royal Gardens', plot: 'RG-023', amount: '₦8,500,000', paid: '₦4,250,000', balance: '₦4,250,000', status: 'Installment', date: 'Aug 30, 2026', method: 'Bank Transfer' },
  { id: 'PAY-006', client: 'Fatima Ahmed', estate: 'Emerald City', plot: 'EC-156', amount: '₦5,200,000', paid: '₦5,200,000', balance: '₦0', status: 'Fully Paid', date: 'Aug 28, 2026', method: 'Online Payment' },
];

const statusColors: Record<string, string> = {
  'Fully Paid': 'bg-green-stat/10 text-green-stat',
  Installment: 'bg-blue-stat/10 text-blue-stat',
  Overdue: 'bg-red-stat/10 text-red-stat',
};

export default function SalesPayments() {
  const totalRevenue = 142500000;
  const collected = 98750000;
  const outstanding = totalRevenue - collected;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-charcoal">Sales & Payments</h2>
          <p className="text-sm text-charcoal-muted">Track all transactions and payment schedules</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-light rounded-lg text-charcoal hover:bg-canvas-subtle transition-colors">
          <Download size={14} />
          Export CSV
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-canvas rounded-xl border border-border-light p-5">
          <p className="text-xs text-charcoal-muted mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold text-charcoal">₦142.5M</p>
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-stat mt-1">
            <ArrowUpRight size={12} /> +12.3% vs last month
          </span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-canvas rounded-xl border border-border-light p-5">
          <p className="text-xs text-charcoal-muted mb-1">Collected</p>
          <p className="text-2xl font-semibold text-green-stat">₦98.7M</p>
          <div className="mt-2 h-1.5 bg-border-faint rounded-full overflow-hidden">
            <div className="h-full bg-green-stat rounded-full" style={{ width: `${(collected / totalRevenue) * 100}%` }} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-canvas rounded-xl border border-border-light p-5">
          <p className="text-xs text-charcoal-muted mb-1">Outstanding</p>
          <p className="text-2xl font-semibold text-amber-stat">₦43.8M</p>
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-stat mt-1">
            <ArrowDownRight size={12} /> 14 overdue accounts
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-canvas rounded-xl border border-border-light"
      >
        <div className="px-5 py-4 border-b border-border-faint flex flex-wrap items-center justify-between gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-faint" />
            <input
              type="text"
              placeholder="Search payments..."
              className="pl-8 pr-3 py-2 text-sm border border-border-light rounded-lg bg-canvas focus:outline-none focus:border-purple-brand/40 w-56"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium border border-border-light rounded-lg text-charcoal-muted hover:text-charcoal">
            <Calendar size={13} />
            Date Range
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-faint">
                <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3">ID</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3">Client</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3 hidden md:table-cell">Estate / Plot</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3">Paid</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3 hidden lg:table-cell">Balance</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3">Status</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-charcoal-faint font-medium px-5 py-3 hidden lg:table-cell">Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-border-faint last:border-0 hover:bg-canvas-subtle transition-colors">
                  <td className="px-5 py-3 text-sm text-charcoal-muted font-mono">{p.id}</td>
                  <td className="px-5 py-3 text-sm font-medium text-charcoal">{p.client}</td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <p className="text-sm text-charcoal-muted">{p.estate}</p>
                    <p className="text-[11px] text-charcoal-faint">{p.plot}</p>
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-charcoal">{p.paid}</td>
                  <td className="px-5 py-3 text-sm text-charcoal-muted hidden lg:table-cell">{p.balance}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColors[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-charcoal-muted hidden lg:table-cell">{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
