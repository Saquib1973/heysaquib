'use client'

import { experiences } from '@/lib/data/experience'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { StaggerItem, StaggerSection } from './stagger-section'
import { Badge } from './ui/badge'
// Added ArrowRight for the list view interaction
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Calendar, MapPin, X } from 'lucide-react'

const ExperienceSection = () => {
  const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null)

  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [selectedExp])

  const selectedIndex = selectedExp ? experiences.indexOf(selectedExp) : -1

  return (
    <section className="experience px-4 py-24 max-w-4xl mx-auto relative">
      <StaggerSection>

        {/* Header */}
        <StaggerItem className="flex items-center justify-between mb-16 border-b border-gray-200 dark:border-white/10 pb-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              Experience
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A timeline of my professional career.
            </p>
          </div>
        </StaggerItem>

        {/* The List (Collapsed State) - REDESIGNED */}
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <StaggerItem key={index} className="relative z-0">
              <motion.div
                layoutId={`card-${index}`}
                onClick={() => setSelectedExp(exp)}
                className="group relative cursor-pointer py-8 border-b border-gray-100 dark:border-white/5 transition-colors duration-300 hover:bg-white-2 dark:hover:bg-black-2 -mx-4 px-4 rounded-none"
              >
                <motion.div
                  layout="position"
                  className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] md:items-baseline gap-4 md:gap-8"
                >

                  {/* 1. Date (Left Column) */}
                  <motion.div
                    layoutId={`date-${index}`}
                    className="text-sm font-mono text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors"
                  >
                    {exp.duration}
                  </motion.div>

                  {/* 2. Role & Company (Middle Column) */}
                  <div className="flex flex-col gap-1">
                    <motion.h3
                      layoutId={`role-${index}`}
                      className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                    >
                      {exp.role}
                    </motion.h3>

                    <motion.div
                      layoutId={`company-${index}`}
                      className="text-base text-gray-500 dark:text-gray-400"
                    >
                      {exp.company}
                    </motion.div>
                  </div>

                  {/* 3. Arrow Icon (Right Column - Visible on Hover) */}
                  <div className="hidden md:flex items-center justify-end">
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }} // This triggers when hovering the parent because of 'group' logic if handled via CSS, but framer requires explicit variants or direct styling. 
                      // Simpler approach for Framer Motion inside a group hover:
                      className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out text-gray-400 dark:text-gray-500"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </div>

      </StaggerSection>

      {/* FULL SCREEN MODAL - (Unchanged logic, just layoutId matching) */}
      <AnimatePresence>
        {selectedExp && selectedIndex !== -1 && (
          <div className="fixed inset-0 z-[1000] flex flex-col">
            <motion.div
              layoutId={`card-${selectedIndex}`}
              transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
              className="w-full h-full bg-white-2 dark:bg-black-2 overflow-hidden shadow-none pointer-events-auto relative flex flex-col"
              style={{ borderRadius: 0 }}
            >

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                onClick={(e) => { e.stopPropagation(); setSelectedExp(null); }}
                className="fixed top-6 right-6 p-3 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors z-50 focus:outline-none"
              >
                <X className="w-6 h-6 text-black dark:text-white" />
              </motion.button>

              <div className="w-full h-full overflow-y-auto custom-scrollbar">
                <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-20 pt-20 md:pt-24">

                  {/* Modal Header */}
                  <motion.div layout="position" className="mb-12">
                    <motion.div
                      layoutId={`date-${selectedIndex}`}
                      className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-sm font-mono text-gray-600 dark:text-gray-300 w-fit"
                    >
                      <Calendar className="w-4 h-4" />
                      {selectedExp.duration}
                    </motion.div>

                    <motion.h3
                      layoutId={`role-${selectedIndex}`}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
                    >
                      {selectedExp.role}
                    </motion.h3>

                    <motion.div
                      layoutId={`company-${selectedIndex}`}
                      className="flex flex-wrap items-center gap-4 text-lg md:text-xl text-gray-600 dark:text-gray-300"
                    >
                      <span className="font-semibold text-black dark:text-white">{selectedExp.company}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {selectedExp.location}
                      </span>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-full h-px bg-gray-200 dark:bg-white/10 mb-12 origin-left"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-24"
                  >
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed font-light text-lg md:text-xl space-y-6">
                      {selectedExp.content}
                    </div>

                    <div className="flex flex-col gap-8">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedExp.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {selectedExp.website && (
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Link</h4>
                          <Link
                            href={selectedExp.website}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors underline underline-offset-4 decoration-gray-300 dark:decoration-white/20"
                          >
                            Visit Website
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ExperienceSection