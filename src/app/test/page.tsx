'use client'
import { useState, type FC } from 'react'
const Page: FC = () => {
  const [count, setCount] = useState(0)
  // document.title = `${count} times` // 每次点击都会更新页面标题,第一次render时候不触发
  return (
    <div className="h-screen w-screen">
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        click me
      </button>
    </div>
  )
}

export default Page
