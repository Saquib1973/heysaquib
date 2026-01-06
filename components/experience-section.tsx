'use client'

import { experiences } from '@/lib/data/experience'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { StaggerItem, StaggerSection } from './stagger-section' // Import animation components
import SectionHeader from './section-header'

const ExperienceTable = () => {
  return (
    <StaggerSection className="py-24">
      
      <SectionHeader text="Experience" />


      <div className="flex flex-col w-full">
        {experiences.map((exp, index) => (
          <StaggerItem key={index} className="w-full">
            <Link 
              href={exp.website} 
              target="_blank"
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 px-4 -mx-4 "
            >
              <div className="flex items-center gap-4 md:w-1/3">
                 <div className="relative w-10 h-10 rounded-full">
                    <Image 
                      src={exp.logo} 
                      alt={exp.company} 
                      fill 
                      className="object-cover rounded-full"
                      onError={(e) => {
                           e.currentTarget.src = `https://ui-avatars.com/api/?name=${exp.company}&background=random`
                           e.currentTarget.srcset = ""
                      }}
                    />
                 </div>
                 <div>
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{exp.company}</h3>
                    <p className="text-xs text-zinc-500">{exp.location}</p>
                 </div>
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                 <div className="flex items-center gap-2">
                    <h4 className="text-zinc-700 dark:text-zinc-300 font-medium group-hover:text-black dark:group-hover:text-white">
                       {exp.role}
                    </h4>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <p className="text-xs text-zinc-400 font-mono mt-1">
                    {exp.technologies.slice(0, 4).join(' • ')}
                 </p>
              </div>

              {/* RIGHT: Date */}
              <div className="mt-4 md:mt-0 text-sm font-mono text-zinc-400 text-right">
                 {exp.duration}
              </div>
            </Link>
          </StaggerItem>
        ))}
      </div>
    </StaggerSection>
  )
}

export default ExperienceTable