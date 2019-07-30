import * as cross from './cross.hook'
import textHook from './text.hook'
import audioHook from './audio.hook'
import imageHook from './image.hook'

export default async function hook(context) {
  if (context.event.isFollow) {
    await cross.platformReplyText(context, 'is follow')
  } else if (context.event.isJoin) {
    await cross.platformReplyText(context, 'is join')
  } else if (context.event.isImage || context.event.isPhoto) {
    await cross.platformReplyText(context, 'is image')
    await imageHook(context)
  } else if (context.event.isAudio) {
    await cross.platformReplyText(context, 'is audio')
    await audioHook(context)
  } else if (context.event.isText) {
    await cross.platformReplyText(context, 'is text')
    await textHook(context, context.event.text)
  }
}
