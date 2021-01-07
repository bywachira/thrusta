module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./pages/**/*.js",
    "./components/**/*.js",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: "#5e2319",
          light: "#db866c",
          ish: "#d74723",
          dark: "#090302",
          lighter: "#FCF8E8",
          fade: "#fecb89",
        },
        black: {
          DEFAULT: "#000000",
          semi: "#211717",
          light: "#323232",
          bluey: "#23374d",
        },
        bluish: {
          DEFAULT: "#1089ff",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  fontFamily: {
    sans: ["inter", "sans-serif"],
  },
};
