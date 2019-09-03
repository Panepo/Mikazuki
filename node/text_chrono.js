// import required modules
const chrono = require('chrono-node')

// process argument
const input = process.argv[2]

if (!input) {
  console.error('[ERROR] the input text string is required')
  process.exit(0)
}

function run(input) {
  // Time Reference. Transfor Server time to Taiwan time.
  let date = new Date()
  const utc = date.getTime() + date.getTimezoneOffset() * 60000
  date = new Date(utc + 3600000 * 8)

  // Get the utc time from message refers to Taiwan time
  const timeInfo = chrono.parse(input, date)[0]
  if (timeInfo == undefined) {
    console.error('[ERROR] no time result found.')
    process.exit(0)
  }

  // new time in Taiwan epoch
  const epoch = new Date(timeInfo.start.date().getTime() + 3600000 * 8)
  console.log('[INFO] the chrono results are:')
  console.log(epoch)
}

run(input)
