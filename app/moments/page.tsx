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
}: {
  src: string | StaticImageData
  alt: string
  time: string
}) => {
  const rotate = ['1deg', '-1deg', '1.5deg']
  const [deg, setDeg] = useState('0deg')
  useEffect(() => {
    let test = Math.floor(Math.random() * 3 + 1)
    setDeg(rotate[test])
  }, [])

  return (
    <div
      className={`group relative rotate-[${deg}]`}
    >
      <Image
        alt={alt}
        src={src}
        className={`row-span-2 grayscale group-hover:grayscale-0 max-h-[400px] transition-all duration-500 w-full`}
      />
      <div className="opacity-0 group-hover:opacity-100 absolute -translate-y-1/2 group-hover:-translate-y-4 -translate-x-full left-0 flex flex-col top-1/2 bg-white-2 text-black-1 dark:bg-black-2 dark:text-white-1  p-2 rounded-l-md border text-center transition-all duration-500 text-sm tracking-tight z-50">
        {alt}
      <span className="text-xs text-light">
        {time}
      </span>
      </div>
    </div>
  )
}
const MusicPlayer = ({className}:{className:string}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <iframe
        src="https://open.spotify.com/embed/playlist/5ETraR6wgvcNjQnh3vBFcB?utm_source=generator&theme=0"
        frameBorder="0"
        className="md:aspect-[0.789] w-full max-h-[400px] h-full"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}
export default page
