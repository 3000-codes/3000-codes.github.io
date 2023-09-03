'use client'
import { type FC } from 'react'
import Test from '@/components/Test'
import AeolianBell from '@/components/AeolianBell'

const Home: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Hello World</h1>
        <p className="text-2xl">Wellcome !</p>
        <Test />
        <AeolianBell />
      </div>
    </div>
  )
}

export default Home
