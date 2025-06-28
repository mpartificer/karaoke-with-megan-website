/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "hsl(240, 100%, 22%)", // This should be closer to #000070
          secondary: "#FF5AE3",
          accent: "#DFFE59",
          neutral: "#47E9F1",
          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          "base-300": "#e5e5e5",
          "base-content": "#1f2937",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
