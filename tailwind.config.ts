import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
    "./stories/**/*.{ts,tsx,mdx}",
    "./tests/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "glass-cinema": {
          DEFAULT: "var(--glass-cinema-primary)",
          primary: "var(--glass-cinema-primary)",
          secondary: "var(--glass-cinema-secondary)",
          accent: "var(--glass-cinema-accent)",
          surface: "var(--glass-cinema-surface)",
          elevated: "var(--glass-cinema-elevated)",
          backdrop: "var(--glass-cinema-backdrop)",
          outline: "var(--glass-cinema-border)",
          highlight: "var(--glass-cinema-highlight)",
          text: {
            DEFAULT: "var(--glass-cinema-text-primary)",
            muted: "var(--glass-cinema-text-muted)",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        glass: "18px",
      },
      boxShadow: {
        glass: "0 12px 45px -30px rgba(77, 182, 255, 0.65)",
      },
      backdropBlur: {
        xs: "6px",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
