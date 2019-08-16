import * as cross from './cross.hook'
import { tokenize } from '../helpers/nlp.helper'
import { isWeather } from '../helpers/keyword.helper'
import { checkTime } from '../helpers/time.helper'

export default async function textHook(context, message) {
  const tokens = tokenize(message)
  const weather = isWeather(tokens)
  const time = checkTime(message)
  console.log(time)
  await cross.platformReplyText(context, weather)
}
