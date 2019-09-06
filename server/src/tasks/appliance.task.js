import { checkDevice } from '../template/device.template'
import { checkColor } from '../template/color.template'
import { checkSwitch } from '../template/switch.template'

const replyAppliance = [[[]]]

export default function taskAppliance(tokens) {
  const device = checkDevice(tokens)
  const onoff = checkSwitch(tokens)
  const color = checkColor(tokens)

  return replyAppliance[device][onoff][color]
}
