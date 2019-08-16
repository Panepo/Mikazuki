import * as cross from './cross.hook'
import { segmentag } from '../helpers/nlp.helper'
import { isWeather } from '../helpers/keyword.helper'

export default async function textHook(context, message) {
  const tokens = segmentag(message)
  const weather = isWeather(tokens)
  await cross.platformReplyText(context, weather)
}
