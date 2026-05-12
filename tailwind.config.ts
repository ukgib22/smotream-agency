import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF7EA",
        ink: "#111111",
        orange: "#FF6B2C",
        purple: "#6C3BFF",
        lime: "#B6FF5C"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Sora", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(17, 17, 17, 0.14)",
        glow: "0 20px 70px rgba(255, 107, 44, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
