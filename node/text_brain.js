// import required modules
const BrainJSClassifier = require('natural-brain')
const dataAppliance = require('./train/appliance')

const classifier = new BrainJSClassifier()

dataAppliance.map(data => {
  classifier.addDocument(data.text, data.classification)
})
classifier.train()

// process argument
const input = process.argv[2]

if (!input) {
  console.error('[ERROR] the input text string is required')
  process.exit(0)
}

function run(input) {
  console.log('[INFO] the text classification result is:')
  console.log(classifier.classify(input))
}

run(input)
