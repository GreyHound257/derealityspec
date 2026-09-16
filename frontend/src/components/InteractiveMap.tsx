"use client";

import React from 'react';

export type PlotStatus = 'available' | 'reserved' | 'sold';

export interface Plot {
  id: string;
  row: number;
  col: number;
  status: PlotStatus;
  size: string;
  buyer?: string;
}

export const generatePlots = (): Plot[] => {
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

export const statusConfig = {
  available: { color: '#16A34A', label: 'Available', bg: 'bg-green-stat/10', text: 'text-green-stat' },
  reserved: { color: '#D97706', label: 'Reserved', bg: 'bg-amber-stat/10', text: 'text-amber-stat' },
  sold: { color: '#CC0000', label: 'Sold', bg: 'bg-red-stat/10', text: 'text-red-stat' }, // Red-stat Corporate Red
};

interface MapProps {
    zoom: number;
    filteredPlots: Plot[];
    selectedPlot: Plot | null;
    onPlotSelect: (plot: Plot) => void;
}

export default function InteractiveMap({ zoom, filteredPlots, selectedPlot, onPlotSelect }: MapProps) {
    return (
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
                    <g key={plot.id} onClick={() => onPlotSelect(plot)} className="cursor-pointer">
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
    )
}
