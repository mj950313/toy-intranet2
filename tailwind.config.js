/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myblack: "#0a0a0a",
        myorange: "#f46804",
        mydarkorange: "#8C4100",
        mygray: "#1c1c1c",
      },
    },
  },
  plugins: [],
};
