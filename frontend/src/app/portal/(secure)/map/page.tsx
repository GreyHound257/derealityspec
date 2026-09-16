"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type PlotStatus = "available" | "reserved" | "pending" | "sold";

interface Plot {
  id: string;
  plot_number: string;
  svg_id: string;
  rate_per_sqm: number;
  total_price: number;
  status: PlotStatus;
}

export default function MapPage() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchPlots = async () => {
    try {
      const data = await apiFetch("/plots/");
      setPlots(data);
    } catch (error) {
      console.error("Failed to fetch plots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlots();

    // Fallback polling for status updates (since WebSockets are deferred)
    const interval = setInterval(fetchPlots, 10000);
    return () => clearInterval(interval);
  }, []);

  const getFillColor = (svgId: string) => {
    const plot = plots.find((p) => p.svg_id === svgId);
    if (!plot) return "#e2e8f0"; // Default slate-200 if not found

    switch (plot.status) {
      case "available":
        return "#22c55e"; // Green-500
      case "reserved":
      case "pending":
        return "#eab308"; // Yellow-500
      case "sold":
        return "#ef4444"; // Red-500
      default:
        return "#e2e8f0";
    }
  };

  const handlePlotClick = (svgId: string) => {
    const plot = plots.find((p) => p.svg_id === svgId);
    if (plot) {
      setSelectedPlot(plot);
    }
  };

  const updateStatus = async (newStatus: PlotStatus) => {
    if (!selectedPlot) return;
    setUpdating(true);
    try {
      await apiFetch(`/plots/${selectedPlot.id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      // Refresh plot data
      await fetchPlots();

      // Update modal data
      setSelectedPlot((prev) => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-serif text-slate-900">Interactive Map</h1>
        <p className="text-slate-500 font-sans mt-1">Prototype Estate Master Plan</p>
      </div>

      <div className="relative border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-sm flex items-center justify-center p-8">
        {loading ? (
          <div className="py-24 text-slate-400">Loading master plan...</div>
        ) : (
          <svg viewBox="0 0 1000 600" className="w-full h-auto max-w-4xl cursor-pointer drop-shadow-md">
            {/* Dummy Map Polygons */}
            <g stroke="#ffffff" strokeWidth="3">
              <polygon
                id="plot-A1"
                points="100,100 300,100 300,300 100,300"
                fill={getFillColor("plot-A1")}
                onClick={() => handlePlotClick("plot-A1")}
                className="transition-colors duration-300 hover:opacity-80"
              />
              <polygon
                id="plot-A2"
                points="310,100 510,100 510,300 310,300"
                fill={getFillColor("plot-A2")}
                onClick={() => handlePlotClick("plot-A2")}
                className="transition-colors duration-300 hover:opacity-80"
              />
              <polygon
                id="plot-A3"
                points="520,100 720,100 720,300 520,300"
                fill={getFillColor("plot-A3")}
                onClick={() => handlePlotClick("plot-A3")}
                className="transition-colors duration-300 hover:opacity-80"
              />
              <polygon
                id="plot-A4"
                points="100,310 300,310 300,510 100,510"
                fill={getFillColor("plot-A4")}
                onClick={() => handlePlotClick("plot-A4")}
                className="transition-colors duration-300 hover:opacity-80"
              />
              <polygon
                id="plot-A5"
                points="310,310 720,310 720,510 310,510"
                fill={getFillColor("plot-A5")}
                onClick={() => handlePlotClick("plot-A5")}
                className="transition-colors duration-300 hover:opacity-80"
              />
            </g>

            {/* Labels overlay */}
            <g fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle" className="pointer-events-none">
              <text x="200" y="210">A1</text>
              <text x="410" y="210">A2</text>
              <text x="620" y="210">A3</text>
              <text x="200" y="420">A4</text>
              <text x="515" y="420">A5</text>
            </g>
          </svg>
        )}
      </div>

      {/* Modal */}
      {selectedPlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Plot {selectedPlot.plot_number}
              </h2>
              <button
                onClick={() => setSelectedPlot(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-sans text-sm mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold uppercase text-xs px-2 py-1 rounded bg-slate-100">
                  {selectedPlot.status}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Rate per SQM</span>
                <span className="font-semibold">₦{selectedPlot.rate_per_sqm.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-slate-500">Total Price</span>
                <span className="font-bold text-lg text-slate-900">₦{selectedPlot.total_price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                disabled={updating || selectedPlot.status === 'reserved'}
                onClick={() => updateStatus("reserved")}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-medium transition-colors disabled:opacity-50"
              >
                Reserve Plot
              </button>
              <button
                disabled={updating || selectedPlot.status === 'available'}
                onClick={() => updateStatus("available")}
                className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
              >
                Revoke Plot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
