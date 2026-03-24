/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "kaffa-dark": "#0a1622", // The deep navy background
        "kaffa-gold": "#c5a35d", // The gold accent color
        "kaffa-card": "#ffffff", // Light cards
        "kaffa-footer": "#07111a", // Darker footer
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"], // For those elegant headings
        sans: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
