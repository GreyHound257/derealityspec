"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

type PlotStatus = 'available' | 'reserved' | 'sold';

interface Plot {
  id: string;
  row: number;
  col: number;
  status: PlotStatus;
  size: string;
  buyer?: string;
}

const generatePlots = (): Plot[] => {
  const plots: Plot[] = [];
  const rows = 8;
  const cols = 12;
  const soldIndices = new Set([0,1,2,5,6,8,9,10,13,14,16,17,20,21,24,25,26,29,30,32,33,34,35,40,41,42,48,49,50,56,57,64,65,72,73,80,81,88,89]);
  const reservedIndices = new Set([3,7,11,15,19,23,27,31,36,44,52,60,68,76,84,92]);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      let status: PlotStatus = 'available';
      if (soldIndices.has(idx)) status = 'sold';
      else if (reservedIndices.has(idx)) status = 'reserved';
      plots.push({
        id: `RG-${String(idx + 1).padStart(3, '0')}`,
        row: r,
        col: c,
        status,
        size: '500 SQM',
        buyer: status === 'sold' ? 'Client Allocated' : status === 'reserved' ? 'Pending Confirmation' : undefined,
      });
    }
  }
  return plots;
};

const statusConfig = {
  available: { color: '#16A34A', label: 'Available', bg: 'bg-green-stat/10', text: 'text-green-stat' },
  reserved: { color: '#D97706', label: 'Reserved', bg: 'bg-amber-stat/10', text: 'text-amber-stat' },
  sold: { color: '#DC2626', label: 'Sold', bg: 'bg-red-stat/10', text: 'text-red-stat' },
};

export default function PlotTracker() {
  const [plots] = useState<Plot[]>(generatePlots);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [filter, setFilter] = useState<PlotStatus | 'all'>('all');
  const [zoom, setZoom] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlots = plots.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (searchQuery && !p.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const counts = {
    available: plots.filter(p => p.status === 'available').length,
    reserved: plots.filter(p => p.status === 'reserved').length,
    sold: plots.filter(p => p.status === 'sold').length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-charcoal">Visual Plot Tracker</h2>
          <p className="text-sm text-charcoal-muted">Royal Gardens Estate — Phase 2</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-faint" />
            <input
              type="text"
              placeholder="Search plot ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 text-sm border border-border-light rounded-lg bg-canvas focus:outline-none focus:border-purple-brand/40 w-44"
            />
          </div>
          <div className="flex items-center gap-1 bg-canvas border border-border-light rounded-lg p-0.5">
            {(['all', 'available', 'reserved', 'sold'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  filter === f
                    ? 'bg-charcoal text-canvas'
                    : 'text-charcoal-muted hover:text-charcoal'
                }`}
              >
                {f === 'all' ? 'All' : statusConfig[f].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Chips */}
      <div className="grid grid-cols-3 gap-4">
        {(Object.entries(counts) as [PlotStatus, number][]).map(([status, count]) => (
          <div key={status} className={`flex items-center justify-between p-4 rounded-xl border border-border-light bg-canvas`}>
            <div>
              <p className={`text-2xl font-semibold ${statusConfig[status].text}`}>{count}</p>
              <p className="text-xs text-charcoal-muted mt-0.5">{statusConfig[status].label} Plots</p>
            </div>
            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: statusConfig[status].color, opacity: 0.6 }} />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* SVG Map */}
        <div className="lg:col-span-3 bg-canvas rounded-xl border border-border-light">
          <div className="px-5 py-4 border-b border-border-faint flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">Interactive Parcel Map</h3>
            <div className="flex items-center gap-1">
              <button onClick={() => setZoom(Math.min(zoom + 0.2, 2))} className="p-1.5 text-charcoal-muted hover:text-charcoal rounded-md hover:bg-canvas-subtle">
                <ZoomIn size={16} />
              </button>
              <button onClick={() => setZoom(Math.max(zoom - 0.2, 0.6))} className="p-1.5 text-charcoal-muted hover:text-charcoal rounded-md hover:bg-canvas-subtle">
                <ZoomOut size={16} />
              </button>
              <button onClick={() => setZoom(1)} className="p-1.5 text-charcoal-muted hover:text-charcoal rounded-md hover:bg-canvas-subtle">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
          <div className="p-5 overflow-auto">
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', transition: 'transform 0.2s' }}>
              <svg viewBox="0 0 520 350" className="w-full h-auto min-w-[500px]">
                {/* Road labels */}
                <text x="260" y="16" textAnchor="middle" className="fill-charcoal-faint text-[8px] uppercase tracking-widest">Main Access Road</text>
                <line x1="20" y1="22" x2="500" y2="22" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4,4" />
                
                {filteredPlots.map((plot) => {
                  const cfg = statusConfig[plot.status];
                  const x = plot.col * 40 + 12;
                  const y = plot.row * 38 + 32;
                  const isSelected = selectedPlot?.id === plot.id;
                  return (
                    <g key={plot.id} onClick={() => setSelectedPlot(plot)} className="cursor-pointer">
                      <rect
                        x={x}
                        y={y}
                        width={36}
                        height={34}
                        rx={4}
                        fill={cfg.color}
                        fillOpacity={isSelected ? 0.5 : 0.15}
                        stroke={isSelected ? cfg.color : cfg.color}
                        strokeWidth={isSelected ? 2 : 0.8}
                        strokeOpacity={isSelected ? 1 : 0.4}
                        className="hover:fill-opacity-35 transition-all duration-150"
                      />
                      <text
                        x={x + 18}
                        y={y + 20}
                        textAnchor="middle"
                        className="text-[6px] fill-charcoal-muted pointer-events-none select-none"
                      >
                        {plot.id.split('-')[1]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
          {/* Legend */}
          <div className="px-5 py-3 border-t border-border-faint flex items-center gap-5">
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: cfg.color, opacity: 0.3 }} />
                <span className="text-[11px] text-charcoal-muted">{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plot Detail Panel */}
        <div className="bg-canvas rounded-xl border border-border-light">
          <div className="px-5 py-4 border-b border-border-faint">
            <h3 className="text-sm font-semibold text-charcoal">Plot Details</h3>
          </div>
          <div className="p-5">
            {selectedPlot ? (
              <motion.div
                key={selectedPlot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="text-center p-4 bg-canvas-subtle rounded-lg border border-border-faint">
                  <p className="text-lg font-semibold text-charcoal">{selectedPlot.id}</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium mt-1 ${statusConfig[selectedPlot.status].bg} ${statusConfig[selectedPlot.status].text}`}>
                    {statusConfig[selectedPlot.status].label}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-muted">Size</span>
                    <span className="font-medium text-charcoal">{selectedPlot.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-muted">Row</span>
                    <span className="font-medium text-charcoal">{selectedPlot.row + 1}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal-muted">Column</span>
                    <span className="font-medium text-charcoal">{selectedPlot.col + 1}</span>
                  </div>
                  {selectedPlot.buyer && (
                    <div className="flex justify-between text-sm">
                      <span className="text-charcoal-muted">Status Note</span>
                      <span className="font-medium text-charcoal text-right">{selectedPlot.buyer}</span>
                    </div>
                  )}
                </div>
                {selectedPlot.status === 'available' && (
                  <button className="w-full py-2.5 bg-purple-brand hover:bg-purple-deep text-canvas text-sm font-medium rounded-lg transition-colors">
                    Reserve Plot
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-10">
                <Filter size={24} className="mx-auto text-charcoal-faint mb-3" />
                <p className="text-sm text-charcoal-muted">Click a plot on the map to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
