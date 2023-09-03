import './globals.css'
import { type FC } from 'react'
import type { Metadata } from 'next'
import Texture from '@/components/Texture'

export const metadata: Metadata = {
  title: '一晌贪欢',
  description: 'wellcome to my blog'
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout ({ children }: Props): ReturnType<FC<Props>> {
  return (
    <html lang="en">
      <body>
        <Texture />
        {children}
      </body>
    </html>
  )
}
