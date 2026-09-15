"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="investment" className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-charcoal p-10 sm:p-16"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-brand/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-brand/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-brand mb-4">Start Investing</p>
            <h2 className="font-display text-3xl sm:text-4xl text-canvas mb-5 leading-tight">
              Ready to Secure Your Plot?
            </h2>
            <p className="text-canvas/60 font-light leading-relaxed mb-8 max-w-lg">
              Speak with our team to explore available plots, review documentation, and begin
              your land banking journey with De Reality Spec.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-brand hover:bg-purple-deep text-canvas text-sm font-medium rounded-md transition-colors duration-200"
              >
                Get Started
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-canvas/10 hover:bg-canvas/15 text-canvas text-sm font-medium rounded-md border border-canvas/10 transition-colors duration-200"
              >
                Request Brochure
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-canvas/10">
              <div className="flex items-center gap-2 text-canvas/50">
                <Phone size={14} />
                <span className="text-sm">+234 801 234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-canvas/50">
                <Mail size={14} />
                <span className="text-sm">invest@derealityspec.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
