import React from 'react'
import { getAllPosts } from '@/lib/getPost'
import BlogList from '@/components/blog-list' // Import the client component
import FadeInAnimation from '@/components/FadeInAnimation'

export const metadata = {
  title: 'Blogs | Saquib Ali',
  description: 'Thoughts on software engineering, design, and life.',
}

export default function BlogsPage() {
  const blogs = getAllPosts()

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 min-h-screen">
      
      {/* --- HEADER --- */}
      <FadeInAnimation>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                Writings
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-md">
                Thoughts, tutorials, and rants about technology.
            </p>
            </div>
            
            <div className="text-right hidden md:block">
                <p className="text-6xl font-black text-zinc-100 dark:text-zinc-800/50">
                    {blogs.length < 10 ? `0${blogs.length}` : blogs.length}
                </p>
            </div>
        </div>
      </FadeInAnimation>

      {/* --- CLIENT LIST --- */}
      <BlogList blogs={blogs} />
      
    </div>
  )
}