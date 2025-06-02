import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/getPost'
import BlogTimeComponent from './BlogTimeComponent'
import FadeInAnimation from './FadeInAnimation'

const blogs = getAllPosts()

const BlogItem: React.FC<{ blog: any; index: number }> = ({ blog, index }) => {
  return (
    <div className="py-1 border-b border-dotted dark:border-gray-600 border-gray-300 last:border-b-0 transition-colors duration-150">
      <Link
        href={`/blogs/${blog.slug}`}
        className="block font-sans dark:text-gray-200 text-gray-900 max-md:underline max-md:underline-offset-2 hover:underline transition-all truncate"
        title={blog.title}
      >
        {blog.title}
      </Link>
      <div className="mt-1 flex flex-wrap items-center text-sm dark:text-gray-400 text-gray-600 gap-3 font-light">
        <span className="dark:text-gray-400 text-gray-700">
          Blog Post
        </span>
        <span>•</span>
        <BlogTimeComponent date={blog.date} />
      </div>
    </div>
  )
}

export default async function HomePage() {
  return (
    <FadeInAnimation>
      <div className="md:px-4 p-6">
        <h2 className="text-3xl font-bold mb-4 text-yellow-600">Latest Blogs</h2>
        <div>
          {blogs.map((blog, index) => (
            <BlogItem key={"key"+index} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </FadeInAnimation>
  )
}
