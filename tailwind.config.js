/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGray: "#737373",
        darkerLightGray: "#424242",
        lighterGray: "#D6D6D6",
        darkGray: "#202020",
        defaultGray: "#292929",
      },
    },
  },
  plugins: [],
};
