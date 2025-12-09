'use client'

import type { ProjectInterface } from '@/lib/data'
import { Projects } from '@/lib/data/projects'
import { ArrowUpRight, Calendar, Download, Folder, Github } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StaggerItem, StaggerSection } from './stagger-section'
import { Badge } from './ui/badge'
import Button from './ui/button'

// --- Project Card Component ---
const ProjectCard = ({
  project,
  index
}: {
  project: ProjectInterface
  index: number
}) => {
  const router = useRouter()

  // Helper for Status Badge Colors
  // FIXED: Added fallback for undefined status
  const getStatusColor = (status: string = 'building') => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20'
      case 'building': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20'
      default: return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20'
    }
  }

  return (
    <div
      className="relative h-full bg-gray-200 dark:bg-zinc-800 rounded-2xl"
    >
      <div
        onClick={() => router.push(`/projects/${project.id}`)}
        className={`
          relative h-full flex flex-col justify-between
          bg-white-0 dark:bg-black-2 border border-gray-200 dark:border-white/10 rounded-2xl p-6
          cursor-pointer transition-all duration-300 ease-out
          
          /* The Retro "Lift" Effect */
          lg:-translate-x-2 lg:-translate-y-2 
          lg:hover:translate-x-0 lg:hover:translate-y-0
          hover:border-yellow-500 dark:hover:border-yellow-500
        `}
      >
        <div className="flex flex-col gap-5">

          {/* 1. Header: Status & Date */}
          <div className="flex items-center justify-between">
            <div className={`
              px-2.5 py-1 rounded-xl border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5
              ${getStatusColor(project.status || 'building')}
            `}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${project.status === 'live' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              {project.status || 'Building'}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 dark:text-gray-500">
              <Calendar className="w-3 h-3" />
              {project.date}
            </div>
          </div>

          {/* 2. Content: Title & Description */}
          <div className="space-y-3">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-yellow-600 transition-colors">
              {project.name}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
              {project.detail}
            </p>
          </div>

          {/* 3. Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 4).map((tag, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 border-transparent"
              >
                {tag}
              </Badge>
            ))}
          </div>

        </div>

        {/* 4. Footer: Links (Subtle & Clean) */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-white/5" onClick={(e) => e.stopPropagation()}>

          {/* GitHub Link */}
          <Link
            href={project.git}
            target="_blank"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            Source Code
          </Link>

          {/* Live / Download Link */}
          <Link
            href={project.link}
            target="_blank"
            className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors"
          >
            {project.type.includes("react-native") ? (
              <>
                Download App
                <Download className="w-4 h-4" />
              </>
            ) : (
              <>
                Live Demo
                <ArrowUpRight className="w-4 h-4" />
              </>
            )}
          </Link>

        </div>

      </div>
    </div>
  )
}


// --- Main Section Component ---
const ProjectsSection = () => {
  const featuredProjects = Projects.filter((project) => project.featured)

  return (
    <section className="projects px-4 py-24 max-w-5xl mx-auto">
      <StaggerSection>

        {/* Header */}
        <StaggerItem className="flex items-end justify-between mb-12 border-b border-gray-100 dark:border-white/5 pb-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              Projects
              <Folder className="w-6 h-6 text-gray-300 dark:text-gray-700" />
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selected works and experiments.
            </p>
          </div>

          <Button
            href="/projects"
            size='sm'
            variant="secondary"
            className="hidden sm:flex"
          >
            View All Projects
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </StaggerItem>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.id || index}>
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </div>

        {/* Mobile View All Button */}
        <StaggerItem className="mt-8 sm:hidden">
          <Button href="/projects" variant="secondary" className="w-full justify-center">
            View All Projects
          </Button>
        </StaggerItem>

      </StaggerSection>
    </section>
  )
}

export default ProjectsSection