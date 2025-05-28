import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/getPost'
import BlogTimeComponent from './BlogTimeComponent'

const blogs = getAllPosts()
export default async function HomePage() {
  return (
    <div className="max-md:px-4 section">
      <h1 className="amiko-h1 mb-6">
        Latest Blogs
      </h1>
      <div className="grid w-full gap-0 pr-2">
        {blogs.map((blog, index) => (
          <Link
            href={`/blogs/${blog.slug}`}
            key={"key"+index}
            className="group relative overflow-hidden p-2 transition-colors duration-300"
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {blog.title}
              </h1>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <BlogTimeComponent date={blog.date} />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  →
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gray-200 dark:bg-gray-700" />
          </Link>
        ))}
      </div>
    </div>
  )
}
