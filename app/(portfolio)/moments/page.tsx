'use client'

import { moments as importedMoments } from '@/public/assets/moments'
import Image, { type StaticImageData } from 'next/image'
import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Moment {
  src: string | StaticImageData
  data: {
    description: string
    date: string
    type: 'image' | 'video'
  }
}

const Page = () => {
  const moments = useMemo<Moment[]>(() => importedMoments, [])

  return (
    <div className="min-h-screen w-full px-4 py-12 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="rampart-h1 text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            MOMENTS
          </h1>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">
            A collection of memories in time.
          </p>
        </motion.div>

        {/* Masonry Grid Wrapper */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {moments.map((moment, index) => (
              <MomentCard
                key={`${index}-${moment.data.date}`}
                moment={moment}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const MomentCard = ({ moment, index }: { moment: Moment; index: number }) => {
  const isVideo = moment.data.type === 'video'

  // Deterministic rotation based on index to avoid hydration errors
  // Creates a subtle "scattered" feel without being messy
  const rotateValue = index % 2 === 0 ? 1 : -1
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -5, 
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl bg-white dark:bg-neutral-900 transition-shadow duration-300"
      style={{
        // Add a very subtle default tilt for the "scrapbook" feel
        rotate: `${rotateValue}deg`
      }}
    >
      {/* Media Container */}
      <div className="relative w-full overflow-hidden">
        {isVideo ? (
          <video
            src={`/assets/moments/${moment.src}`}
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            alt={moment.data.description}
            src={moment.src}
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Overlay Info (Visible on Hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white font-medium text-lg leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {moment.data.description}
          </p>
          <p className="text-neutral-300 text-xs mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {moment.data.date}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Page