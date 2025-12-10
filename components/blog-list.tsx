'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Clock } from 'lucide-react'
import Like from '@/components/svg/Like' 

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
}

export interface BlogPost {
  slug: string
  title: string
  description?: string 
  date: string
}

export default function BlogList({ blogs }: { blogs: BlogPost[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  React.useEffect(() => {
    if (blogs.length > 0) setActiveId(blogs[0].slug)
  }, [blogs])

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col space-y-2"
    >
      <AnimatePresence mode='popLayout'>
        {blogs.map((blog, index) => {
          const isActive = activeId === blog.slug
          const indexNumber = index + 1 < 10 ? `0${index + 1}` : index + 1

          return (
            <motion.div
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              key={blog.slug}
              onMouseEnter={() => setActiveId(blog.slug)}
              className={`
                relative border-b border-zinc-200 dark:border-zinc-800 cursor-pointer group overflow-hidden transition-all duration-500
                ${isActive ? 'py-10' : 'py-8 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10'}
              `}
            >
              <Link href={`/blogs/${blog.slug}`} className="block relative z-10">
                
                {/* 1. BACKGROUND NUMBER (Increased Opacity & Size) */}
                <div 
                   className={`
                     absolute -left-2 top-0 font-black leading-none tracking-tighter pointer-events-none select-none z-0 
                     transition-all duration-500 ease-out
                     text-[8rem] md:text-[10rem] 
                     ${isActive 
                       ? 'opacity-[0.08] dark:opacity-[0.1] translate-y-2' // Increased visibility
                       : 'opacity-0 scale-50 translate-y-12'
                     }
                   `}
                >
                   {indexNumber}
                </div>

                {/* Active Line Indicator */}
                <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-900 dark:bg-zinc-100 z-20 hidden md:block"
                    initial={false}
                    animate={{ height: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 px-4 md:px-8">
                    {/* TITLE ROW */}
                    <div className="flex justify-between items-start gap-4 mb-3">
                        <div className="flex items-baseline gap-6 w-full">
                            {/* Small List Number */}
                            <span 
                                className={`font-mono text-sm w-8 transition-all duration-300 hidden md:block flex-shrink-0 ${
                                    isActive 
                                    ? 'opacity-0 -translate-x-4' 
                                    : 'opacity-100 text-zinc-400 translate-x-0'
                                }`}
                            >
                                {indexNumber}
                            </span>

                            <div className="flex flex-col gap-2 w-full">
                                <h2 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-500'}`}>
                                    {blog.title}
                                </h2>
                                
                                {/* Mobile Date */}
                                <div className="flex md:hidden items-center gap-3 text-xs text-zinc-400 font-mono">
                                    <span>{new Date(blog.date).getFullYear()}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Read</span>
                                </div>
                            </div>
                        </div>

                        <div className={`hidden md:flex p-3 rounded-full border transition-all duration-500 flex-shrink-0 ${isActive ? 'bg-black text-white dark:bg-white dark:text-black border-transparent -rotate-45' : 'border-zinc-200 dark:border-zinc-800 text-zinc-400'}`}>
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>

                    {/* EXPANDABLE CONTENT */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            height: isActive ? 'auto' : 0,
                            opacity: isActive ? 1 : 0,
                            marginTop: isActive ? 24 : 0
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden max-md:!h-auto max-md:!opacity-100 max-md:!mt-6"
                    >
                        <div className="pl-0 md:pl-[4.5rem] pr-0 md:pr-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                            <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed max-w-2xl font-medium">
                                {blog.description}
                            </p>

                            <div className="flex items-center gap-8 text-sm font-bold text-zinc-400 md:text-zinc-500 whitespace-nowrap">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(blog.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                                
                                {/* 2. INCREASED LIKE BUTTON SIZE */}
                                <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                                    <div className="scale-125 origin-center">
                                        <Like /> 
                                    </div>
                                </span>
                                
                                <span className="flex items-center gap-1 text-black dark:text-white group-hover:underline md:hidden">
                                    Read Post <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </motion.div>
  )
}