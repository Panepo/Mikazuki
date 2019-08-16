import natural from 'natural'

const ThresholdJaroWinkler = 0.8

export const isWeather = tokens => {
  let result = false
  tokens.map(token => {
    if (token.tag === 'n') {
      const keywords = ["天氣", "氣溫", "溫度", "壓力", "氣壓", "濕度", "溼度", "風", "雨量"]
      keywords.forEach(word => {
        if (token.word === word) {
          result = true
        }
      })
    } else if (token.tag === 'eng') {
      const keywords = [
        "weather", "temperature", "wind", "humidity", "pressure", "precipitation"
      ]
      keywords.forEach(word => {
        if (token.word === word) {
          result = true
        }
        // eslint-disable-next-line
        if (natural.JaroWinklerDistance(token.word, word) > ThresholdJaroWinkler) {
          result = true
        }
        // console.log(token.word + " & " + word + " : " + natural.JaroWinklerDistance(token.word, word))
      })
    }
  })
  return result
}
