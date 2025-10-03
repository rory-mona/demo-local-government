import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ls: {
          green: "#2CA058",
          greenDark: "#1F7F45",
          greenSoft: "#E6F3EB",
          text: "#1A1A1A",
          sub: "#4B5563",
          cardTop: "#3AA963",
          cardBottom: "#116C3A",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Helvetica', 'Arial'],
      },
      boxShadow: {
        frame: "0 1px 0 rgba(0,0,0,.08), 0 12px 24px rgba(0,0,0,.08)",
        cardHeavy: "0 10px 24px rgba(0,0,0,.25)",
      },
      backgroundImage: {
        hatch:
          "repeating-linear-gradient(45deg, rgba(0,0,0,0.035) 0 2px, rgba(255,255,255,0.035) 2px 4px)",
        glassGrad:
          "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(0,0,0,0.06))",
        cardGrad:
          "linear-gradient(180deg, var(--cardTop), var(--cardBottom))",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
