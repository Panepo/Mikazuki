// import required modules
const chrono = require('chrono-node')

// process argument
const input = process.argv[2]

if (!input) {
  console.error("[ERROR] the input text string is required")
  process.exit(0)
}

function run(input) {
  // process chrono
  console.log("[INFO] the chrono results are:")
  console.log(chrono.parseDate(input))
}

run(input)
