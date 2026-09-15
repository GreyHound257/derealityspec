"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';

const navLinks = [
  { label: 'Estates', href: '#estates' },
  { label: 'About', href: '#about' },
  { label: 'Investment', href: '#investment' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo-mark.png" alt="DRS" className="w-8 h-8 object-contain" />
            <div className="leading-none">
              <span className="font-display text-lg tracking-tight text-charcoal">De Reality Spec</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-charcoal-muted hover:text-charcoal transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Portal Login */}
          <div className="flex items-center gap-4">
            <Link href="/portal"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-canvas bg-purple-brand hover:bg-purple-deep rounded-md transition-colors duration-200 shadow-sm"
            >
              <LogIn size={15} />
              Portal Login
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-charcoal-muted hover:text-charcoal"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border-light bg-canvas overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-charcoal-muted hover:text-charcoal py-1"
                >
                  {link.label}
                </a>
              ))}
              <Link href="/portal"
                className="sm:hidden inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-canvas bg-purple-brand rounded-md mt-2"
              >
                <LogIn size={15} />
                Portal Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

