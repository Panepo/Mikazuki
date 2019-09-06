import * as cross from './cross.hook'
import { tokenize } from '../helpers/nlp.helper'
import taskAppliance from '../tasks/appliance.task'

export default async function textHook(context, message) {
  const tokens = tokenize(message)
  const caseAppliance = taskAppliance(tokens)
  console.log(tokens)
  console.log(caseAppliance)

  switch (caseAppliance) {
    case 'all-on-yellow':
      await cross.platformReplyText(context, 'Okay, all lights will turn on to yellow')
      break
    default:
      break
  }
}
