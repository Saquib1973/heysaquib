import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content')

export type Post = {
  slug: string
  title: string
  date: string
  content: string
  readTime: number
  author?:string
  description?:string
  tags: string[]
}

export function getAllPosts(): Post[] {
  const getFiles = fs.readdirSync(postsDir)

  const posts: Post[] = getFiles.map((filename) => {
    const filePath = path.join(postsDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: filename.replace('.mdx', ''),
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      content,
      readTime: calculateReadTime(content),
      tags: data.tags || [],
    }
  })

  // Sort posts by date
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.mdx`)

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.error(`File not found for slug: ${slug}`)
    return null
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      content,
      readTime: calculateReadTime(content),
      tags: data.tags || [],
    }
  } catch (error) {
    console.error(`Error reading file for slug: ${slug}`, error)
    return null
  }
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
