"use client";

import React, { useState } from 'react';

// Define the valid statuses based on requirements
export type PlotStatus = 'Available' | 'Reserved' | 'Sold' | 'Pending Verification' | 'Revoked';

export interface PlotData {
  svg_id: string;
  status: PlotStatus;
  plot_number?: string;
  block_name?: string;
}

interface InteractiveMapProps {
  plots: PlotData[];
  onPlotClick?: (plotId: string) => void;
}

export default function InteractiveMap({ plots, onPlotClick }: InteractiveMapProps) {
  const [hoveredPlot, setHoveredPlot] = useState<string | null>(null);

  // Helper to determine fill color based on status
  const getFillColor = (status: PlotStatus) => {
    switch (status) {
      case 'Available': return 'rgba(34, 197, 94, 0.5)'; // Translucent Green
      case 'Reserved': return 'rgba(234, 179, 8, 0.5)'; // Translucent Yellow
      case 'Sold': return 'rgba(239, 68, 68, 0.5)'; // Translucent Red
      case 'Pending Verification': return 'rgba(249, 115, 22, 0.5)'; // Orange/Yellowish
      case 'Revoked': return 'rgba(156, 163, 175, 0.5)'; // Grey
      default: return 'transparent';
    }
  };

  // Helper to find a plot's data by its svg_id
  const getPlotData = (svg_id: string) => plots.find(p => p.svg_id === svg_id);

  const handleInteraction = (svg_id: string) => {
    if (onPlotClick) {
      onPlotClick(svg_id);
    }
  };

  // A mock SVG structure. In reality, this would be the complex injected SVG.
  return (
    <div className="relative w-full max-w-4xl mx-auto border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden p-4">
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Background / Base Map elements could go here */}
        <rect width="100%" height="100%" fill="#f8fafc" />

        <text x="20" y="40" className="font-serif text-2xl fill-brand-primary">Estate Master Plan</text>

        {/* Mock Plot 1 */}
        <g
            id="block-A-plot-1"
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleInteraction("block-A-plot-1")}
            onMouseEnter={() => setHoveredPlot("block-A-plot-1")}
            onMouseLeave={() => setHoveredPlot(null)}
        >
          <path
            d="M 100 100 L 300 100 L 300 250 L 100 250 Z"
            fill={getFillColor(getPlotData("block-A-plot-1")?.status || 'Available')}
            stroke={hoveredPlot === "block-A-plot-1" ? "#0F172A" : "#cbd5e1"}
            strokeWidth={hoveredPlot === "block-A-plot-1" ? "3" : "1"}
          />
          <text x="200" y="180" textAnchor="middle" className="text-sm font-sans fill-gray-800 pointer-events-none">Block A - Plot 1</text>
        </g>

        {/* Mock Plot 2 */}
        <g
            id="block-A-plot-2"
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleInteraction("block-A-plot-2")}
            onMouseEnter={() => setHoveredPlot("block-A-plot-2")}
            onMouseLeave={() => setHoveredPlot(null)}
        >
          <path
            d="M 350 100 L 550 100 L 550 250 L 350 250 Z"
             fill={getFillColor(getPlotData("block-A-plot-2")?.status || 'Available')}
            stroke={hoveredPlot === "block-A-plot-2" ? "#0F172A" : "#cbd5e1"}
            strokeWidth={hoveredPlot === "block-A-plot-2" ? "3" : "1"}
          />
           <text x="450" y="180" textAnchor="middle" className="text-sm font-sans fill-gray-800 pointer-events-none">Block A - Plot 2</text>
        </g>

        {/* Mock Plot 3 */}
        <g
            id="block-B-plot-1"
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleInteraction("block-B-plot-1")}
            onMouseEnter={() => setHoveredPlot("block-B-plot-1")}
            onMouseLeave={() => setHoveredPlot(null)}
        >
          <path
            d="M 100 300 L 400 300 L 400 500 L 100 500 Z"
            fill={getFillColor(getPlotData("block-B-plot-1")?.status || 'Available')}
            stroke={hoveredPlot === "block-B-plot-1" ? "#0F172A" : "#cbd5e1"}
            strokeWidth={hoveredPlot === "block-B-plot-1" ? "3" : "1"}
          />
           <text x="250" y="400" textAnchor="middle" className="text-sm font-sans fill-gray-800 pointer-events-none">Block B - Plot 1</text>
        </g>

      </svg>

      {/* Simple Legend */}
      <div className="absolute bottom-6 right-6 bg-white p-3 rounded shadow-md border border-gray-100 flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[rgba(34,197,94,0.5)]"></div> Available</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[rgba(234,179,8,0.5)]"></div> Reserved</div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[rgba(239,68,68,0.5)]"></div> Sold</div>
      </div>
    </div>
  );
}
