import * as cross from './cross.hook'

export const audioHook = async context => {
  await cross.platformReplyText(context, 'is audio')
}
