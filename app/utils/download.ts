export function downloadFile(blob: Blob, name: string) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.target = "_blank"
  document.getElementById('preload')?.appendChild(a)
  a.click()
  a.remove()
}

export async function downloadImage(src: string, name: string) {
  const blob = await fetch(src).then(r => r.blob())

  downloadFile(blob, name)
}