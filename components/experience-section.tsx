'use client'

import { experiences } from '@/lib/data/experience'
import { ArrowUpRight, Eye, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StaggerItem, StaggerSection } from './stagger-section'
import Button from './ui/button'

const ExperienceSection = () => {
  const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    if (selectedExp || selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedExp, selectedImage])

  return (
    <section className="experience px-6 py-24">
      <StaggerSection>

        <StaggerItem className="mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Experience
          </h2>
        </StaggerItem>

        <div className="flex flex-col space-y-12 md:space-y-20">
          {experiences.map((exp, index) => (
            <StaggerItem key={index}>
              <div className="group relative">

                {/* ================= MOBILE LAYOUT (< md) ================= */}
                <div className="md:hidden flex flex-col gap-3 pb-8 border-b border-gray-100 dark:border-white/5 last:border-0 last:pb-0">
                  {/* Top Row: Role + Eye Action */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {exp.role}
                    </h3>
                    <button 
                      onClick={() => setSelectedExp(exp)}
                      className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 active:scale-95 transition-all"
                      aria-label="View details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Bottom Row: Company & Date (Split for width utilization) */}
                  <div className="flex flex-wrap items-center justify-between gap-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                      <span>{exp.company}</span>
                      <span className="text-gray-300 dark:text-gray-700">/</span>
                      <span>{exp.location}</span>
                    </div>
                    
                    {/* Subtle Text Date (Removed the heavy pill background) */}
                    <div className="font-mono text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                      {exp.duration}
                    </div>
                  </div>
                </div>


                {/* ================= DESKTOP LAYOUT (>= md) ================= */}
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
          ))}
        </div>
      </StaggerSection>

      {/* --- EXPERIENCE POPUP (Mobile Only) --- */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] flex items-end sm:items-center justify-center sm:p-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setSelectedExp(null)} 
            />

            {/* Modal Content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#111] rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[85vh] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-start justify-between bg-white dark:bg-[#111] sticky top-0 z-10">
                <div className='pr-4'>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedExp.role}</h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                     {selectedExp.company}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedExp(null)}
                  className="p-2 -mr-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 mb-8 font-normal">
                   {selectedExp.content}
                </div>

                {selectedExp.images && selectedExp.images.length > 0 && (
                  <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
                    {selectedExp.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedImage(img)}
                        className="relative flex-shrink-0 w-40 aspect-[4/3] rounded-lg overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5"
                      >
                         <Image src={img.src} alt={img.alt} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedExp.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>

                {selectedExp.website && (
                  <Button href={selectedExp.website} variant='primary-s' size='md' className="w-full justify-center" target='_blank'>
                    View Project <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- IMAGE ZOOM MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/90 dark:bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <button className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors z-50">
              <X className="w-5 h-5" />
            </button>

            <motion.div
              layoutId={selectedExp ? undefined : `image-${selectedImage.src}-desktop`} 
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