'use client'
import { useRef, type FC, type CSSProperties, useEffect, useState } from 'react'
import { camel2Kebab } from '@/utils'

const createText = (text: string): string => {
  const canvas = document.createElement('canvas')
  canvas.width = 180
  canvas.height = 150
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = 'rgba(150, 150, 150, 0.05)'
  ctx.rotate((25 * Math.PI) / 180) // 偏转的角度
  ctx.fillText(text, 30, 20) // 绘制文本 绘制开始位置
  return canvas.toDataURL('image/png') // 返回图片的base64
}

const config = {
  childList: true,
  attributes: true,
  subtree: true
}

const getStyle = (url: string): CSSProperties =>
  ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -1,
    backgroundImage: `url(${url})`
  })

const setStyleProperties = (element: HTMLElement, style: CSSProperties): void => {
  for (const key in style) {
    if (Object.hasOwn(style, key)) {
      const value = style[key as keyof CSSProperties]
      element.style.setProperty(camel2Kebab(key), String(value))
    }
  }
}

// TODO:允许自定义水印样式
const WaterMark: FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<CSSProperties>()

  useEffect(() => {
    const url = createText(text)
    const _style = getStyle(url)
    setStyle(_style)
    const mutationCallback = (): void => {
      const targetNode = document.querySelector('#water-mark')
      if (targetNode == null) {
        document.body.appendChild(ref.current as HTMLDivElement)
        return
      }
      // FIXME:这里的判断有问题:stringify之后的肯定是不一样的(小驼峰与中划线比较)
      if (targetNode.getAttribute('style') !== JSON.stringify(_style)) {
        setStyleProperties(targetNode as HTMLElement, _style)
      }
    }
    const observer = new MutationObserver(mutationCallback)
    observer.observe(document.body, config)
    return () => {
      observer.disconnect()
    }
  }, [text])

  return <div ref={ref} id='water-mark' style={style}></div>
}

export default WaterMark
