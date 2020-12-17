
// const rootDir = require('app-root-path').path
const conf = require('./conf')
const postcss = require('postcss')

console.log('🚀 ~ file: .postcssrc.js ~ line 4 ~ conf', `${conf.CSS_DIST}test/`)
console.log('🚀 ~ file: .postcssrc.js ~ line 4 ~ conf', `${conf.CSS_SRC}*.css`)


module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'production' ? {inline: false, annotation: false} : {inline: false},
  plugins: {
    'postcss-import': {},
    'cssnano': ctx.env === 'production' ? { preset: 'default' } : false
  },
  from: `${conf.CSS_SRC}*.csss`,
  to: `testee/`
  // to: `${conf.CSS_DIST}testee/`
})
