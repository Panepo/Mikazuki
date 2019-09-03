// import required modules
const BrainJSClassifier = require('natural-brain')
const classifier = new BrainJSClassifier()

/*
classifier.addDocument('turn the table light on', 'table-on')
classifier.addDocument('turn the left light on', 'table-on')
classifier.addDocument('turn the table light off', 'table-off')
classifier.addDocument('turn the left light off', 'table-off')
classifier.addDocument('turn the right light on', 'floor-on')
classifier.addDocument('turn on the floor lamp', 'floor-on')
classifier.addDocument('turn the right light off', 'floor-off')
classifier.addDocument('turn off the floor lamp', 'floor-off')
*/

classifier.addDocument('桌燈打開', 'table-on')
classifier.addDocument('左邊的燈打開', 'table-on')
classifier.addDocument('桌燈關掉', 'table-off')
classifier.addDocument('關掉左邊的燈', 'table-off')
classifier.addDocument('右邊的燈打開', 'floor-on')
classifier.addDocument('啟動右邊的地燈', 'floor-on')
classifier.addDocument('右邊的燈關掉', 'floor-off')
classifier.addDocument('地燈關掉', 'floor-off')

classifier.train()

console.log(classifier.classify('開左邊的燈')) // -> software
