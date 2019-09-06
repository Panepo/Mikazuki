import { isKeyword } from '../helpers/keyword.helper'

const templateWeather = {
  cht: ['天氣', '氣溫', '溫度', '壓力', '氣壓', '濕度', '溼度', '風', '雨量'],
  eng: [
    'weather',
    'temperature',
    'wind',
    'humidity',
    'pressure',
    'precipitation'
  ],
  thre: 0.8
}

export const isWeather = tokens => {
  return isKeyword(tokens, templateWeather)
}
