'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ExperienceGalleryProps {
  images: { src: string; alt: string }[]
}

export default function ExperienceGallery({ images }: ExperienceGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') closeGallery()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    const handleScroll = (e: Event) => {
      if (e.target) {
        closeGallery()
      }
    }
    const handleClick = (e: Event) => {
      if (!isOpen && e.target instanceof HTMLElement && e.target.id !== 'gallery-container') {
        closeGallery()
      }
    }
    window.addEventListener("click", handleClick)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const openGallery = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
    setIsLoading(true)
  }

  const closeGallery = () => {
    setIsOpen(false)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsLoading(true)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsLoading(true)
  }
  return (
    <>
      <div className="flex gap-2 mt-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative group"
            onClick={() => openGallery(index)}
          >
            <Image
              src={image.src}
              height={64}
              width={64}
              alt={image.alt}
              className="object-cover"
              sizes="64px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            id="gallery-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full inset-0 overflow-hidden select-none flex justify-center items-center bg-white-1 dark:bg-black-1 backdrop-blur-sm z-[1000]"
            onClick={closeGallery}
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 hover:bg-white-1/10 dark:hover:bg-black-1/10 rounded-full transition-colors"
              onClick={closeGallery}
            >
              <X size={24} className="text-yellow-4" />
            </button>

            <div className="relative flex flex-col items-center justify-center w-full px-4 md:px-12">
              <div className="relative max-h-[85vh] w-full max-w-[85vw] md:max-w-[75vw] h-full mx-auto">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2 className="w-8 h-8 text-yellow-4 animate-spin" />
                  </div>
                )}
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  height={1000}
                  width={1000}
                  className="m-2 object-contain w-full h-full rounded-lg shadow-2xl"
                  style={{ maxHeight: '80vh' }}
                  onLoad={() => setIsLoading(false)}
                  priority
                />
                <div className="absolute bottom-0 left-2 -right-2 bg-gradient-to-t from-black-1 to-black-1/90 p-4 rounded-b-lg">
                  <p className="text-white-1 text-sm md:text-base">{images[currentIndex].alt}</p>
                  <p className="text-gray-1 text-xs md:text-sm mt-1">Image {currentIndex + 1} of {images.length}</p>
                </div>
              </div>

              {/* Desktop Navigation Buttons */}
              <button
                className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 p-3 hover:bg-white-1/10 dark:hover:bg-black-1/10 rounded-full transition-colors z-[200] hidden md:block"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft size={32} className="text-yellow-4" />
              </button>

              <button
                className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 p-3 hover:bg-white-1/10 dark:hover:bg-black-1/10 rounded-full transition-colors hidden md:block"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight size={32} className="text-yellow-4" />
              </button>

              {/* Mobile Navigation Buttons */}
              <div className="flex justify-center items-center gap-8 mt-6 md:hidden">
                <button
                  className="p-4 bg-white-1/10 dark:bg-black-1/10 hover:bg-white-1/20 dark:hover:bg-black-1/20 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                >
                  <ChevronLeft size={32} className="text-yellow-4" />
                </button>
                <button
                  className="p-4 bg-white-1/10 dark:bg-black-1/10 hover:bg-white-1/20 dark:hover:bg-black-1/20 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                >
                  <ChevronRight size={32} className="text-yellow-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}