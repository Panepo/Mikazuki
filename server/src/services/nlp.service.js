import BrainJSClassifier from 'natural-brain'

const classifier = new BrainJSClassifier()

classifier.addDocument('turn the table light on', 'table-on')
classifier.addDocument('turn the left light on', 'table-on')
classifier.addDocument('turn the table light off', 'table-off')
classifier.addDocument('turn the left light off', 'table-off')
classifier.addDocument('turn the right light on', 'floor-on')
classifier.addDocument('turn on the floor lamp', 'floor-on')
classifier.addDocument('turn the right light off', 'floor-off')
classifier.addDocument('turn off the floor lamp', 'floor-off')

classifier.train()


export default function classify(input) {
  return classifier.classify(input)
}
