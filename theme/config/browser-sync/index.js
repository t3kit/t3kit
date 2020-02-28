const bs = require('browser-sync').create()
const vars = require('../vars')

const DIST = `${vars.DIST}`

function serve (cb) {
  bs.init({
    ui: false,
    proxy: {
      target: 'localhost',
      reqHeaders: function () {
        return {
          host: vars.proxy
        }
      }
    },
    files: [DIST],
    serveStatic: [DIST],
    port: 9001,
    ghostMode: false,
    open: false
  })
  cb()
}

exports.serve = serve
