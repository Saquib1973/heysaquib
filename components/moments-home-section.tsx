'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { moments } from '@/public/assets/moments'
import FadeInAnimation from './FadeInAnimation'

export default function MomentsHomeSection() {
  // Display only the first 8 moments on the home page
  const displayedMoments = moments.slice(0, 8)

  return (
    <FadeInAnimation>
      <div className="md:px-4 p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold dark:text-gray-300 text-gray-700">Memories</h2>
        </div>
        <div className="overflow-x-auto -mx-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-2 pb-2">
            {displayedMoments.map((moment, index) => {
              const colors = [
                'dark:bg-green-600 bg-green-400',
                'dark:bg-blue-600 bg-blue-400',
                'dark:bg-yellow-600 bg-yellow-400',
                'dark:bg-red-600 bg-red-400',
                'dark:bg-indigo-600 bg-indigo-400',
                'dark:bg-pink-600 bg-pink-400',
                'dark:bg-purple-600 bg-purple-400',
                'dark:bg-teal-600 bg-teal-400',
              ]

              return (
                <div
                  key={index}
                  className={`group relative flex-shrink-0 overflow-hidden rounded-sm ${colors[index % colors.length]} w-28 h-36`}
                >
                  {moment.data.type === 'image' ? (
                    <Image
                      alt={moment.data.description || 'Moment'}
                      src={moment.src}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      src={`/assets/moments/${moment.src}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </FadeInAnimation>
  )
}
