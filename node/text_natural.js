// import required modules
const natural = require('natural')

// process argument
const input = process.argv[2]

function run(input) {
  // process natural
  const tokenizer = new natural.WordTokenizer()
  console.log(tokenizer.tokenize(input))
}

run(input)
