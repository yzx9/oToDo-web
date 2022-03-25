const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

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
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".bg-theme": {
          backdropFilter: "blur(8px)",
          backgroundColor: `rgb(241 245 249 / 0.8)`,
        },
      })
    }),
  ],
}
