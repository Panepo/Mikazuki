import * as cross from './cross.hook'
import * as message from '../messages/event.message'

export default async function eventHook(context) {
  if (context.event.isFollow) {
    await cross.platformReplyText(context, message.messageFollow)
  } else if (context.event.isJoin) {
    await cross.platformReplyText(context, message.messageJoin)
  }
}
