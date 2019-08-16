import natural from 'natural'

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
  const wordsCht = ["天氣", "氣溫", "溫度", "壓力", "氣壓", "濕度", "溼度", "風", "雨量"]
  const wordsEng = [
    "weather", "temperature", "wind", "humidity", "pressure", "precipitation"
  ]
  const thre = 0.8
  return isKeyword(tokens, wordsCht, wordsEng, thre)
}
