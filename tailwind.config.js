const colors = require("tailwindcss/colors")

delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

module.exports = {
  content: ["./src/**/*.{html,css,js,ts,vue}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: colors.blue,
      success: colors.green,
      danger: colors.red,
      info: colors.gray,
    },
  },
  plugins: [],
}
