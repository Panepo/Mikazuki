// import required modules
const BrainJSClassifier = require('natural-brain')
const fs = require('fs')
const readline = require('readline')

const classifier = new BrainJSClassifier()

const filePath = './train/'

fs.readdir(filePath, (err, files) => {
  files.forEach(file => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(filePath + file)
    })
    lineReader.on('line', line => {
      const filename = file.split('.')[0]
      // console.log('Line from ' + filename + ' : ' + line)
      classifier.addDocument(line.toString(), filename.toString())
    })
  })
})

classifier.train()

console.log(classifier.classify('did the tests pass?')) // -> software
console.log(classifier.classify('did you buy a new drive?')) // -> hardware
console.log(classifier.classify('What is the capacity?')) // -> hardware
console.log(classifier.classify('Lets meet tomorrow?')) // -> meeting
console.log(classifier.classify('Can you play some stuff?')) // -> music

