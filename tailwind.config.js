/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx,mdx}`,
    `./src/components/**/*.{js,jsx,ts,tsx,mdx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx,mdx}`,
    `./content/**/*.{js,jsx,ts,tsx,mdx}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["aqua"],
          "neutral": "hsl(210, 46%, 58%)",
          "base-100": "hsl(213, 59%, 20%)",
          "base-200": "hsl(213, 59%, 15%)",
          "base-300": "hsl(213, 59%, 10%)"
        },
      },
      "emerald"
    ],
  },
}
