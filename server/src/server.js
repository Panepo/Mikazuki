import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import bodyParser from 'body-parser'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import { LineBot, MemorySessionStore } from 'bottender'
import { registerRoutes } from 'bottender/express'
import * as config from './config'
import hook from './hooks'
import logger from './services/logger.service'

const server = express()

// Days locale
dayjs.locale('zh-tw')

server.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString()
    }
  })
)

const MAX_ITEMS_IN_CACHE = 500
const EXPIRED_IN_FIVE_MINUTE = 5 * 60

// Session: how we store session. We stores sessions in memory.
const mSession = new MemorySessionStore(
  MAX_ITEMS_IN_CACHE,
  EXPIRED_IN_FIVE_MINUTE
)

// Session data: used for conversation
const sessData = {
  isGotImgWaitAnwser: false,
  isGotReqWaitImg: false,
  previousContext: {}
}

// Choose platform
const bots = {
  line: new LineBot({
    channelSecret: config.channelSecret,
    accessToken: config.channelAccessToken,
    sessionStore: mSession
  })
    .setInitialState(sessData)
    .onEvent(hook)
}
registerRoutes(server, bots.line, {
  path: '/line'
})
server.listen(process.env.PORT || 5000, () => {
  logger.info('server is running on 5000 port...')
})
