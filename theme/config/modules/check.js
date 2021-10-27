import boxen from 'boxen'
import { createRequire } from 'module'
import semver from 'semver'
const require = createRequire(import.meta.url)
const nodeEngine = require('../../../package').engines.node

function checkNode () {
  if (!semver.satisfies(process.version, nodeEngine)) {
    console.log(boxen(`ERROR: Required node version ${nodeEngine} not satisfied with current version ${process.version}`, { padding: 1 }))
    process.exit(1)
  }
}

export { checkNode }
