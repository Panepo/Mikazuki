import * as cross from './cross.hook'
import * as message from '../constants/message'

export const textHook = async (context, text) => {
  if (context.event.isFollow) {
    await cross.platformReplyText(context, message.msgFollow)
  } else if (context.event.isJoin) {
    await cross.platformReplyText(context, message.msgJoin)
  }
}
