import nodejieba from 'nodejieba'
import trans from 'chinese-conv'

export const segment = input => {
  const words = nodejieba.extract(trans.sify(input), 5)
  const result = []
  words.map(word => {
    result.push(trans.tify(word.word))
  })
  return result
}

export const segmentag = input => {
  const words = nodejieba.extract(trans.sify(input), 5)
  const result = []
  words.map(word => {
    const tag = nodejieba.tag(word.word)
    result.push({ word: trans.tify(tag[0].word), tag: tag[0].tag })
  })
  return result
}
