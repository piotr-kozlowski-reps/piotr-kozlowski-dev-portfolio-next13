/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background_1_lighter: "#2C2F36",
        background_2_darker: "#26292E",
        main_white: "#DDDFE4",
        main_color: "#FCEB41",
      },
      spacing: {
        "42px": "42px",
        "57px": "57px",
        "132px": "132px",
      },
      zIndex: {
        max: 1000,
      },
      fontFamily: {
        mainFont: ['var("--mainFont")'],
      },
      letterSpacing: {
        tightest: "-.074em",
      },
      screens: {
        xl: "1224px",
      },
    },
  },
  plugins: [],
};
