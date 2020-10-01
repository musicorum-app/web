export default {
  hexToRGB: (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`
    else return `rgb(${r}, ${g}, ${b})`
  },

  shadeColor: (hex, percent) => {
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)

    r = parseInt(r * (100 + percent) / 100);
    g = parseInt(g * (100 + percent) / 100);
    b = parseInt(b * (100 + percent) / 100);

    r = r > 255 ? 255 : r
    g = g > 255 ? 255 : g
    b = b > 255 ? 255 : b

    return `rgb(${r}, ${g}, ${b})`
  }
}