import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        suraksha: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
          800: "#0c4a6e",
          900: "#082f49",
        },
        emergency: {
          red: "#ef4444",
          orange: "#f97316",
          yellow: "#eab308",
          green: "#22c55e",
        }
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'flash-border': 'flashBorder 1s infinite alternate',
      },
      keyframes: {
        flashBorder: {
          '0%': { borderColor: 'rgba(239, 68, 68, 0.3)', boxShadow: '0 0 0px rgba(239, 68, 68, 0)' },
          '100%': { borderColor: 'rgba(239, 68, 68, 1)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
