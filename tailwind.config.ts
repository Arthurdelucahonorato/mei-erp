import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mbm: "375px",
        mbl: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1600px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      fontSize: {
        DEFAULT: "1.125rem",
        headline: "3.875rem",
        subheadline: "2rem",
        label: "1rem",
        code: "0.875rem",
      },
      colors: {
        body: "#010C15",
        white: "#FFFFFF",
        primary: {
          DEFAULT: "#F472B6",
          "second-tone": "#FF90CA",
          "third-tone": "#FFBFE0",
          "fourth-tone": "#FFE0F0",
          "fifth-tone": "#FFEFF7",
        },
        secondary: {
          DEFAULT: "#18ACAC",
          "second-tone": "#35B3B5",
          "third-tone": "#52B9BD",
          "fourth-tone": "#8CC6CE"
        },
        accent: {
          DEFAULT: "#95A4FC",
          "second-purple": "#C6C7F8",
          "primary-blue": "#A8C5DA",
          "second-blue": "#B1E3FF",
          "primary-green": "#A1E3CB",
          "second-green": "#BAEDBD",
          yellow: "#FFE999",
          red: "#FF4747",
        },
        altGray: "#1E2D3D",
      },
    },
  },
  plugins: [],
};
export default config;
