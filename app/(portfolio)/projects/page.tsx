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
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FolderOpen,
  GitBranch,
  Globe
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'

// --- 3D INTERACTIVE STATUS BADGE ---
function StatusBadge({ status = 'live' }: { status?: string }) {
  const isLive = status === 'live'
  const isBuilding = status === 'building'

  const config = isLive
    ? {
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/25 dark:border-emerald-400/30',
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
      shadow:
        'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_4px_rgba(16,185,129,0.12),0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_2px_8px_rgba(16,185,129,0.2)]',
      ledBg: 'bg-emerald-500',
      ledGlow: 'bg-emerald-400 shadow-[0_0_8px_1px_rgba(16,185,129,0.8)]',
      pulseBorder: 'border-emerald-400',
      label: 'Live'
    }
    : isBuilding
      ? {
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-500/25 dark:border-amber-400/30',
        bg: 'bg-amber-500/10 dark:bg-amber-950/40',
        shadow:
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_4px_rgba(245,158,11,0.12),0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_2px_8px_rgba(245,158,11,0.2)]',
        ledBg: 'bg-amber-500',
        ledGlow: 'bg-amber-400 shadow-[0_0_8px_1px_rgba(245,158,11,0.8)]',
        pulseBorder: 'border-amber-400',
        label: 'Building'
      }
      : {
        text: 'text-zinc-600 dark:text-zinc-400',
        border: 'border-zinc-300 dark:border-zinc-700/80',
        bg: 'bg-zinc-200/50 dark:bg-zinc-800/50',
        shadow:
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
        ledBg: 'bg-zinc-400 dark:bg-zinc-500',
        ledGlow: 'bg-zinc-400',
        pulseBorder: 'border-zinc-400',
        label: status
      }

  return (
    <motion.div
      whileHover={{ y: -1, scale: 1.03 }}
      whileTap={{ y: 0.5, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onClick={(e) => e.stopPropagation()}
      className={`
        relative select-none shrink-0 inline-flex items-center gap-2
        px-3 py-1.5 rounded-full backdrop-blur-md
        border ${config.border} ${config.bg} ${config.shadow}
        transition-colors duration-300 cursor-default
      `}
    >
      <div className="relative flex items-center justify-center w-2.5 h-2.5">
        {(isLive || isBuilding) && (
          <motion.span
            animate={{ scale: [1, 2.4], opacity: [0.75, 0] }}
            transition={{ duration: isLive ? 1.8 : 2.4, repeat: Infinity, ease: 'easeOut' }}
            className={`absolute inset-0 rounded-full border ${config.pulseBorder}`}
          />
        )}
        <span className={`absolute w-2.5 h-2.5 rounded-full opacity-60 blur-[2px] ${config.ledGlow}`} />
        <span
          className={`
            relative z-10 w-2 h-2 rounded-full ${config.ledBg}
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.4)]
          `}
        />
      </div>
      <span className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${config.text}`}>
        {config.label}
      </span>
    </motion.div>
  )
}

const CATEGORIES: ProjectType[] = [
  'fullstack', 'frontend', 'backend', 'web3',
  'react-native', 'core', 'design', 'others'
]

export default function ProjectsPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<ProjectType | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

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

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (filteredProjects.length === 0) return

      const currentIndex = filteredProjects.findIndex((p) => p.id === activeId)

      if (e.key === 'ArrowDown' || e.key === 'j') {
        const nextIndex = (currentIndex + 1) % filteredProjects.length
        setActiveId(filteredProjects[nextIndex].id)
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        const prevIndex =
          currentIndex <= 0 ? filteredProjects.length - 1 : currentIndex - 1
        setActiveId(filteredProjects[prevIndex].id)
      } else if (e.key === 'Enter' && activeId) {
        router.push(`/projects/${activeId}`)
      }
    },
    [filteredProjects, activeId, router]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleCopy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${window.location.origin}/projects/${id}`
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 min-h-screen">
      {/* --- HEADER (Lowered to z-20 to avoid navbar collisions) --- */}
      <StaggerSection className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="space-y-2">
          <BlurTranslateYItem>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
              Projects
            </h1>
          </BlurTranslateYItem>
          <BlurTranslateYItem>
            <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-md">
              A curated selection of my digital experiments.
            </p>
          </BlurTranslateYItem>
        </div>

        <BlurTranslateYItem className="flex items-center gap-3">
          {selectedOption && (
            <button
              onClick={() => setSelectedOption(null)}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Reset
            </button>
          )}
          <FilterDropdown<ProjectType>
            options={CATEGORIES}
            selected={selectedOption}
            onSelect={setSelectedOption}
            placeholder="Category"
          />
        </BlurTranslateYItem>
      </StaggerSection>

      {/* --- PROJECT LIST (3D GLASS CARDS WITH FOCUS DIMMING) --- */}
      <div
        onMouseLeave={() => setHoveredId(null)}
        className="flex flex-col gap-6 relative z-0 group/list"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const isActive = activeId === project.id
            const projectNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`

            return (
              <motion.div
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: { duration: 0.35, delay: index * 0.04 }
                  },
                  exit: {
                    opacity: 0,
                    scale: 0.98,
                    filter: 'blur(8px)',
                    transition: { duration: 0.2 }
                  }
                }}
                key={project.id}
                onMouseEnter={() => {
                  setActiveId(project.id)
                  setHoveredId(project.id)
                }}
                onMouseMove={handleMouseMove}
                onClick={() => router.push(`/projects/${project.id}`)}
                className={`
                  relative overflow-hidden group/item cursor-pointer
                  rounded-[2rem] md:rounded-[3.25rem] transition-all duration-500 ease-out
                  backdrop-blur-xl border
                  ${
                  /* Focus Dimming Effect */
                  hoveredId !== null && hoveredId !== project.id
                    ? 'opacity-35 scale-[0.99]'
                    : 'opacity-100 scale-100'
                  }
                  ${
                  /* 3D Glass Layering & Surface Refraction */
                  isActive
                    ? `bg-white/80 dark:bg-zinc-900/60
                         border-zinc-300/90 dark:border-white/15
                         shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.9),inset_0_-1px_1px_0_rgba(0,0,0,0.04)]
                         dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.18),inset_0_-1px_1px_0_rgba(0,0,0,0.4)]`
                    : `bg-white/45 dark:bg-zinc-950/40
                         border-zinc-200/70 dark:border-zinc-800/60
                         shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6)]
                         dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.06)]
                         hover:border-zinc-300 dark:hover:border-zinc-700/80`
                  }
                `}
              >
                {/* 3D Prismatic Top Sheen */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent" />

                {/* Mouse Spotlight */}
                {isActive && (
                  <>
                    <div
                      className="pointer-events-none absolute -inset-px opacity-100 dark:opacity-0 transition-opacity duration-300 rounded-[inherit]"
                      style={{
                        background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.045), transparent 45%)`
                      }}
                    />
                    <div
                      className="pointer-events-none absolute -inset-px opacity-0 dark:opacity-100 transition-opacity duration-300 rounded-[inherit]"
                      style={{
                        background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.07), transparent 45%)`
                      }}
                    />
                  </>
                )}

                {/* Big Background Number */}
                <div
                  className={`
                    absolute right-2 md:-right-2 -bottom-4 md:-bottom-10 font-black leading-none tracking-tighter pointer-events-none select-none z-0 
                    transition-all duration-500 ease-out
                    text-[7rem] md:text-[11rem] 
                    text-zinc-200/60 dark:text-zinc-800/30
                    ${isActive
                      ? 'opacity-100 translate-y-0 scale-100 text-zinc-300/80 dark:text-zinc-800/70'
                      : 'opacity-40 translate-y-3 scale-95'
                    }
                  `}
                >
                  {projectNumber}
                </div>

                <div className="relative z-10 p-6 md:p-9">
                  {/* Header Row */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                          {project.type[0]}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">·</span>
                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                          #{projectNumber}
                        </span>
                      </div>
                      <h2
                        className={`text-2xl md:text-4xl font-bold tracking-tight transition-colors duration-300 flex items-center gap-2.5 ${isActive
                          ? 'text-zinc-950 dark:text-zinc-50'
                          : 'text-zinc-600 dark:text-zinc-400'
                          }`}
                      >
                        <span>{project.name}</span>
                        <ArrowUpRight
                          className={`w-5 h-5 transition-all duration-300 ${isActive
                            ? 'opacity-60 translate-x-0 translate-y-0'
                            : 'opacity-0 -translate-x-2 translate-y-2'
                            }`}
                        />
                      </h2>
                    </div>

                    {/* Badge & Quick Copy */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        onClick={(e) => handleCopy(project.id, e)}
                        title="Copy direct link"
                        className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-800/80 backdrop-blur-md border border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-700/60 transition-all"
                      >
                        {copiedId === project.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                        )}
                      </button>

                      {/* --- 3D STATUS BADGE --- */}
                      <StatusBadge status={project.status} />
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
                    transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden max-md:!h-auto max-md:!opacity-100 max-md:!mt-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-end justify-between pt-2">
                      <div className="space-y-4 max-w-2xl">
                        <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
                          {project.detail}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project?.tags?.slice(0, 6).map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-white/60 dark:bg-zinc-800/50 backdrop-blur-md text-zinc-600 dark:text-zinc-400 border border-zinc-200/70 dark:border-zinc-700/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] font-mono text-[10px] px-2.5 py-0.5 rounded-full uppercase"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
                        {project.git && (
                          <Link
                            href={project.git}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn inline-flex items-center gap-2 px-3.5 py-2 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/70 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-zinc-400 dark:hover:border-zinc-500 transition-all rounded-full text-xs font-mono font-medium hover:scale-[1.02]"
                          >
                            <GitBranch className="w-3.5 h-3.5" />
                            <span>SOURCE</span>
                          </Link>
                        )}

                        {project.website && (
                          <Link
                            href={project.website}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/90 dark:bg-zinc-100/95 backdrop-blur-md text-zinc-100 dark:text-zinc-900 border border-black/10 dark:border-white/20 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8)] hover:opacity-90 transition-all rounded-full text-xs font-mono font-medium hover:scale-[1.02]"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>WEBSITE</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Link>
                        )}

                        {project.app && (
                          <Link
                            href={project.app}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/90 dark:bg-zinc-100/95 backdrop-blur-md text-zinc-100 dark:text-zinc-900 border border-black/10 dark:border-white/20 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] dark:shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8)] hover:opacity-90 transition-all rounded-full text-xs font-mono font-medium hover:scale-[1.02]"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>APP</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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

      {/* --- EMPTY STATE --- */}
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