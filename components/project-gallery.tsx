'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

// --- Lightbox Component (Unchanged) ---
const Lightbox = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: {
  images: { src: any; text: string }[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-3 rounded-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white z-50 hover:scale-110 transition-transform"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center p-4">
        <AnimatePresence mode="popLayout" custom={currentIndex}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl aspect-video flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x
              if (swipe < -100) onNext()
              if (swipe > 100) onPrev()
            }}
          >
            <div className="relative w-full h-full shadow-2xl overflow-hidden rounded-xl bg-transparent">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].text || ''}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {images[currentIndex].text && (
               <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-gray-600 dark:text-gray-400 font-medium text-center"
               >
                 {images[currentIndex].text}
               </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-4 flex justify-between pointer-events-none px-2 md:px-8">
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="pointer-events-auto p-4 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-md transition-colors disabled:opacity-0"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-8 h-8 text-black dark:text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="pointer-events-auto p-4 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-md transition-colors disabled:opacity-0"
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight className="w-8 h-8 text-black dark:text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// --- Main Gallery Component ---
// FIX: Added default value (images = []) to props to prevent "undefined" map error
const ProjectGallery = ({ images = [] }: { images?: { src: any; text: string }[] }) => {
  const [index, setIndex] = useState(0)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Safety check: If images is still somehow empty or undefined, render nothing
  if (!images || images.length === 0) return null;

  // Lightbox Handlers
  const nextImage = () => setIndex((prev) => (prev + 1 < images.length ? prev + 1 : prev))
  const prevImage = () => setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev))

  // Scroll Listener for Mobile Dots
  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const center = container.scrollLeft + (container.clientWidth / 2)
    
    let closestIndex = 0
    let minDistance = Infinity

    Array.from(container.children).forEach((child, i) => {
        const htmlChild = child as HTMLElement
        const childCenter = htmlChild.offsetLeft + (htmlChild.clientWidth / 2)
        const distance = Math.abs(center - childCenter)
        
        if (distance < minDistance) {
            minDistance = distance
            closestIndex = i
        }
    })

    setMobileActiveIndex(closestIndex)
  }

  const scrollToImage = (idx: number) => {
      if (scrollContainerRef.current) {
          const container = scrollContainerRef.current
          const child = container.children[idx] as HTMLElement
          const scrollLeft = child.offsetLeft - (container.clientWidth / 2) + (child.clientWidth / 2)
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
  }

  return (
    <>
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <Lightbox
              images={images}
              currentIndex={index}
              onClose={() => setIsOpen(false)}
              onNext={nextImage}
              onPrev={prevImage}
            />
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* --- Responsive Layout Wrapper --- */}
      <div className="mt-8 relative">
        
        {/* Mobile: Horizontal Carousel with Hidden Scrollbar */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="
            flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4 
            md:grid md:grid-cols-2 md:gap-6 md:pb-0 md:overflow-visible md:mx-0 md:px-0
            scrollbar-hide 
            [&::-webkit-scrollbar]:hidden 
            [-ms-overflow-style:'none'] 
            [scrollbar-width:'none']
          "
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 cursor-pointer",
                "shrink-0 w-[85vw] h-[60vw] snap-center",
                "md:w-auto md:h-auto md:shrink",
                i === 0 ? "md:col-span-2 md:aspect-[2.35/1]" : "md:aspect-[4/3]"
              )}
              onClick={() => {
                setIndex(i)
                setIsOpen(true)
              }}
            >
              <Image
                src={img.src}
                alt={img.text || `Project Image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              
              <div className="absolute top-3 right-3 p-2 bg-black/30 backdrop-blur-md rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>

              {img.text && (
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium truncate">
                    {img.text}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile: Expanding Dots Pagination */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToImage(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-out",
                mobileActiveIndex === i 
                  ? "w-8 bg-black dark:bg-white" 
                  : "w-2 bg-gray-300 dark:bg-zinc-700"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </>
  )
}

export default ProjectGallery