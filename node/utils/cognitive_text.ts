import { ResLanguages, ResKeyPhrases} from './cognitive.model'

export function genBodyKeyPhrases(language: string = 'en', text: string) {
  return JSON.stringify({
    documents: [
      {
        language: checkKeyPhrasesLanguage(language),
        id: '1',
        text: text
      }
    ]
  })
}

function checkKeyPhrasesLanguage(language: string) {
  switch (language) {
    case 'fr':
      return language
    case 'de':
      return language
    case 'ja':
      return language
    default:
      return 'en'
  }
}

export function extractKeyPhrases(response: ResKeyPhrases) {
  return response.documents[0].keyPhrases
}

export function genBodyLanguages(countryHint: string, text: string) {
  return JSON.stringify({
    documents: [
      {
        countryHint: countryHint,
        id: '1',
        text: text
      }
    ]
  })
}

export function extractLanguages(response: ResLanguages) {
  return response.documents[0].detectedLanguages
}
