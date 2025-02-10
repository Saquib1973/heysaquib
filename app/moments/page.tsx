'use client'
import { moments } from '@/public/assets/moments'
import Image, { type StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'
const page = () => {
  return (
    <div>
      <div className="px-2">
        <h1 className="rampart-h1 mb-8">MOMENTS</h1>
        <MusicPlayer className="md:hidden" />
        <div className="columns-2 md:columns-3 space-y-1 gap-1">
          {moments.map((moment, index) => {
            return (
              <ImageWrapper
                i={index}
                key={index}
                src={moment.src}
                alt={moment.data.description}
                time={moment.data.date}
              />
            )
          })}

          <MusicPlayer className="max-md:hidden" />
        </div>
      </div>
    </div>
  )
}
const ImageWrapper = ({
  src,
  alt,
  time,
  i,
}: {
  src: string | StaticImageData
  alt: string
  time: string
  i: number
}) => {
  const rotate = ['1deg', '-1deg', '1.5deg']
  const [deg, setDeg] = useState('0deg')
  useEffect(() => {
    let test = Math.floor(Math.random() * 3 + 1)
    setDeg(rotate[test])
  }, [])
  const colors = [
    'bg-green-600 dark:bg-green-400',
    'bg-blue-600 dark:bg-blue-400',
    'bg-yellow-600 dark:bg-yellow-400',
    'bg-red-600 dark:bg-red-400',
    'bg-indigo-600 dark:bg-indigo-400',
    'bg-pink-600 dark:bg-pink-400',
    'bg-purple-600 dark:bg-purple-400',
    'bg-gray-600 dark:bg-gray-400',
    'bg-teal-600 dark:bg-teal-400',
    'bg-orange-600 dark:bg-orange-400',
    'bg-cyan-600 dark:bg-cyan-400',
    'bg-lime-600 dark:bg-lime-400',
    'bg-violet-600 dark:bg-violet-400',
    'bg-lightBlue-600 dark:bg-lightBlue-400',
    'bg-emerald-600 dark:bg-emerald-400',
    'bg-rose-600 dark:bg-rose-400',
    'bg-cyan-600 dark:bg-cyan-400',
    'bg-fuchsia-600 dark:bg-fuchsia-400',
    'bg-sky-600 dark:bg-sky-400',
    'bg-amber-600 dark:bg-amber-400',
  ]
  const length = colors.length

  return (
    <div className={`group relative rotate-[${deg}] ${colors[i % length]}`}>
      <Image
        alt={alt}
        src={src}
        className={`row-span-2 md:grayscale group-hover:grayscale-0 max-h-[400px] transition-all duration-500 w-full`}
      />
      <div className="opacity-0 group-hover:opacity-100 absolute -translate-y-1/2 group-hover:-translate-y-4 -translate-x-full left-0 flex flex-col top-1/2 bg-white-2 text-black-1 dark:bg-black-2 dark:text-white-1  p-2 rounded-l-md border text-center transition-all duration-500 text-sm tracking-tight z-50">
        {alt}
        <span className="text-xs text-light">{time}</span>
      </div>
    </div>
  )
}
const MusicPlayer = ({ className }: { className: string }) => {
  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      <iframe
        src="https://open.spotify.com/embed/playlist/5ETraR6wgvcNjQnh3vBFcB?utm_source=generator&theme=0"
        frameBorder="0"
        className="md:aspect-[0.789] w-full max-h-fit"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}
export default page
