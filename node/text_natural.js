// import required modules
const natural = require('natural')

// process argument
const input = process.argv[2]

if (!input) {
  console.error('[ERROR] the input text string is required')
  process.exit(0)
}

function run(input) {
  // process natural
  const tokenizer = new natural.WordTokenizer()
  console.log('[INFO] the natural tokenizer results are:')
  console.log(tokenizer.tokenize(input))
}

run(input)
