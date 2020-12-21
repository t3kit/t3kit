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

function filesStats (files, prod = true) {
  let infoBlock = ''
  if (prod) {
    infoBlock = `${chalk.blue.bold.inverse(conf.CONTEXT)}\n`
  }
  const lastItem = files.length - 1
  files.forEach((file, index) => {
    if (file.size) {
      infoBlock = infoBlock + `${chalk.green(file.name)} (${chalk.yellow.bold(file.size)})`
    } else {
      infoBlock = infoBlock + `${chalk.green(file.name)}`
    }
    if (index !== lastItem) {
      infoBlock = infoBlock + '\n'
    }
  })
  return infoBlock
}

function start (fn, color = 'blue.inverse') {
  console.log(chalk`[${moment().format('hh:mm:ss')}] {magenta.underline Starting} {${color} ${fn}} ...`)
  return moment()
}
function end (fn, color = 'blue.inverse') {
  return chalk`[${moment().format('hh:mm:ss')}] {magenta.bold Finished} {${color} ${fn}}`
}

function boxEnd (files, fn, timeStart, endColor, prod) {
  const timeEnd = moment()
  const timeDiff = timeEnd.diff(timeStart, 's', true)
  if (files) {
    console.log(
      boxen(`${filesStats(files, prod)}\n${end(fn, endColor)} after ${chalk.redBright.underline(timeDiff)} s`,
        { padding: { left: 1, right: 1 } })
    )
  } else {
    console.log(
      boxen(`${end(fn, endColor)} after ${chalk.redBright.underline(timeDiff)} s`,
        { padding: { left: 1, right: 1 } })
    )
  }
}

function mainTaskStart (taskName) {
  const msg = chalk`[${moment().format('hh:mm:ss')}] {white.dim Starting} {white.bold ${taskName}} ...`
  console.log(
    `${boxen(`${msg}`,
      {
        padding: { top: 1, left: 1, bottom: 1, right: 2 },
        borderColor: 'white',
        borderStyle: 'doubleSingle'
      }
    )}\n`
  )
  return moment()
}

function mainTaskEnd (taskName, timeStart) {
  const timeEnd = moment()
  const timeDiff = timeEnd.diff(timeStart, 's', true)
  const msg = chalk`[${moment().format('hh:mm:ss')}] {white.dim Finished} {white.bold ${taskName}}`
  console.log(
    `\n${boxen(`${msg} after ${chalk.redBright.underline(timeDiff)} s`,
      {
        padding: { top: 1, left: 1, bottom: 0, right: 2 },
        borderColor: 'red',
        borderStyle: 'doubleSingle'
      }
    )}`
  )
}

exports.ensureTmpDir = ensureTmpDir
exports.start = start
exports.end = end
exports.boxEnd = boxEnd
exports.mainTaskStart = mainTaskStart
exports.mainTaskEnd = mainTaskEnd
exports.errLogFn = errLogFn
exports.filesStats = filesStats
exports.getFileList = getFileList
