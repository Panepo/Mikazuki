import { checkDevice } from '../template/device.template'
import { checkColor } from '../template/color.template'
import { checkSwitch } from '../template/switch.template'

export default function taskAppliance(tokens) {
  const device = checkDevice(tokens)
  const onoff = checkSwitch(tokens)
  const color = checkColor(tokens)
  return device + '_' + onoff + '_' + color
}
