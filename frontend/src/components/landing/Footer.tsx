import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border-light bg-canvas-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo-mark.png" alt="DRS" className="w-7 h-7 object-contain" />
              <span className="font-display text-base text-charcoal">De Reality Spec</span>
            </div>
            <p className="text-sm text-charcoal-muted font-light leading-relaxed">
              Premium land banking and real estate development across Nigeria's high-growth corridors.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Our Team', 'Careers', 'Press'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'FAQs', 'Blog', 'Support'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Disclaimer'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-charcoal-muted hover:text-charcoal transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border-faint flex flex-wrap justify-between items-center gap-4">
          <p className="text-xs text-charcoal-faint">© 2026 De Reality Spec. All rights reserved.</p>
          <Link href="/portal" className="text-xs text-charcoal-faint hover:text-purple-brand transition-colors">
            Staff Portal →
          </Link>
        </div>
      </div>
    </footer>
  );
}
