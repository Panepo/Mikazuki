import * as cross from './cross.hook'

export const imageHook = async context => {
  await cross.platformReplyText(context, 'is image')
}
