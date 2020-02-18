const { dest, src } = require('gulp')
const rev = require('gulp-rev')
const revdel = require('gulp-rev-delete-original')
const vars = require('../vars')

const JS_DIST = `${vars.DIST}${vars.JS_DIST}`

function revJs () {
  return src(`${JS_DIST}**/*.js`)
    .pipe(rev())
    .pipe(revdel())
    .pipe(dest(JS_DIST))
}

exports.revJs = revJs
