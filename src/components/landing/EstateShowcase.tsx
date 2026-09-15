"use client";
import { motion } from 'framer-motion';
import { MapPin, Maximize2, Tag, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const estates = [
  {
    name: 'Royal Gardens Estate',
    location: 'Ibeju-Lekki, Lagos',
    plotSize: '500 SQM',
    price: '₦8,500,000',
    phase: 'Phase 2',
    status: 'Selling',
    available: 42,
    total: 120,
    image: '/images/estate-showcase.jpg',
    features: ['Gated Community', 'Perimeter Fencing', 'Survey-Backed', 'Road Network'],
  },
  {
    name: 'Emerald City Estate',
    location: 'Epe, Lagos',
    plotSize: '500 SQM',
    price: '₦5,200,000',
    phase: 'Phase 1',
    status: 'Selling',
    available: 78,
    total: 200,
    image: '/images/hero-estate.jpg',
    features: ['Government Allocation', 'Dry Land', 'Accessible', 'Near Expressway'],
  },
];

export default function EstateShowcase() {
  return (
    <section id="estates" className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-brand mb-3">Featured Estates</p>
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal mb-4">Premium Land Opportunities</h2>
          <p className="text-charcoal-muted font-light max-w-xl leading-relaxed">
            Explore our curated selection of verified estates with clear title documentation
            and strategic positioning for long-term value appreciation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {estates.map((estate, i) => (
            <motion.div
              key={estate.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-canvas rounded-xl border border-border-light overflow-hidden hover:shadow-lg hover:shadow-charcoal/5 transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={estate.image}
                  alt={estate.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 text-xs font-medium bg-canvas/95 backdrop-blur-sm rounded-md text-charcoal">
                    {estate.phase}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium bg-green-stat/90 text-canvas rounded-md">
                    {estate.status}
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-canvas/90 backdrop-blur-sm rounded-md hover:bg-canvas transition-colors">
                  <ArrowUpRight size={16} className="text-charcoal" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl text-charcoal mb-1">{estate.name}</h3>
                <div className="flex items-center gap-1.5 text-charcoal-muted mb-5">
                  <MapPin size={13} />
                  <span className="text-sm">{estate.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="p-3 bg-canvas-subtle rounded-lg border border-border-faint">
                    <div className="flex items-center gap-1.5 text-charcoal-faint mb-1">
                      <Maximize2 size={12} />
                      <span className="text-[11px] uppercase tracking-wider font-medium">Plot Size</span>
                    </div>
                    <p className="text-sm font-semibold text-charcoal">{estate.plotSize}</p>
                  </div>
                  <div className="p-3 bg-canvas-subtle rounded-lg border border-border-faint">
                    <div className="flex items-center gap-1.5 text-charcoal-faint mb-1">
                      <Tag size={12} />
                      <span className="text-[11px] uppercase tracking-wider font-medium">Starting At</span>
                    </div>
                    <p className="text-sm font-semibold text-purple-brand">{estate.price}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {estate.features.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 text-xs text-charcoal-muted">
                      <CheckCircle2 size={11} className="text-green-stat" />
                      {f}
                    </span>
                  ))}
                </div>

                {/* Availability Bar */}
                <div className="pt-4 border-t border-border-faint">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-charcoal-muted">{estate.available} of {estate.total} plots available</span>
                    <span className="text-xs font-medium text-charcoal">{Math.round((estate.available / estate.total) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-border-faint rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(estate.available / estate.total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-purple-brand rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
