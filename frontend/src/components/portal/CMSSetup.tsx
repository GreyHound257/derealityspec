"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Image, FileText, Bell, Shield, Plus, Trash2 } from 'lucide-react';

const tabs = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'media', label: 'Media', icon: Image },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function CMSSetup() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-charcoal">CMS Setup</h2>
          <p className="text-sm text-charcoal-muted">Configure website content and system settings</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-purple-brand hover:bg-purple-deep text-canvas rounded-lg transition-colors">
          <Save size={14} />
          Save Changes
        </button>
      </div>

      <div className="flex gap-6">
        <div className="hidden md:block w-48 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-soft text-purple-brand font-medium'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-canvas-subtle'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:hidden flex gap-1 overflow-x-auto pb-2 mb-4 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-soft text-purple-brand'
                  : 'text-charcoal-muted bg-canvas-subtle'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 bg-canvas rounded-xl border border-border-light"
        >
          {activeTab === 'general' && (
            <div>
              <div className="px-6 py-4 border-b border-border-faint">
                <h3 className="text-sm font-semibold text-charcoal">General Settings</h3>
                <p className="text-xs text-charcoal-muted mt-0.5">Configure basic site information</p>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1.5">Company Name</label>
                  <input type="text" defaultValue="De Reality Spec" className="w-full px-3 py-2.5 text-sm border border-border-light rounded-lg bg-canvas focus:outline-none focus:border-purple-brand/40" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1.5">Tagline</label>
                  <input type="text" defaultValue="Premium Land Banking & Real Estate Development" className="w-full px-3 py-2.5 text-sm border border-border-light rounded-lg bg-canvas focus:outline-none focus:border-purple-brand/40" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal mb-1.5">Contact Email</label>
                    <input type="email" defaultValue="invest@derealityspec.com" className="w-full px-3 py-2.5 text-sm border border-border-light rounded-lg bg-canvas focus:outline-none focus:border-purple-brand/40" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal mb-1.5">Phone Number</label>
                    <input type="tel" defaultValue="+234 801 234 5678" className="w-full px-3 py-2.5 text-sm border border-border-light rounded-lg bg-canvas focus:outline-none focus:border-purple-brand/40" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1.5">Office Address</label>
                  <textarea rows={3} defaultValue="14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria" className="w-full px-3 py-2.5 text-sm border border-border-light rounded-lg bg-canvas focus:outline-none focus:border-purple-brand/40 resize-none" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <div className="px-6 py-4 border-b border-border-faint flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-charcoal">Content Pages</h3>
                  <p className="text-xs text-charcoal-muted mt-0.5">Manage website pages and sections</p>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-purple-brand text-canvas rounded-md">
                  <Plus size={13} />
                  Add Page
                </button>
              </div>
              <div className="divide-y divide-border-faint">
                {['Home Page', 'About Us', 'FAQs', 'Terms of Service', 'Privacy Policy'].map((page) => (
                  <div key={page} className="px-6 py-4 flex items-center justify-between hover:bg-canvas-subtle transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-charcoal-faint" />
                      <div>
                        <p className="text-sm font-medium text-charcoal">{page}</p>
                        <p className="text-[11px] text-charcoal-faint">Last edited: Sep 1, 2026</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-2.5 py-1 text-xs font-medium text-purple-brand hover:bg-purple-soft rounded-md transition-colors">Edit</button>
                      <button className="p-1 text-charcoal-faint hover:text-red-stat transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div>
              <div className="px-6 py-4 border-b border-border-faint">
                <h3 className="text-sm font-semibold text-charcoal">Media Library</h3>
                <p className="text-xs text-charcoal-muted mt-0.5">Manage images and documents</p>
              </div>
              <div className="p-6">
                <div className="border-2 border-dashed border-border-light rounded-xl p-10 text-center">
                  <Image size={32} className="mx-auto text-charcoal-faint mb-3" />
                  <p className="text-sm text-charcoal-muted mb-1">Drag and drop files here</p>
                  <p className="text-xs text-charcoal-faint mb-4">PNG, JPG, PDF up to 10MB</p>
                  <button className="px-4 py-2 text-sm font-medium border border-border-light rounded-lg text-charcoal hover:bg-canvas-subtle transition-colors">
                    Browse Files
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <div className="px-6 py-4 border-b border-border-faint">
                <h3 className="text-sm font-semibold text-charcoal">Notification Settings</h3>
                <p className="text-xs text-charcoal-muted mt-0.5">Configure SMS and email notifications</p>
              </div>
              <div className="p-6 space-y-5">
                {[
                  { label: 'New Sale Notification', desc: 'Send SMS when a new sale is recorded', enabled: true },
                  { label: 'Payment Reminder', desc: 'Auto-send payment reminders for installments', enabled: true },
                  { label: 'Agent Commission Alert', desc: 'Notify agents when commission is credited', enabled: false },
                  { label: 'Low SMS Balance Warning', desc: 'Alert when SMS balance falls below 100', enabled: true },
                ].map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between p-4 bg-canvas-subtle rounded-lg border border-border-faint">
                    <div>
                      <p className="text-sm font-medium text-charcoal">{setting.label}</p>
                      <p className="text-xs text-charcoal-muted mt-0.5">{setting.desc}</p>
                    </div>
                    <button className={`relative w-10 h-5.5 rounded-full transition-colors ${
                      setting.enabled ? 'bg-purple-brand' : 'bg-border-light'
                    }`}>
                      <span className={`absolute top-0.5 w-4.5 h-4.5 bg-canvas rounded-full shadow-sm transition-transform ${
                        setting.enabled ? 'left-5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <div className="px-6 py-4 border-b border-border-faint">
                <h3 className="text-sm font-semibold text-charcoal">Security Settings</h3>
                <p className="text-xs text-charcoal-muted mt-0.5">Manage access and authentication</p>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1.5">Session Timeout (minutes)</label>
                  <input type="number" defaultValue={30} className="w-32 px-3 py-2.5 text-sm border border-border-light rounded-lg bg-canvas focus:outline-none focus:border-purple-brand/40" />
                </div>
                <div className="flex items-center justify-between p-4 bg-canvas-subtle rounded-lg border border-border-faint">
                  <div>
                    <p className="text-sm font-medium text-charcoal">Two-Factor Authentication</p>
                    <p className="text-xs text-charcoal-muted mt-0.5">Require 2FA for all admin accounts</p>
                  </div>
                  <button className="relative w-10 h-5.5 rounded-full bg-purple-brand transition-colors">
                    <span className="absolute top-0.5 left-5 w-4.5 h-4.5 bg-canvas rounded-full shadow-sm" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-canvas-subtle rounded-lg border border-border-faint">
                  <div>
                    <p className="text-sm font-medium text-charcoal">IP Whitelisting</p>
                    <p className="text-xs text-charcoal-muted mt-0.5">Restrict portal access to specific IPs</p>
                  </div>
                  <button className="relative w-10 h-5.5 rounded-full bg-border-light transition-colors">
                    <span className="absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-canvas rounded-full shadow-sm" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
