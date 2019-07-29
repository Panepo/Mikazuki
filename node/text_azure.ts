// import required modules
import cognitiveApi from './utils/cognitive'
import * as cognitiveText from './utils/cognitive_text'
import * as environment from './environment/environment'

// process argument
const input = process.argv[2]

async function run(input: string) {
  let language = null
  await cognitiveApi(
    environment.AzureTextUrl,
    'languages',
    environment.AzureTextKey,
    cognitiveText.genBodyLanguages('TW', input)
  ).then(data => {
    if (data.err) {
      console.error('[ERROR]' + data.description)
    } else {
      language = cognitiveText.extractLanguages(data)
      console.info('[INFO] Text language result: ' + language[0].name + '(' + language[0].iso6391Name + ') ' + language[0].score * 100 + '%')
    }
  })

  await cognitiveApi(
    environment.AzureTextUrl,
    'keyPhrases',
    environment.AzureTextKey,
    cognitiveText.genBodyKeyPhrases(language[0].iso6391Name, input)
  ).then(data => {
    if (data.err) {
      console.error('[ERROR]' + data.description)
    } else {
      console.info('[INFO] Text analysis result:')
      const results = cognitiveText.extractKeyPhrases(data)
      results.map(result => {
        console.log(result)
      })
    }
  })
}

run(input)
