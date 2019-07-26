// import required modules
let chrono = require('chrono-node')

// process argument
let input = process.argv[2]

// process chrono
console.log(chrono.parseDate(input))
