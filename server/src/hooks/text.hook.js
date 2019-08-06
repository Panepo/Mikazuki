import * as cross from './cross.hook'

export const textHook = async (context, text) => {
  await cross.platformReplyText(context, 'is text')
}
