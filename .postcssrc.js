const purgecss = require('@fullhuman/postcss-purgecss')
// 使っていないクラスを削除
// https://purgecss.com/configuration.html

module.exports = {
  plugins: [
    process.env.NODE_ENV === 'development'
      ? ''
      : purgecss({
          content: ['./**/*.vue'],
          blocklist: [/^p-colorpicker/],
          safelist: {
            deep: [/p-message$/, /block$/, /^lg:/, /^md:/, /^sm:/, /^xl:/, /^lg:/],
          },
        }),
  ],
}
