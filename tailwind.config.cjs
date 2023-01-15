/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Courgette: ["Courgette", "cursive"],
      },
      boxShadow: {
        card: "0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 10px 10px -10px rgba(50, 50, 73, 0.3)",
      },
    },
  },
  plugins: [],
};
