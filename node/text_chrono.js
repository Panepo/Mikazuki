// import required modules
const chrono = require('chrono-node')

// process argument
const input = process.argv[2]

function run(input) {
  // process chrono
  console.log(chrono.parseDate(input))
}

run(input)
