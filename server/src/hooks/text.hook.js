import * as cross from './cross.hook'
import { tokenize } from '../helpers/nlp.helper'

export default async function textHook(context, message) {
  const tokens = tokenize(message)
  // const weather = isWeather(tokens)
  // const time = checkTime(message)

  await cross.platformReplyText(context, weather)
}
