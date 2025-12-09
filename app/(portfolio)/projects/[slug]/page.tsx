'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Github, ImageIcon, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// --- Data & Components ---
import { Projects } from '@/lib/data/projects'
import ProjectGallery from '@/components/project-gallery'
import Button from '@/components/ui/button'

// --- Animations ---
import FadeInAnimation from '@/components/FadeInAnimation'
import { StaggerSection, StaggerItem } from '@/components/stagger-section'

const Page = () => {
  const router = useRouter()
  // 1. Get ID synchronously
  const pathname = usePathname()
  // Safe check to ensure we have a pathname before splitting
  const projectId = pathname ? pathname.split('/')[2] : null

  // 2. Find Data Immediately (No useEffect needed for static data)
  const data = Projects.find((project) => project.id === projectId)

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery-section')
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // 3. Handle Loading / Not Found States
  if (!projectId) return null // Wait for router
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-500">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Button onClick={() => router.back()} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2"/> Go Back
        </Button>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-4 py-12 md:py-20 max-w-4xl mx-auto">
      
      <FadeInAnimation>
        
        {/* BLOCK 1: HEADER INFO */}
        <div className="flex flex-col items-start gap-6 mb-16">
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            {data.name}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl">
            {data.detail}
          </p>

          {/* BUTTONS */}
          <StaggerSection className="flex flex-wrap items-stretch gap-4 pt-2 w-full sm:w-auto">
            
            {/* Live Link */}
            {data.link && (
              <StaggerItem className="flex-1 sm:flex-none">
                <Button
                  href={data.link}
                  target="_blank"
                  variant="primary-s" 
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {data.type.includes("react-native") ? "Download App" : "Visit Live Site"}
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </StaggerItem>
            )}
            
            {/* Source Code */}
            {data.git && (
              <StaggerItem className="flex-1 sm:flex-none">
                <Button
                  href={data.git}
                  target="_blank"
                  variant="secondary-s"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </Button>
              </StaggerItem>
            )}

            {/* Gallery Shortcut */}
            {data.img && data.img.length > 0 && (
              <StaggerItem className="flex-1 sm:flex-none">
                <Button
                  onClick={scrollToGallery}
                  variant="outline-s" 
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  View Gallery
                </Button>
              </StaggerItem>
            )}
          </StaggerSection>

          {/* TAGS */}
          {data.tags && (
            <div className="pt-4">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                Technologies
              </h3>
              <StaggerSection className="flex flex-wrap gap-2" staggerDuration={0.05}>
                {data.tags.map((tag, i) => (
                  <StaggerItem key={i}>
                    <span className="px-3 py-1.5 rounded-md bg-gray-50 dark:bg-zinc-900 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5 block">
                      {tag}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerSection>
            </div>
          )}
        </div>

        {/* BLOCK 2: DIVIDER */}
        <hr className="border-gray-100 dark:border-white/5 mb-16" />

        {/* BLOCK 3: ABOUT SECTION */}
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

        {/* BLOCK 4: GALLERY SECTION */}
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
            
            {/* Passed empty array as fallback if img is somehow undefined */}
            <ProjectGallery images={data.img || []} />
          </section>
        )}

      </FadeInAnimation>
    </main>
  )
}

export default Page