// import required modules
const BrainJSClassifier = require('natural-brain')

const classifier = new BrainJSClassifier()

classifier.addDocument('my unit-tests failed.', 'software')
classifier.addDocument('tried the program, but it was buggy.', 'software')
classifier.addDocument('tomorrow we will do standup.', 'meeting')
classifier.addDocument('the drive has a 2TB capacity.', 'hardware')
classifier.addDocument('i need a new power supply.', 'hardware')
classifier.addDocument('can you play some new music?', 'music')

classifier.train()

console.log(classifier.classify('did the tests pass?')) // -> software
console.log(classifier.classify('did you buy a new drive?')) // -> hardware
console.log(classifier.classify('What is the capacity?')) // -> hardware
console.log(classifier.classify('Lets meet tomorrow?')) // -> meeting
console.log(classifier.classify('Can you play some stuff?')) // -> music
