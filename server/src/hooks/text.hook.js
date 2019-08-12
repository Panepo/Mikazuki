import * as cross from './cross.hook'
import nlp from '../services/nlp.service'

export default async function textHook(context, message) {
  await cross.platformReplyText(context, nlp(message))
}
