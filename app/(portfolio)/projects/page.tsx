'use client'

import {
  BlurItem,
  BlurTranslateYItem,
  StaggerSection
} from '@/components/animations/stagger'
import { Badge } from '@/components/ui/badge'
import FilterDropdown from '@/components/ui/filter-dropdown'
import type { ProjectType } from '@/lib/data'
import { Projects } from '@/lib/data/projects'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, FolderOpen, GitBranch, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CATEGORIES: ProjectType[] = [
  'fullstack', 'frontend', 'backend', 'web3',
  'react-native', 'core', 'design', 'others'
]

export default function ProjectsPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<ProjectType | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  const filteredProjects = selectedOption
    ? Projects.filter((project) => project.type.includes(selectedOption))
    : Projects

  useEffect(() => {
    if (filteredProjects.length > 0) {
      setActiveId(filteredProjects[0].id)
    } else {
      setActiveId(null)
    }
  }, [selectedOption])

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 min-h-screen">

      {/* --- HEADER --- */}
      {/* FIX 1: Added 'relative z-50' to ensure Header sits on top of the Project List */}
      <StaggerSection className="relative z-50 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="space-y-2">
          <BlurTranslateYItem>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
              Projects
            </h1>
          </BlurTranslateYItem>
          <BlurTranslateYItem >
            <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-md">
              A curated selection of my digital experiments.
            </p>
          </BlurTranslateYItem>
        </div>

        {/* FIX 2: Added 'relative z-50' and alignment classes for mobile */}
        <BlurTranslateYItem

        >
          <FilterDropdown<ProjectType>
            options={CATEGORIES}
            selected={selectedOption}
            onSelect={setSelectedOption}
            placeholder="Category"
          />
        </BlurTranslateYItem>
      </StaggerSection>

      {/* --- PROJECT LIST --- */}
      {/* This container has a natural z-index of auto/0, so it will sit BEHIND the header now */}
      <div className="flex flex-col gap-12 md:gap-0 relative z-0">
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project, index) => {
            const isActive = activeId === project.id
            const projectNumber = index + 1 < 10 ? `0${index + 1}` : index + 1

            return (
              <motion.div
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.4, delay: index * 0.05 }
                  },
                  exit: {
                    opacity: 0,
                    scale: 0.95,
                    filter: 'blur(10px)',
                    transition: { duration: 0.2 }
                  }
                }}
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                onClick={() => router.push(`/projects/${project.id}`)}
                className={`
                  relative md:border-b border-zinc-200 dark:border-zinc-800 cursor-pointer group overflow-hidden transition-all duration-500
                  ${isActive ? 'md:py-8' : 'md:py-6 md:hover:bg-zinc-50/50 md:dark:hover:bg-zinc-900/10'}
                `}
              >
                {/* Watermark Number */}
                <div
                  className={`
                     absolute -left-4 top-0 font-black leading-none tracking-tighter pointer-events-none select-none z-0 
                     transition-all duration-500 ease-out
                     text-[6rem] opacity-[0.03] dark:opacity-[0.05] translate-y-0 scale-100
                     md:text-[10rem] 
                     ${isActive
                      ? 'md:opacity-[0.04] md:dark:opacity-[0.06] md:scale-100 md:translate-y-2'
                      : 'md:opacity-0 md:scale-50 md:translate-y-12'
                    }
                   `}
                >
                  {projectNumber}
                </div>

                {/* Active Indicator Line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-900 dark:bg-zinc-100 z-20 hidden md:block"
                  initial={false}
                  animate={{ height: isActive ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 md:px-8">
                  {/* Header Row */}
                  <div className="flex justify-between items-center gap-4 mb-4 md:mb-0">
                    <div className="flex items-center gap-6">
                      <span className={`font-mono text-xs w-6 transition-all duration-300 hidden md:block ${isActive ? 'opacity-0 -translate-x-4' : 'opacity-100 text-zinc-400 translate-x-0'
                        }`}>
                        {projectNumber}
                      </span>

                      <h2 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-zinc-500 dark:text-zinc-500'}`}>
                        {project.name}
                      </h2>
                    </div>

                    {/* Badge */}
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors duration-300 ${project.status === 'live'
                      ? 'bg-green-100/50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                      : project.status === 'building'
                        ? 'bg-yellow-100/50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
                        : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'live' ? 'bg-green-500 animate-pulse' : project.status === 'building' ? 'bg-yellow-500' : 'bg-zinc-400'}`} />
                      <span className="hidden sm:inline">{project.status}</span>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 24 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden max-md:!h-auto max-md:!opacity-100 max-md:!mt-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
                      <div className="md:col-span-8 space-y-6">
                        <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                          {project.detail}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project?.tags?.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-white/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] px-2 py-0.5 rounded-md uppercase">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-4 flex flex-wrap justify-start md:justify-end gap-3 w-full">
                        <Link
                          href={project.git}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="group/btn flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all active:scale-95"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">SOURCE</span>
                        </Link>

                        <Link
                          href={project.link}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="group/btn flex items-center gap-2 px-3 py-1.5 rounded-md bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-all active:scale-95 shadow-sm"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">LIVE DEMO</span>
                          <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <BlurItem className="flex flex-col items-center justify-center py-32 text-zinc-300 dark:text-zinc-700">
          <FolderOpen className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg font-medium text-zinc-500">No projects found.</p>
          <button
            onClick={() => setSelectedOption(null)}
            className="mt-2 text-sm text-zinc-400 underline hover:text-black dark:hover:text-white"
          >
            Clear Filters
          </button>
        </BlurItem>
      )}
    </div>
  )
}