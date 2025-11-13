'use client'
import { moments as importedMoments } from '@/public/assets/moments'
import Image, { type StaticImageData } from 'next/image'
import { useMemo, useState, useEffect } from 'react'

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
    <div className="px-2">
      <div className="mb-8">
        <h1 className="rampart-h1">MOMENTS</h1>
      </div>
      <div className="columns-3 lg:columns-4 gap-0.5">
        {moments.map((moment, index) => {
          return (
            <ImageWrapper
              i={index}
              key={index}
              src={moment.src}
              alt={moment.data.description}
              time={moment.data.date}
              type={moment.data.type}
            />
          )
        })}
      </div>
    </div>
  )
}

const ImageWrapper = ({
  src,
  alt,
  time,
  i,
  type = 'image',
}: {
  src: string | StaticImageData
  alt: string
  time: string
  i: number
  type?: 'image' | 'video'
}) => {
  const rotate = ['1deg', '-1deg', '1.5deg']
  const [deg, setDeg] = useState('0deg')
  useEffect(() => {
    let test = Math.floor(Math.random() * 3)
    setDeg(rotate[test])
  }, [])
  const colors = [
    'dark:bg-green-600 bg-green-400',
    'dark:bg-blue-600 bg-blue-400',
    'dark:bg-yellow-600 bg-yellow-400',
    'dark:bg-red-600 bg-red-400',
    'dark:bg-indigo-600 bg-indigo-400',
    'dark:bg-pink-600 bg-pink-400',
    'dark:bg-purple-600 bg-purple-400',
    'dark:bg-gray-600 bg-gray-400',
    'dark:bg-teal-600 bg-teal-400',
    'dark:bg-orange-600 bg-orange-400',
    'dark:bg-cyan-600 bg-cyan-400',
    'dark:bg-lime-600 bg-lime-400',
    'dark:bg-violet-600 bg-violet-400',
    'dark:bg-lightBlue-600 bg-lightBlue-400',
    'dark:bg-emerald-600 bg-emerald-400',
    'dark:bg-rose-600 bg-rose-400',
    'dark:bg-cyan-600 bg-cyan-400',
    'dark:bg-fuchsia-600 bg-fuchsia-400',
    'dark:bg-sky-600 bg-sky-400',
    'dark:bg-amber-600 bg-amber-400',
  ]
  const length = colors.length

  return (
    <div
      className={`group relative  rotate-[${deg}] ${colors[i % length]} mb-1`}
    >
      {type === 'image' ? (
        <Image
          alt={alt}
          src={src}
          className="w-full transition-all duration-500"
        />
      ) : (
        <video
          src={`/assets/moments/${src}`}
          className="w-full transition-all duration-500 object-cover"
          autoPlay
          muted
          loop
        />
      )}
    </div>
  )
}

export default Page
