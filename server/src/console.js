import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { ConsoleBot } from 'bottender'
import hook from './hooks'

const bot = new ConsoleBot({
  fallbackMethods: true
}).onEvent(hook)
bot.createRuntime()
