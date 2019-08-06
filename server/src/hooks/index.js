import textHook from './text.hook'
import audioHook from './audio.hook'
import imageHook from './image.hook'
import constHook from './const.hook'

export default async function hook(context) {
  if (context.event.isFollow || context.event.isJoin) {
    await constHook(context)
  } else if (context.event.isImage || context.event.isPhoto) {
    await imageHook(context)
  } else if (context.event.isAudio) {
    await audioHook(context)
  } else if (context.event.isText) {
    await textHook(context, context.event.text)
  }
}
