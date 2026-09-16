import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        "canvas-subtle": "#FAFAFA",
        "border-light": "#E5E7EB",
        "border-faint": "#F3F4F6",
        charcoal: "#2c2c2c",
        "charcoal-muted": "#6B7280",
        "charcoal-faint": "#9CA3AF",
        // Deep Blue & Red Corporate Theme overrides
        "purple-brand": "#003366", // Deep Blue
        "purple-deep": "#002244",
        "purple-soft": "#E6F0FA",
        "green-stat": "#16A34A",
        "amber-stat": "#D97706",
        "red-stat": "#CC0000", // Corporate Red
        "blue-stat": "#2563EB",
      },
      fontFamily: {
        display: ["var(--font-dm-serif)"],
        body: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
};
export default config;
