'use client'

import { experiences } from '@/lib/data/experience'
import { ArrowUpRight, ChevronDown, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StaggerItem, StaggerSection } from './stagger-section'
import Button from './ui/button'
import { cn } from '@/lib/utils' // Assuming you have a cn utility, if not use standard string interpolation

const ExperienceSection = () => {
  // We use this to track which item is expanded on mobile
  const [expandedId, setExpandedId] = useState<number | null>(null)
  
  // We keep this for the Image Zoom functionality which is still useful
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <section className="py-20">
      <StaggerSection>

        <StaggerItem className="mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Experience
          </h2>
        </StaggerItem>

        <div className="flex flex-col space-y-4 md:space-y-20">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === index;

            return (
              <StaggerItem key={index}>
                <div className="group relative">

                  {/* =========================================================
                      MOBILE REDESIGN: ACCORDION / EXPANDABLE CARD (< md) 
                     ========================================================= */}
                  <div className="md:hidden border-b border-gray-100 dark:border-white/5 last:border-0">
                    
                    {/* TRIGGER HEADER (Always Visible) */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : index)}
                      className="w-full text-left py-6 focus:outline-none"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className={cn(
                            "text-lg font-bold transition-colors duration-200",
                            isExpanded ? "text-black dark:text-white" : "text-gray-900 dark:text-gray-200"
                          )}>
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <span>{exp.company}</span>
                            <span className="text-gray-300 dark:text-gray-700">/</span>
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        
                        {/* Animated Chevron */}
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 tabular-nums">
                            {exp.duration}
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-gray-400 dark:text-gray-600 mt-1"
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>
                    </button>

                    {/* EXPANDABLE CONTENT */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pt-2">
                            {/* Description */}
                            <p className="text-sm leading-7 text-gray-600 dark:text-gray-300 mb-6 font-normal">
                              {exp.content}
                            </p>

                            {/* Images Scroll */}
                            {exp.images && exp.images.length > 0 && (
                              <div className="flex gap-3 mb-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none mask-fade-right">
                                {exp.images.map((img, i) => (
                                  <div
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                                    className="relative flex-shrink-0 w-48 aspect-video rounded-lg overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 shadow-sm"
                                  >
                                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {exp.technologies.map((tech, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wider uppercase text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Link */}
                            {exp.website && (
                              <Button href={exp.website} variant='secondary-s' size='sm' className="w-full justify-center bg-gray-50 dark:bg-white/5" target='_blank'>
                                View Project <ArrowUpRight className="ml-2 w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>


                  {/* =========================================================
                      DESKTOP LAYOUT (Unchanged) 
                     ========================================================= */}
                  <div className="hidden md:block">
                    {/* Header Row */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-mono text-gray-400 dark:text-gray-500 tabular-nums shrink-0">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Sub-header */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {exp.company}
                      </span>
                      <span className="text-gray-300 dark:text-gray-700">/</span>
                      <span>{exp.location}</span>
                    </div>

                    {/* Content */}
                    <div className="text-sm leading-7 text-gray-600 dark:text-gray-300 mb-6 font-normal">
                      {exp.content}
                    </div>

                    {/* Images Grid */}
                    {exp.images && exp.images.length > 0 && (
                      <div className="flex gap-3 mb-6 overflow-y-hidden overflow-x-auto pb-2 scrollbar-none mask-fade-right">
                        {exp.images.map((img, i) => (
                          <motion.div
                            key={`${index}-${i}`}
                            layoutId={`image-${img.src}-desktop`}
                            onClick={() => setSelectedImage(img)}
                            className="relative flex-shrink-0 w-32 aspect-[4/3] rounded-lg overflow-hidden cursor-zoom-in border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase text-gray-600 dark:text-gray-300 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] dark:shadow-none cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {exp.website && (
                        <Button href={exp.website} variant='secondary-s' size='sm' target='_blank'>
                          View Project
                          <ArrowUpRight className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                </div>
              </StaggerItem>
            )
          })}
        </div>
      </StaggerSection>

      {/* --- IMAGE ZOOM MODAL (Shared for Mobile & Desktop) --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-white/95 dark:bg-black/95 backdrop-blur-md cursor-zoom-out"
          >
            <button className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors z-50">
              <X className="w-5 h-5" />
            </button>

            <motion.div
              layoutId={`image-${selectedImage.src}-desktop`}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default ExperienceSection