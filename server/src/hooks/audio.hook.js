import * as cross from './cross.hook'

export default async function audioHook(context) {
  await cross.platformReplyText(context, 'is audio')
}
