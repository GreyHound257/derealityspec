"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-16 overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-[85vh] min-h-[600px]">
        <img
          src="/images/hero-estate.jpg"
          alt="Premium Land Estate"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-canvas/10 backdrop-blur-sm border border-canvas/20 rounded-full mb-6">
                <Shield size={14} className="text-purple-soft" />
                <span className="text-xs font-medium text-canvas/90 tracking-wide uppercase">Verified Land Assets</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-canvas leading-[1.05] mb-6"
            >
              Secure Your
              <br />
              Land Today
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg text-canvas/75 font-light leading-relaxed mb-10 max-w-lg"
            >
              De Reality Spec offers premium land banking opportunities across
              strategically located estates. Invest in verified, survey-backed
              plots with transparent allocation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#estates"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-brand hover:bg-purple-deep text-canvas text-sm font-medium rounded-md transition-all duration-200 shadow-lg shadow-purple-brand/25"
              >
                Explore Estates
                <ArrowRight size={16} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-canvas/10 hover:bg-canvas/20 backdrop-blur-sm text-canvas text-sm font-medium rounded-md border border-canvas/20 transition-all duration-200"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
