import React from 'react';
import '../globals.css'; // Assuming global styles are here

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-canvas text-brand-primary min-h-screen flex flex-col">
        <header className="bg-canvas border-b border-gray-200 py-4 px-8 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="font-serif text-2xl font-bold">De Reality Spec</h1>
            <nav className="space-x-6">
              <a href="#estates" className="hover:text-action-urgent transition-colors">Estates</a>
              <a href="#about" className="hover:text-action-urgent transition-colors">About</a>
              <a href="/portal" className="text-action-urgent font-medium border border-action-urgent px-4 py-2 rounded hover:bg-action-urgent hover:text-white transition-colors">Login / Portal</a>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="bg-brand-primary text-white py-12 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
             <div>
                <h2 className="font-serif text-xl mb-4">De Reality Spec</h2>
                <p className="text-sm opacity-80">Building the future of luxury real estate.</p>
             </div>
             <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm opacity-80">
                   <li><a href="#" className="hover:underline">Terms of Service</a></li>
                   <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                </ul>
             </div>
             <div>
                <h3 className="font-bold mb-4">Contact</h3>
                <p className="text-sm opacity-80">contact@derealityspec.com</p>
             </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
