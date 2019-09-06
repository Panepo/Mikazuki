import { isKeyword } from '../helpers/keyword.helper'

const templateAll = {
  cht: ['全', '都'],
  eng: ['all'],
  thre: 0.8
}

const templateLight = {
  cht: ['燈'],
  eng: ['light', 'lamp'],
  thre: 0.8
}

const templateLeft = {
  cht: ['左', '桌燈'],
  eng: ['left', 'table'],
  thre: 0.8
}

const templateRight = {
  cht: ['右', '地燈'],
  eng: ['right', 'floor'],
  thre: 0.8
}

/*
0: none
1: all
2: left
3: right
*/

export const checkDevice = tokens => {
  const all = isKeyword(tokens, templateAll)
  const light = isKeyword(tokens, templateLight)
  const left = isKeyword(tokens, templateLeft)
  const right = isKeyword(tokens, templateRight)

  return light ? all ? 1 : left ? 2 : right ? 3 : 0 : 0
}
