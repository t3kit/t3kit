const fse = require('fs-extra')
const globby = require('globby')
const chalk = require('chalk')
const moment = require('moment')
const boxen = require('boxen')
const conf = require('../conf')


async function ensureTmpDir () {
  try {
    await fse.ensureDir(`${conf.TEMP}`)
  } catch (error) {
    console.error('(ensureTmpDir) Error:', error)
  }
}

async function getFileList (glob, opt) {
  // let files
  try {
    const files = await globby(glob, opt)
    if (files !== undefined) {
      return files
    }
  } catch (error) {
    console.error(`(getFileList ${glob} ${opt} ) Error:`, error)
  }
}

function errLogFn (error, fnName, fnVal = '', promise = false) {
  const fnValStyle = `${chalk.white.reset(`${fnVal}`)}`
  const fnNameStyle = chalk.blue.bold(`${fnName}(${fnValStyle})`)
  let msgStyle = `${chalk.red.bold('Error in func:')}${fnNameStyle}${chalk.red.bold(' -->')}`
  if (promise) {
    msgStyle = `${chalk.red.dim.bold('Error in func:')}${fnNameStyle}${chalk.red.dim.bold(' -->')}`
  }
  console.error(msgStyle, error)
}

function filesStats (files) {
  let infoBlock = ''
  const lastItem = files.length - 1
  files.forEach((file, index) => {
    infoBlock = infoBlock + `${chalk.green(file.name)} (${chalk.yellow.bold(file.size)})`
    if (index !== lastItem) {
      infoBlock = infoBlock + '\n'
    }
  })
  // console.log(infoBlock)
  return infoBlock
}

function start (fn) {
  console.log(`[${moment().format('hh:mm:ss')}] ${chalk.green('Starting')} ${chalk.cyan.inverse(fn)} ...`)
}
function end (fn) {
  // console.log(boxen(`${filesStats(files)}\n${end('compileScss')}`, { padding: { left: 1, right: 1 } }))
  // console.log(`[${moment().format('hh:mm:ss')}] ${chalk.magenta.bold('Finished')} ${chalk.cyan.inverse(fn)}`)
  return `[${moment().format('hh:mm:ss')}] ${chalk.magenta.bold('Finished')} ${chalk.cyan.inverse(fn)}`
}
function boxEnd (files, fn) {
  console.log(
    boxen(`${filesStats(files)}\n${end(fn)}`, { padding: { left: 1, right: 1 } })
  )
}

exports.ensureTmpDir = ensureTmpDir
exports.start = start
exports.end = end
exports.boxEnd = boxEnd
exports.errLogFn = errLogFn
exports.filesStats = filesStats
exports.getFileList = getFileList
