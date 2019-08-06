// import required modules
const nodejieba = require('nodejieba')

// process argument
const input = process.argv[2]

function run(input) {
  // process chrono
  console.log(nodejieba.cut(input))
}

run(input)
