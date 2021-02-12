module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
      boxShadow: ["active"],
      display: ["group-focus"],
    },
  },
  plugins: [],
};
