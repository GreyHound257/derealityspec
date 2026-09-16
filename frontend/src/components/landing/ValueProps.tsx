"use client";
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, TrendingUp, Landmark, Handshake, MapPinned } from 'lucide-react';

const props = [
  { icon: ShieldCheck, title: 'Verified Titles', desc: 'Every plot comes with government-approved survey plans and clear title documentation.' },
  { icon: FileText, title: 'Transparent Process', desc: 'Full visibility into allocation, payments, and documentation at every stage.' },
  { icon: TrendingUp, title: 'Value Appreciation', desc: 'Strategically located estates positioned for consistent long-term capital growth.' },
  { icon: Landmark, title: 'Infrastructure', desc: 'Estates developed with road networks, perimeter fencing, and gated access.' },
  { icon: Handshake, title: 'Flexible Payments', desc: 'Structured installment plans designed to fit diverse investment budgets.' },
  { icon: MapPinned, title: 'Prime Locations', desc: 'Properties in high-growth corridors with proximity to key developments.' },
];

export default function ValueProps() {
  return (
    <section id="about" className="py-24 bg-canvas-subtle border-y border-border-faint">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-brand mb-3">Why De Reality Spec</p>
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">Built on Trust & Transparency</h2>
          <p className="text-charcoal-muted font-light max-w-lg mx-auto leading-relaxed">
            We bring institutional-grade land banking to individual investors with complete
            documentation and verified processes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {props.map((prop, i) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-canvas p-6 rounded-xl border border-border-light hover:border-purple-brand/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-soft flex items-center justify-center mb-4">
                <prop.icon size={20} className="text-purple-brand" />
              </div>
              <h3 className="text-base font-semibold text-charcoal mb-2">{prop.title}</h3>
              <p className="text-sm text-charcoal-muted font-light leading-relaxed">{prop.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
