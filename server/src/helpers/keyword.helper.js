import natural from 'natural'

export const isKeyword = (tokens, template) => {
  let result = false
  tokens.map(token => {
    if (token.tag === 'n') {
      template.cht.forEach(word => {
        if (token.word === word) {
          result = true
        }
      })
    } else if (token.tag === 'eng') {
      template.eng.forEach(word => {
        if (token.word === word) {
          result = true
        }
        // eslint-disable-next-line
        if (
          natural.JaroWinklerDistance(token.word, word) > template.threshold
        ) {
          result = true
        }
        // console.log(token.word + " & " + word + " : " + natural.JaroWinklerDistance(token.word, word))
      })
    }
  })
  return result
}
