"use client";
import { motion } from 'framer-motion';
import { MapPin, Layers, BarChart3, Users } from 'lucide-react';

const metrics = [
  { icon: BarChart3, label: 'Total Land Bank Area', value: '12,500', unit: 'SQM', color: 'text-purple-brand' },
  { icon: Layers, label: 'Active Phases', value: '4', unit: 'Phases', color: 'text-blue-stat' },
  { icon: MapPin, label: 'Prime Locations', value: '7', unit: 'Estates', color: 'text-green-stat' },
  { icon: Users, label: 'Registered Investors', value: '1,240+', unit: '', color: 'text-amber-stat' },
];

export default function MetricsStrip() {
  return (
    <section className="relative z-20 -mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-canvas rounded-xl border border-border-light shadow-xl shadow-charcoal/5 p-1"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-center gap-4 p-6 ${
                  i < metrics.length - 1 ? 'lg:border-r border-border-faint' : ''
                } ${i < 2 ? 'border-b lg:border-b-0 border-border-faint' : ''}`}
              >
                <div className={`p-2.5 rounded-lg bg-border-faint ${metric.color}`}>
                  <metric.icon size={20} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-semibold text-charcoal tracking-tight">{metric.value}</span>
                    {metric.unit && (
                      <span className="text-xs font-medium text-charcoal-faint uppercase tracking-wider">{metric.unit}</span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal-muted mt-0.5">{metric.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
