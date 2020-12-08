const { watch, dest, src } = require('gulp')
// const sass = require('gulp-sass')
// const Fiber = require('fibers')
const sourcemaps = require('gulp-sourcemaps')
const gulpPostcss = require('gulp-postcss')
// const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulpif = require('gulp-if')
// const rev = require('gulp-rev')
const size = require('gulp-size')
const conf = require('../conf')
var cssimport = require('postcss-import')
// const rootDir = require('app-root-path').path

// sass.compiler = require('sass')
// const SRC = conf.CSS_SRC
// const DIST = conf.CSS_DIST
// const onlyCss = '*.css'
// const llll = `${rootDir}/theme/src/css`

const postCssPlugins = [
  // autoprefixer(),
  cssimport()
]
// minify css with cssnano if production
process.env.NODE_ENV === 'production' && postCssPlugins.push(cssnano({ preset: 'default' }))

// compile scss to css
function compileCss () {
  return src('*.css', { cwd: conf.CSS_SRC })
    .pipe(sourcemaps.init())
    // .pipe(sass({ fiber: Fiber }).on('error', sass.logError))
    // .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulpPostcss(postCssPlugins))
    .pipe(gulpif(
      process.env.NODE_ENV === 'production',
      sourcemaps.write('.', { includeContent: false, addComment: false }),
      sourcemaps.write('.')))
    // .pipe(gulpif(onlyCss, postcss(postCssPlugins)))
    // .pipe(sourcemaps.write('.'))
    // .pipe(gulpif(onlyCss && process.env.NODE_ENV === 'production', rev()))
    .pipe(size({ showFiles: true }))
    .pipe(dest(conf.CSS_DIST))
}

// gulp watch for scssToCss task
function compileCssWatch () {
  watch([`${conf.CSS_SRC}**/*.css`, `${conf.SRC}vendor/css/**/*.css`], compileCss)
}

// compileCss()
exports.compileCss = compileCss
exports.compileCssWatch = compileCssWatch
