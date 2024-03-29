export function initCanvas (
  canvas: HTMLCanvasElement,
  width = 400,
  height = 400,
  _dpi?: number
): { ctx: CanvasRenderingContext2D, dpi: number } {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const dpr = window.devicePixelRatio ?? 1
  const bsr = // 安装 hidpi-canvas
    // ctx.webkitBackingStorePixelRatio ||
    // ctx.mozBackingStorePixelRatio ||
    // ctx.msBackingStorePixelRatio ||
    // ctx.oBackingStorePixelRatio ||
    // ctx.backingStorePixelRatio ||
    1

  const dpi = _dpi ?? dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}

export function polar2cart (x = 0, y = 0, r = 0, theta = 0): [number, number] {
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)
  return [x + dx, y + dy]
}

export type Fn = () => void

export interface Controls {
  pause: Fn
  resume: Fn
}
