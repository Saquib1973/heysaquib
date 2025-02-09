import React from 'react'
import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import { getAllPosts } from '@/lib/getPost'
const dirContent = fs.readdirSync('blogs', 'utf-8')

const blogs = getAllPosts();
export default async function HomePage() {
  return (
    <>
      <h1 className="amiko-h1 mb-2">Latest Blogs</h1>
      <div className="grid w-full gap-1 py-4 px-2">
        {blogs.map((blog, index) => (
          <Link
            href={`/blogs/${blog.slug}`}
            key={index}
            className={`transition flex group justify-between items-center py-1 w-full hover:border-gray-600 border-gray-200 border-dashed border-b `}
          >
            <h1 className="text-light group-hover:text-balck-2 max-sm:text-sm truncate dark:group-hover:text-gray-2 transition">{blog.title}</h1>
            <div className="txt-light2 text-xs min-w-fit max-sm:hidden">
                {new Date(blog.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
