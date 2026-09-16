"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, User, Users, DollarSign, Award } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  referrals: number;
  totalSales: string;
  commission: string;
  children?: Agent[];
}

const agentData: Agent[] = [
  {
    id: 'AGT-001',
    name: 'Michael Adewale',
    role: 'Senior Agent',
    referrals: 24,
    totalSales: '₦48.2M',
    commission: '₦2.41M',
    children: [
      {
        id: 'AGT-004',
        name: 'Blessing Nwankwo',
        role: 'Agent',
        referrals: 8,
        totalSales: '₦16.5M',
        commission: '₦825K',
        children: [
          { id: 'AGT-009', name: 'Emeka Obi', role: 'Junior Agent', referrals: 3, totalSales: '₦5.2M', commission: '₦260K' },
          { id: 'AGT-010', name: 'Aisha Bello', role: 'Junior Agent', referrals: 2, totalSales: '₦3.8M', commission: '₦190K' },
        ],
      },
      {
        id: 'AGT-005',
        name: 'Tunde Bakare',
        role: 'Agent',
        referrals: 12,
        totalSales: '₦22.1M',
        commission: '₦1.1M',
      },
    ],
  },
  {
    id: 'AGT-002',
    name: 'Ngozi Okonkwo',
    role: 'Senior Agent',
    referrals: 18,
    totalSales: '₦38.7M',
    commission: '₦1.94M',
    children: [
      { id: 'AGT-006', name: 'Samuel Ade', role: 'Agent', referrals: 6, totalSales: '₦12.4M', commission: '₦620K' },
      { id: 'AGT-007', name: 'Kemi Solanke', role: 'Agent', referrals: 4, totalSales: '₦8.9M', commission: '₦445K' },
    ],
  },
  {
    id: 'AGT-003',
    name: 'Yusuf Ibrahim',
    role: 'Senior Agent',
    referrals: 15,
    totalSales: '₦31.5M',
    commission: '₦1.58M',
  },
];

function AgentNode({ agent, depth = 0 }: { agent: Agent; depth?: number }) {
  const [expanded, setExpanded] = useState(depth === 0);
  const hasChildren = agent.children && agent.children.length > 0;

  return (
    <div className={depth > 0 ? 'ml-6 border-l border-border-faint pl-4' : ''}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-canvas rounded-xl border border-border-light p-4 mb-3 hover:shadow-sm transition-shadow"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {hasChildren ? (
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 text-charcoal-muted hover:text-charcoal rounded"
              >
                {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            ) : (
              <div className="w-7" />
            )}
            <div className="w-9 h-9 rounded-full bg-purple-soft flex items-center justify-center">
              <User size={16} className="text-purple-brand" />
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">{agent.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-charcoal-faint font-mono">{agent.id}</span>
                <span className="text-[11px] px-1.5 py-0.5 bg-canvas-subtle rounded text-charcoal-muted">{agent.role}</span>
              </div>
            </div>
          </div>
          {depth === 0 && (
            <Award size={16} className="text-amber-stat" />
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 ml-10">
          <div className="flex items-center gap-2">
            <Users size={13} className="text-charcoal-faint" />
            <div>
              <p className="text-xs text-charcoal-faint">Referrals</p>
              <p className="text-sm font-semibold text-charcoal">{agent.referrals}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={13} className="text-charcoal-faint" />
            <div>
              <p className="text-xs text-charcoal-faint">Sales</p>
              <p className="text-sm font-semibold text-charcoal">{agent.totalSales}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={13} className="text-green-stat" />
            <div>
              <p className="text-xs text-charcoal-faint">Commission</p>
              <p className="text-sm font-semibold text-green-stat">{agent.commission}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {hasChildren && expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
        >
          {agent.children!.map((child) => (
            <AgentNode key={child.id} agent={child} depth={depth + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function AgentTree() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-charcoal">Agent Referral Tree</h2>
        <p className="text-sm text-charcoal-muted">Multi-level agent network and commission tracking</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-canvas rounded-xl border border-border-light p-5">
          <p className="text-xs text-charcoal-muted mb-1">Total Agents</p>
          <p className="text-2xl font-semibold text-charcoal">42</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-canvas rounded-xl border border-border-light p-5">
          <p className="text-xs text-charcoal-muted mb-1">Total Referral Sales</p>
          <p className="text-2xl font-semibold text-charcoal">₦118.4M</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-canvas rounded-xl border border-border-light p-5">
          <p className="text-xs text-charcoal-muted mb-1">Commissions Paid</p>
          <p className="text-2xl font-semibold text-green-stat">₦5.93M</p>
        </motion.div>
      </div>

      <div className="space-y-3">
        {agentData.map((agent) => (
          <AgentNode key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
