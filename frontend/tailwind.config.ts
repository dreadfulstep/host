import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blues
        "primary-a0": "#2c38cc",
        "primary-a10": "#514cd2",
        "primary-a20": "#6161d9",
        "primary-a30": "#8476df",
        "primary-a40": "#9a8be5",
        "primary-a50": "#b0a2eb",

        // Surface (Dark Background Shades)
        "surface-a0": "#121212",
        "surface-a10": "#282828",
        "surface-a20": "#3f3f3f",
        "surface-a30": "#575757",
        "surface-a40": "#717171",
        "surface-a50": "#8b8b8b",

        // Tonal (Neutral Grays for Depth)
        "tonal-a0": "#191622",
        "tonal-a10": "#2e2b37",
        "tonal-a20": "#45424d",
        "tonal-a30": "#5d5a64",
        "tonal-a40": "#75737c",
        "tonal-a50": "#8f8d94",
      },
    },
  },
  plugins: [],
} satisfies Config;
