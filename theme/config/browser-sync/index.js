const bs = require('browser-sync').create()
const vars = require('../vars')

const DIST = `${vars.DIST}`

function serve (cb) {
  bs.init({
    ui: false,
    proxy: 'http://t3kit10.t3.localhost',
    files: [DIST],
    serveStatic: [DIST],
    port: 9001,
    ghostMode: false,
    open: false,
    rewriteRules: [
      {
        match: new RegExp("typo3temp/assets/(.+?)(?=['\"])", 'g'),
        replace: '$1'
      }
    ]
  })
  cb()
}

exports.serve = serve
