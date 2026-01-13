'use client'

import { experiences } from '@/lib/data/experience'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '../section-header'
import { Section, StaggerItem } from '../stagger-section'

const ExperienceItem = ({ data }: { data: typeof experiences[0] }) => {
  return (
    <Link
      href={data.website}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group/item
        block w-full py-5 px-2 -mx-2
        transition-all duration-500 ease-out
        md:group-hover:opacity-30
        md:hover:!opacity-100
      "
    >
      <article className="flex flex-col sm:grid sm:grid-cols-[180px_1fr_auto] gap-3 sm:gap-6 sm:items-center">

        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
            <Image
              src={data.logo}
              alt={data.company}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
          <span className="text-sm font-mono font-medium text-zinc-600 dark:text-zinc-400 truncate max-w-[120px]">
            {data.company}
          </span>
        </div>

        {/* Role & Tech */}
        <div className="transition-all duration-500 min-w-0 flex flex-col gap-1">
          <h3 className="
            text-base sm:text-lg font-medium 
            text-zinc-900 dark:text-zinc-100 
            transition-colors
          ">
            {data.role}
          </h3>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 mt-0.5">
            <span className="sm:hidden">{data.duration}</span>
            <span className="sm:hidden">•</span>
            <span className="font-mono text-zinc-500 dark:text-zinc-500">
              {data.technologies.slice(0, 4).join(', ')}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6 justify-end text-sm text-zinc-400 dark:text-zinc-500 font-mono shrink-0">
          <span className="transition-colors group-hover/item:text-zinc-600 dark:group-hover/item:text-zinc-300">
            {data.duration}
          </span>

          <ArrowUpRight
            size={18}
            className="
              text-zinc-900 dark:text-white
              transition-all duration-300 ease-out
              translate-x-0 opacity-100
              md:opacity-0 md:-translate-x-4
              md:group-hover/item:translate-x-0 md:group-hover/item:opacity-100
            "
          />
        </div>

      </article>
    </Link>
  )
}

const WorkHistory = () => {
  return (
    <Section className="py-20">
      <SectionHeader text="Work History" />
      <div className="flex flex-col group">
        {experiences.map((exp, index) => (
          <StaggerItem key={index} className="w-full">
            <ExperienceItem data={exp} />
          </StaggerItem>
        ))}
      </div>
    </Section>
  )
}

export default WorkHistory