import boxen from 'boxen'
import { globby } from 'globby'
import chalk from 'chalk'
import moment from 'moment'

let envContext
if (process.env.NODE_ENV === 'production') {
  envContext = chalk`[{blue.bold production} {white context}]`
} else {
  envContext = chalk`[{red.bold development} {white context}]`
}

async function getFileList (glob, options) {
  try {
    const files = await globby(glob, options)
    if (files !== undefined) {
      return files
    }
  } catch (error) {
    console.error(`(getFileList ${glob} ${options} ) Error:`, error)
  }
}

function errLogFn (error, options) {
  // options
  options = options || {}
  const functionName = options.functionName || ''
  const functionVal = options.functionVal || ''
  const newPromise = options.newPromise || false

  const fnValStyle = `${chalk.white.reset(`${functionVal}`)}`
  const fnNameStyle = chalk.blue.bold(`${functionName}(${fnValStyle})`)
  let msgStyle = `${chalk.red.bold('Error in func:')}${fnNameStyle}${chalk.red.bold(' -->')}`
  if (newPromise) {
    msgStyle = `${chalk.red.dim.bold('Error in func:')}${fnNameStyle}${chalk.red.dim.bold(' -->')}`
  }
  console.error(msgStyle, error)
}

function filesStats (files) {
  let infoBlock = ''
  const lastItem = files.length - 1
  files.forEach((file, index) => {
    if (!file.compress) {
      if (file.size) {
        infoBlock = infoBlock + `${chalk.green(file.name)} (${chalk.yellow.bold(file.size)})`
      } else {
        infoBlock = infoBlock + `${chalk.green(file.name)}`
      }
      if (index !== lastItem) {
        infoBlock = infoBlock + '\n'
      }
    } else {
      infoBlock = infoBlock + chalk`{green ${file.compress.initialFile}} ({yellow.bold ${file.compress.initialFileSize}})\n{green ${file.compress.gzFile}} ({yellow.bold ${file.compress.gzFileSize}})\n{green ${file.compress.brFile}} ({yellow.bold ${file.compress.brFileSize}})\n______________________\n`
      if (index !== lastItem) {
        infoBlock = infoBlock + '\n'
      }
    }
  })
  return infoBlock
}

function start (functionName, color) {
  console.log(chalk`[${moment().format('hh:mm:ss')}] {white.underline Starting} {${color} ${functionName}} ...`)
  return moment()
}

function boxEnd (options) {
  // options
  options = options || {}
  const files = options.files || false
  const functionName = options.functionName || ''
  const timeStart = options.timeStart || 0
  const endColor = options.endColor || ''

  const timeEnd = moment()
  const timeDiff = timeEnd.diff(timeStart, 's', true)
  const title = chalk`{${endColor} ${functionName}}\n`
  const ending = chalk`[${moment().format('hh:mm:ss')}] {white Finished} {${endColor} ${functionName}}`
  if (files) {
    const filesInfo = filesStats(files)
    console.log(
      boxen(`${title}${filesInfo}\n${ending} after ${chalk.cyan.underline(timeDiff)} s`,
        { padding: { left: 1, right: 1 } })
    )
  } else {
    console.log(
      boxen(`${ending} after ${chalk.cyan.underline(timeDiff)} s`,
        { padding: { left: 1, right: 1 } })
    )
  }
}

function mainTaskStart (taskName) {
  const msg = chalk`[${moment().format('hh:mm:ss')}] {white.bold ${taskName}}`
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

function mainTaskEnd (options) {
  // options
  options = options || {}
  const taskName = options.taskName || ''
  const timeStart = options.timeStart || 0
  const skipContext = options.skipContext || false

  if (skipContext) {
    envContext = ''
  } else {
    envContext = `\n${envContext}`
  }
  const timeEnd = moment()
  const timeDiff = timeEnd.diff(timeStart, 's', true)
  const msg = chalk`[${moment().format('hh:mm:ss')}] {white Finished} {white.bold ${taskName}}`
  console.log(
    `\n${boxen(`DONE${envContext}\n${msg} after ${chalk.redBright.underline(timeDiff)} s`,
      {
        padding: { top: 1, left: 1, bottom: 0, right: 2 },
        borderColor: 'white',
        borderStyle: 'doubleSingle'
      }
    )}`
  )
}

export { start, boxEnd, mainTaskStart, mainTaskEnd, errLogFn, filesStats, getFileList }
