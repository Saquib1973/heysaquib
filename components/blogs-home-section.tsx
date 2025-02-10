import React from 'react'
import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import { getAllPosts } from '@/lib/getPost'
const dirContent = fs.readdirSync('blogs', 'utf-8')

const blogs = getAllPosts();
export default async function HomePage() {
  return (
    <div className="max-md:px-4 section">
      <h1 className="amiko-h1 mb-2">Latest Blogs</h1>
      <div className="grid w-full gap-1 py-4 pr-2">
        {blogs.map((blog, index) => (
          <Link
            href={`/blogs/${blog.slug}`}
            key={index}
            className={`transition flex group justify-between  items-center py-1 w-full hover:border-gray-2 dark:border-gray-2  dark:hover:border-white-2 border-gray-1 border-dashed border-b `}
          >
            <h1 className="text-light group-hover:text-black-2 max-sm:text-sm truncate dark:group-hover:text-white-2 transition">
              {blog.title}
            </h1>
            <div className="text-light text-xs min-w-fit transition group-hover:text-black-2 max-sm:hidden dark:group-hover:text-white-2">
              {new Date(blog.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
