/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#95FF8A",
        "custom-pink": "#F33FF2", // You can add as many custom colors as you want
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
