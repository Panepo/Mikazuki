import * as cross from './cross.hook'

export default async function imageHook(context) {
  await cross.platformReplyText(context, 'is image')
}
