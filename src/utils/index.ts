const sizeTransform = (size?: number | string): string => {
  const units = ['b', 'kb', 'mb', 'gb', 'tb', 'pb']
  let i = 0
  size = Number(size)
  if (Number.isNaN(size)) return ''
  while (size >= 1024 && i < units.length - 1) {
    size = size / 1024
    i++
  }
  return `${size.toFixed(2)} ${units[i]}`
}

export {
  sizeTransform
}
