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
  const sifyInput = trans.sify(input)
  let words = nodejieba.cut(sifyInput)
  const resultCut = []
  words.forEach(word => {
    resultCut.push(trans.tify(word))
  })
  console.log("[INFO] the jieba cut results are:")
  console.info(resultCut)

  words = nodejieba.extract(sifyInput, 5)
  const resultExtract = []
  words.map(word => {
    resultExtract.push(trans.tify(word.word))
  })
  console.log("[INFO] the jieba extract results are:")
  console.info(resultExtract)

  words = nodejieba.tag(sifyInput)
  const resultTag = []
  words.map(word => {
    resultTag.push(trans.tify(word.word) + " (" + word.tag + ")")
  })
  console.log("[INFO] the jieba extract results are:")
  console.info(resultTag)
}

run(input)
