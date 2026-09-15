import React from 'react';
import '../globals.css';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900 min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-brand-primary text-white flex flex-col hidden md:flex">
          <div className="p-6 border-b border-gray-700">
            <h1 className="font-serif text-xl font-bold">REMS Portal</h1>
          </div>
          <nav className="flex-grow p-4 space-y-2">
            <a href="/portal/dashboard" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Dashboard</a>
            <a href="/portal/map" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Inventory Map</a>
            <a href="/portal/finance" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Financials</a>
            <a href="/portal/agents" className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors">Agents</a>
          </nav>
          <div className="p-4 border-t border-gray-700">
             <button className="w-full text-left px-4 py-2 text-action-urgent hover:bg-gray-800 rounded transition-colors">
                Logout
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Utility Header */}
          <header className="bg-canvas border-b border-gray-200 h-16 flex items-center justify-between px-6">
            <div className="flex items-center">
              {/* Mobile menu button could go here */}
              <h2 className="font-serif text-lg font-medium text-brand-primary">Portal Overview</h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Welcome, Admin</span>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div> {/* Avatar Placeholder */}
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
