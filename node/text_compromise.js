// import required modules
const nlp = require('compromise')

// process argument
const command = process.argv[2]
const input = process.argv[3]

function run(command, input) {
  // process natural language processing
  const doc = nlp(input)

  // generate output

  switch (command) {
    case 'plural':
      console.info(
        '[INFO] Plural/singular: grab the noun-phrases, make em plural.'
      )
      console.log(
        doc
          .nouns(0)
          .toPlural()
          .out('text')
      )
      break
    case 'number':
      console.info(
        '[INFO] Number parsing: - parse written-out numbers, and change their form.'
      )
      console.log(
        doc
          .values()
          .toNumber()
          .out()
      )
      break
    case 'text':
      console.info(
        '[INFO] Number parsing: - parse written-out numbers, and change their form.'
      )
      console.log(
        doc
          .values()
          .add(2)
          .toText()
          .out('text')
      )
      break
    case 'normalize':
      console.info(
        '[INFO] Normalization: - handle looseness & variety of random text.'
      )
      console.log(doc.normalize().out('text'))
      break
    case 'future':
      console.info('[INFO] Future: - switch to/from conjugations of any verb')
      console.log(
        doc
          .sentences()
          .toFutureTense()
          .out('text')
      )
      break
    case 'verb':
      console.info('[INFO] Verb: - switch to/from conjugations of any verb')
      console.log(doc.verbs().out('text'))
      break
    case 'name':
      console.info(
        '[INFO] Named-entities: - get the people, places, organizations.'
      )
      console.log(doc.topics().data())
      break
    default:
      console.error('[ERROR] enter the correct command')
  }
}

run(command, input)
