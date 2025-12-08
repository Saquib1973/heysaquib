'use client'

import StaggerAnimation from '@/components/StaggerAnimation'
import type { ProjectInterface } from '@/lib/data'
import { Projects } from '@/lib/data/projects'
import { ArrowUpRight, Github, ImageIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProjectGallery from '@/components/project-gallery'
import Button from '@/components/ui/button' 

const Page = () => {
  const pathname = usePathname().split('/')[2]
  const [data, setData] = useState<ProjectInterface>()

  useEffect(() => {
    const res = Projects.filter((project) => project.id === pathname)
    if (res.length > 0) setData(res[0])
  }, [pathname])

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery-section')
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!data) return <div className="min-h-screen bg-white dark:bg-black" />

  return (
    <StaggerAnimation>
      <main className="min-h-screen px-4 py-12 md:py-20 max-w-4xl mx-auto">
        
        {/* --- Header Section (Centered) --- */}
        <div className="flex flex-col items-start gap-6 mb-16">
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            {data.name}
          </h1>

          {/* Short Description */}
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl">
            {data.detail}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-stretch gap-4 pt-2 w-full sm:w-auto">
            
            {/* 1. Live Link -> primary-s (Dark Pill) */}
            {data.link && (
              <Button
                href={data.link}
                target="_blank"
                variant="primary-s" 
                size="md"
                className="flex-1 sm:flex-none w-full sm:w-auto"
              >
                {data.type.includes("react-native") ? "Download App" : "Visit Live Site"}
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            
            {/* 2. Source Code -> secondary-s (Gray Pill) */}
            {data.git && (
              <Button
                href={data.git}
                target="_blank"
                variant="secondary-s"
                size="md"
                className="flex-1 sm:flex-none w-full sm:w-auto"
              >
                <Github className="w-4 h-4 mr-2" />
                View Source
              </Button>
            )}

            {/* 3. View Gallery -> outline-s (Bordered Pill) */}
            {data.img && data.img.length > 0 && (
              <Button
                onClick={scrollToGallery}
                variant="outline-s" 
                size="md"
                className="flex-1 sm:flex-none w-full sm:w-auto"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                View Gallery
              </Button>
            )}
          </div>

          {/* Technologies / Tags */}
          {data.tags && (
            <div className="pt-4">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 rounded-md bg-gray-50 dark:bg-zinc-900 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- Content Divider --- */}
        <hr className="border-gray-100 dark:border-white/5 mb-16" />

        {/* --- About Section --- */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            About the Project
          </h2>
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
            {data.description.map((desc, index) => (
              <p key={index} className="mb-6 last:mb-0">
                {desc}
              </p>
            ))}
          </div>
        </section>

        {/* --- Gallery Section --- */}
        {data.img && data.img.length > 0 && (
          <section id="gallery-section" className="pt-4">
             <div className="flex items-end justify-between mb-8 border-b border-gray-100 dark:border-white/5 pb-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Project Gallery
                </h2>
                <span className="text-xs font-mono text-gray-400 bg-gray-50 dark:bg-zinc-900 px-2 py-1 rounded border border-gray-100 dark:border-white/5">
                    {data.img.length} SHOTS
                </span>
            </div>
            
            <ProjectGallery images={data.img} />
          </section>
        )}

      </main>
    </StaggerAnimation>
  )
}

export default Page