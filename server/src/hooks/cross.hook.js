import * as config from '../config'

export async function platformReplyText(context, messenge) {
  if (
    context.platform == 'messenger' ||
    context.platform == 'telegram' ||
    context.platform == 'console'
  ) {
    await context.sendText(messenge)
  } else {
    await context.replyText(messenge)
  }
}

export const platformReplyImage = async (context, url) => {
  if (context.platform == 'messenger' || context.platform == 'telegram') {
    await context.sendImage(url)
  } else {
    await context.replyImage(url)
  }
}

export const getPlatformToken = platform => {
  if (platform == 'line') return config.channelAccessToken
  else if (platform == 'telegram') return config.telegramAccessToken
  else return 'none'
}

export const getImageId = context => {
  if (context.platform == 'line') return context.event.image.id
  else if (context.platform == 'telegram') return context.event.photo[0].file_id
  else return 'none'
}
