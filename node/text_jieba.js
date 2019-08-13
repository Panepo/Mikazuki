// import required modules
const nodejieba = require('nodejieba')
const trans = require('chinese-conv')

// process argument
const input = process.argv[2]

if (!input) {
  console.error("[ERROR] the input text string is required")
  process.exit(0)
}

// nodejieba only support Simplified Chinese, so translate Traditonal to Simplified.
// After segment, translate back to Traditonal Chinese.
function run(input) {
  // process jieba
  const words = nodejieba.cut(trans.sify(input))
  const results = []
  words.forEach(word => {
    results.push(trans.tify(word))
  })
  console.log("[INFO] the jieba cut results are:")
  console.info(results)
}

run(input)
