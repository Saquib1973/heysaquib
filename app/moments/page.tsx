'use client'
import { moments } from '@/public/assets/moments'
import Image, { type StaticImageData } from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Close from '@/components/svg/Close'
import Play from '@/components/svg/Play'
import Pause from '@/components/svg/Pause'

const SPOTIFY_ORIGIN = 'https://open.spotify.com'

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [spotifyRef, setSpotifyRef] = useState<HTMLIFrameElement | null>(null)
  const [hasStartedMusic, setHasStartedMusic] = useState(false)

  const nextSlide = useCallback(() => {
    if (selectedImage === null) return

    const nextIndex = selectedImage + 1
    setSelectedImage(nextIndex <= (moments.length - 1) ? nextIndex : 0)
  }, [selectedImage])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(nextSlide, 3000)
      // Only start music if it hasn't been started before
      if (!hasStartedMusic) {
        spotifyRef?.contentWindow?.postMessage({ command: 'play' }, SPOTIFY_ORIGIN)
        setHasStartedMusic(true)
      }
    }
    return () => clearInterval(interval)
  }, [isPlaying, nextSlide, spotifyRef, hasStartedMusic])

  const toggleSlideshow = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying && selectedImage === null) {
      setSelectedImage(0)
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full inset-0 overflow-hidden select-none flex justify-center items-center shadow-md bg-white-1 p-4 py-8 dark:bg-black-1 border z-[1000]"
          >
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <button
                onClick={toggleSlideshow}
                className="p-2 hover:bg-white-1 dark:hover:bg-black-1 rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={() => {
                  setSelectedImage(null)
                  setIsPlaying(false)
                  spotifyRef?.contentWindow?.postMessage({ command: 'pause' }, SPOTIFY_ORIGIN)
                  setHasStartedMusic(false)
                }}
              >
                <Close />
              </button>
            </div>
            <Image
              alt={moments[selectedImage].data.description}
              src={moments[selectedImage].src}
              className="max-h-[80vh] max-w-[90vw] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-2">
        <div className="flex justify-between items-center mb-8">
          <h1 className="rampart-h1">MOMENTS</h1>
          <button
            onClick={() => {
              toggleSlideshow()
              if (isPlaying) {
                spotifyRef?.contentWindow?.postMessage({ command: 'pause' }, SPOTIFY_ORIGIN)
                setHasStartedMusic(false)
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white-1 dark:hover:bg-black-2 hover:bg-white-2 dark:bg-black-1 border transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>Slideshow</span>
          </button>
        </div>
        <MusicPlayer
          className="md:hidden sticky top-[62px] z-50 left-0"
          setSpotifyRef={setSpotifyRef}
        />
        <div className="columns-2 md:columns-3 space-y-1 gap-1">
          {moments.map((moment, index) => {
            return (
              <ImageWrapper
                i={index}
                key={index+10}
                src={moment.src}
                alt={moment.data.description}
                time={moment.data.date}
              />
            )
          })}

          <MusicPlayer
            className="max-md:hidden"
            setSpotifyRef={setSpotifyRef}
          />
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

const MusicPlayer = ({
  className,
  setSpotifyRef
}: {
  className: string;
  setSpotifyRef: (ref: HTMLIFrameElement | null) => void;
}) => {
  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      <iframe
        ref={setSpotifyRef}
        title="Spotify Music Player"
        src="https://open.spotify.com/embed/playlist/5ETraR6wgvcNjQnh3vBFcB?utm_source=generator&theme=0"
        frameBorder="0"
        className="md:aspect-[0.789] w-full max-h-fit"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default Page
