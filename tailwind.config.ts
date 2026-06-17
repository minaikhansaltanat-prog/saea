import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: "#eef2f7",
          100: "#d7e1ec",
          200: "#b0c3d9",
          300: "#88a5c6",
          400: "#4f739c",
          500: "#1f4068",
          600: "#143257",
          700: "#0f2a4a",
          800: "#0A2342",
          900: "#071a33",
          950: "#040f1f",
        },
        gold: {
          50: "#fbf7ec",
          100: "#f5ecd2",
          200: "#ead8a3",
          300: "#ddc173",
          400: "#d3b15a",
          500: "#C8A84B",
          600: "#b08f3a",
          700: "#8c6f2e",
          800: "#6b5523",
          900: "#4a3b18",
        },
        teal: {
          50: "#eaf5f5",
          100: "#cfe7e7",
          200: "#a0cfcf",
          300: "#6fb6b6",
          400: "#459d9d",
          500: "#1A6B6B",
          600: "#155656",
          700: "#114444",
          800: "#0d3434",
          900: "#082323",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        kkarab: ["var(--font-kkarab)", "serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(10,35,66,0.10)",
        card: "0 8px 30px -8px rgba(10,35,66,0.16)",
        gold: "0 8px 24px -6px rgba(200,168,75,0.45)",
        glass: "0 8px 32px 0 rgba(10,35,66,0.18)",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #0A2342 0%, #143257 55%, #1A6B6B 100%)",
        "gold-gradient": "linear-gradient(135deg, #ead8a3 0%, #C8A84B 55%, #8c6f2e 100%)",
        "hero-overlay": "linear-gradient(180deg, rgba(7,26,51,0.55) 0%, rgba(10,35,66,0.82) 65%, rgba(10,35,66,0.96) 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.5)", opacity: "0" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        marquee: "marquee 30s linear infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.2,0.6,0.4,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
