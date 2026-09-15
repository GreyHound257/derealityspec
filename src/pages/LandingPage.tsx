"use client";
import { motion } from 'framer-motion';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import MetricsStrip from '../components/landing/MetricsStrip';
import EstateShowcase from '../components/landing/EstateShowcase';
import ValueProps from '../components/landing/ValueProps';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-canvas"
    >
      <Header />
      <Hero />
      <MetricsStrip />
      <EstateShowcase />
      <ValueProps />
      <CTASection />
      <Footer />
    </motion.div>
  );
}
