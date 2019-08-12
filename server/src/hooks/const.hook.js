import * as cross from './cross.hook'
import * as message from '../constants/message'

export default async function constHook(context) {
  if (context.event.isFollow) {
    await cross.platformReplyText(context, message.msgFollow)
  } else if (context.event.isJoin) {
    await cross.platformReplyText(context, message.msgJoin)
  }
}
