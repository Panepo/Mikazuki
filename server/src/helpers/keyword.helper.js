import natural from 'natural'
import { messageWeather } from '../messages/weather.message'

export const isKeyword = (tokens, wordsCht, wordsEng, threshold) => {
  let result = false
  tokens.map(token => {
    if (token.tag === 'n') {
      wordsCht.forEach(word => {
        if (token.word === word) {
          result = true
        }
      })
    } else if (token.tag === 'eng') {
      wordsEng.forEach(word => {
        if (token.word === word) {
          result = true
        }
        // eslint-disable-next-line
        if (natural.JaroWinklerDistance(token.word, word) > threshold) {
          result = true
        }
        // console.log(token.word + " & " + word + " : " + natural.JaroWinklerDistance(token.word, word))
      })
    }
  })
  return result
}

export const isWeather = tokens => {
  return isKeyword(
    tokens,
    messageWeather.cht,
    messageWeather.eng,
    messageWeather.thre
  )
}
