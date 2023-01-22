/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      clipPath: {
        "footer-start":
          "polygon(65% 100%, 100% 100%, 100% 100%, 0% 100%, 0% 100%)",
        "mobile-menu-bg1": "polygon(100% 0%, 100% 0%, 100% 100%, 100% 19%)",
        "mobile-menu-bg2":
          "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 33%)",
        // "footer-desktop": "polygon(55% 45%, 100% 0%, 100% 100%, 0% 100%, 0% 12%)",
      },
      colors: {
        background_1_lighter: "#2C2F36",
        background_2_darker: "#26292E",
        main_white: "#DDDFE4",
        main_color: "#FCEB41",
        main_white_50: "#17181c",
      },
      spacing: {
        "26px": "26px",
        "42px": "42px",
        "57px": "57px",
        "132px": "132px",
      },
      zIndex: {
        60: 60,
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
  plugins: [
    require("tailwind-clip-path"),
    require("tailwindcss-debug-screens"),
    require("tailwindcss-scrollbar"),
  ],
};
