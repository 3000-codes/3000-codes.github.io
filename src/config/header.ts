import { type ReactNode } from 'react'

export interface MenuConfig {
  title: string
  path: string
  icon?: ReactNode
  subMenu?: Array<Omit<MenuConfig, 'subMenu'>>
}
export const menuConfig: MenuConfig[] = [
  {
    title: 'Home',
    path: '/',
    icon: '🏠'
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: '✍️'
  },
  {
    title: 'Moment',
    path: '/moment',
    icon: '📸'
  },
  {
    title: 'About',
    path: '/about',
    icon: '📚'
  },
  {
    title: 'Contact',
    path: '/contact',
    icon: '📞'
  }
]
