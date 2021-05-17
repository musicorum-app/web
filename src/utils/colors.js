import chroma from 'chroma-js'

export function getTextContrastColor(color) {
  return chroma(color).luminance() > 0.5 ? '#000' : '#fff'
}
