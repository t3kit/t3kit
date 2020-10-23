const { watch, dest, src } = require('gulp')
const sass = require('gulp-sass')
// const Fiber = require('fibers')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulpif = require('gulp-if')
const rev = require('gulp-rev')
const size = require('gulp-size')
const conf = require('../conf')
var cssimport = require('postcss-import')
const rootDir = require('app-root-path').path

sass.compiler = require('sass')
const SRC = conf.CSS_SRC
const DIST = conf.CSS_DIST
const onlyCss = '*.css'
const llll = `${rootDir}/theme/src/css`

const postCssPlugins = [
  autoprefixer(),
  cssimport()
]
// minify css with cssnano if production
process.env.NODE_ENV === 'production' && postCssPlugins.push(cssnano({ preset: 'default' }))

// compile scss to css
function compileCss () {
  return src('*.css', { cwd: llll })
    .pipe(sourcemaps.init())
    // .pipe(sass({ fiber: Fiber }).on('error', sass.logError))
    // .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss(postCssPlugins))
    .pipe(gulpif(
      process.env.NODE_ENV === 'production',
      sourcemaps.write('.', { includeContent: false, addComment: false }),
      sourcemaps.write('.')))
    // .pipe(gulpif(onlyCss, postcss(postCssPlugins)))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulpif(onlyCss && process.env.NODE_ENV === 'production', rev()))
    .pipe(size({ showFiles: true }))
    .pipe(dest(DIST))
}

// gulp watch for scssToCss task
function compileCssWatch () {
  watch(`${SRC}**/*.scss`, compileCss)
}

// compileCss()
exports.compileCss = compileCss
// exports.compileCssWatch = compileCssWatch
