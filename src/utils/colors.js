import chroma from 'chroma-js'

export function getTextContrastColor(color) {
  return chroma(color).luminance() > .5 ? '#000' : '#fff'
}