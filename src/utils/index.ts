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

const camel2Kebab = (str: string): string => str.replace(/([A-Z])/g, '-$1').toLowerCase()

function add (a: number, b: number): number
function add (a: string, b: string): string
function add (a: string, b: number): string
function add (a: number, b: string): string
function add (a: any, b: any): any {
  return a + b
}

export {
  sizeTransform, add, camel2Kebab
}
