import path from 'path'
import { readdirSync } from 'fs'

export const mdxPaths = path.join(process.cwd(), 'src/markdowns')

export const mdxFiles = readdirSync(mdxPaths).filter((path) => /\.mdx?$/.test(path))
