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
import { ArrowUpRight, Download, FolderOpen, GitBranch, Globe } from 'lucide-react'
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

        <BlurTranslateYItem>
          <FilterDropdown<ProjectType>
            options={CATEGORIES}
            selected={selectedOption}
            onSelect={setSelectedOption}
            placeholder="Category"
          />
        </BlurTranslateYItem>
      </StaggerSection>

      {/* --- PROJECT LIST (BLOCKS) --- */}
      <div className="flex flex-col relative z-0">
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
                  hidden: { opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
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
                  ${isActive ? "bg-white dark:bg-zinc-950 md:bg-gradient-to-br dark:from-zinc-900/50 dark:to-zinc-700/50 from-zinc-50/50 to-zinc-300/50 dark:border-white/10" : "border-transparent bg-white dark:bg-zinc-900 "}
                  relative overflow-hidden group cursor-pointer
                  rounded-[2.5rem] md:rounded-[5rem] transition-all duration-500 ease-out
                  md:border
                  hover:z-10
                `}
              >
                {/* Background Number (Subtle) */}
                <div
                  className={`
                      absolute  right-0 md:-right-4 -bottom-4 md:-bottom-12 font-black leading-none tracking-tighter pointer-events-none select-none z-0 
                      transition-all duration-500 ease-out
                      text-[8rem] md:text-[12rem] 
                      text-zinc-100 dark:text-zinc-800/50
                      ${isActive
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-40 translate-y-4 scale-95'
                    }
                    `}
                >
                  {projectNumber}
                </div>

                <div className="relative z-10 p-5 md:p-8">
                  {/* Header Row */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                        {project.type[0].toUpperCase()}
                      </span>
                      <h2 className={`text-2xl md:text-4xl font-bold transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        {project.name}
                      </h2>
                    </div>

                    {/* Badge */}
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors duration-300 shrink-0 ${project.status === 'live'
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
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden max-md:!h-auto max-md:!opacity-100 max-md:!mt-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-end justify-between">
                      <div className="space-y-6 max-w-2xl">
                        <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed font-medium">
                          {project.detail}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project?.tags?.slice(0, 5).map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800 font-mono text-[10px] px-2 py-1 rounded-full uppercase">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 shrink-0">
                        {/* Source Code */}
                        <Link
                          href={project.git}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          className="group/btn flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all rounded-full"
                        >
                          <GitBranch className="w-4 h-4" />
                          <span className="text-xs font-bold">SOURCE</span>
                        </Link>

                        {/* Website Link (Conditional) */}
                        {project.website && (
                          <Link
                            href={project.website}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-all rounded-full"
                          >
                            <Globe className="w-4 h-4" />
                            <span className="text-xs font-bold">WEBSITE</span>
                            <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Link>
                        )}

                        {/* App Link (Conditional) */}
                        {project.app && (
                          <Link
                            href={project.app}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-all rounded-full"
                          >
                            <Download className="w-4 h-4" />
                            <span className="text-xs font-bold">APP</span>
                            <ArrowUpRight className="w-3 h-3 opacity-50 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Link>
                        )}
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