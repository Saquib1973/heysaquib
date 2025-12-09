'use client'

import { techstack, categories } from '@/lib/data/techstack'
import Image from 'next/image'
import { StaggerItem, StaggerSection } from './stagger-section'

const TechnologySection = () => {
  // Filter out 'all' from categories to avoid a giant duplicate list
  const displayCategories = categories.filter((c) => c !== 'all')

  return (
    <section className="px-6 py-24 max-w-4xl mx-auto">
      <StaggerSection>
        
        {/* Section Header */}
        <StaggerItem className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Tech Stack
          </h2>
        </StaggerItem>

        <div className="flex flex-col gap-10 md:gap-12">
          {displayCategories.map((category) => {
            // Filter items for this category
            const items = techstack.filter((tech) => tech.type.includes(category))
            if (items.length === 0) return null

            return (
              <StaggerItem key={category}>
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 border-b border-gray-100 dark:border-white/5 pb-10 last:border-0 last:pb-0">
                  
                  {/* Category Label (Left Column) */}
                  <div className="md:w-32 flex-shrink-0 pt-1.5">
                    <span className="text-xs md:text-sm font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      {category}
                    </span>
                  </div>

                  {/* Tech Pills (Right Column) */}
                  <div className="flex flex-wrap gap-2 md:gap-2.5">
                    {items.map((tech) => (
                      <div
                        key={tech.name}
                        className="
                          relative flex items-center gap-2 px-3 py-2 md:py-1.5 
                          bg-white/80 dark:bg-white/5 
                          border border-gray-100 dark:border-white/5 
                          rounded-lg md:rounded-full
                          transition-colors duration-200 
                          hover:bg-white dark:hover:bg-white/10
                        "
                      >
                        <div className="relative w-4 h-4 md:w-3.5 md:h-3.5">
                          <Image 
                            src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        
                        <span className="text-sm md:text-xs font-medium text-gray-700 dark:text-gray-300 cursor-default">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </div>

      </StaggerSection>
    </section>
  )
}

export default TechnologySection