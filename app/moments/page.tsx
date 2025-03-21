'use client'
import Close from '@/components/svg/Close'
import Pause from '@/components/svg/Pause'
import Play from '@/components/svg/Play'
import { moments as importedMoments } from '@/public/assets/moments'
import { AnimatePresence, motion } from 'framer-motion'
import Image, { type StaticImageData } from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'

const SPOTIFY_ORIGIN = 'https://open.spotify.com'
const PLAY_TIME = 4000 // milliseconds

interface Moment {
  src: string | StaticImageData;
  data: {
    description: string;
    date: string;
    type: "image" | "video";
  };
}

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [spotifyRef, setSpotifyRef] = useState<HTMLIFrameElement | null>(null)
  const [hasStartedMusic, setHasStartedMusic] = useState(false)
  const [showMusicModal, setShowMusicModal] = useState(false)
  const [playWithMusic, setPlayWithMusic] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [progress, setProgress] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [slideshowStartTime, setSlideshowStartTime] = useState<number | null>(null)
  const [totalSlideshowDuration, setTotalSlideshowDuration] = useState(0)

  const moments = useMemo<Moment[]>(() => importedMoments, [])

  // Calculate total slideshow duration on client side only
  useEffect(() => {
    const calculateTotalDuration = () => {
      const duration = moments.reduce((total, moment) => {
        return total + (moment.data.type === "video" ?
          (document.querySelector('video')?.duration || 0) * 1000 :
          PLAY_TIME)
      }, 0)
      setTotalSlideshowDuration(duration)
    }

    calculateTotalDuration()
  }, [moments])

  const nextSlide = useCallback(() => {
    if (selectedImage === null) return

    const nextIndex = selectedImage + 1
    if (nextIndex > moments.length - 1) {
      setShowCompletionModal(true)
      setIsPlaying(false)
      if (playWithMusic) {
        spotifyRef?.contentWindow?.postMessage({ command: 'pause' }, SPOTIFY_ORIGIN)
        setHasStartedMusic(false)
      }
    } else {
      setSelectedImage(nextIndex)
    }
  }, [selectedImage, playWithMusic, spotifyRef])

  useEffect(() => {
    let interval: NodeJS.Timeout
    let progressInterval: NodeJS.Timeout
    let videoEndHandler: ((e: Event) => void) | null = null
    let startTime: number | null = null

    if (isPlaying) {
      const currentMoment = moments[selectedImage || 0]
      const isVideo = currentMoment.data.type === "video"
      startTime = Date.now()

      if (!slideshowStartTime) {
        setSlideshowStartTime(Date.now())
      }

      const currentDuration = isVideo ?
        (document.querySelector('video')?.duration || 0) * 1000 :
        PLAY_TIME
      setTotalDuration(currentDuration)

      if (!isVideo) {
        interval = setInterval(nextSlide, PLAY_TIME)
      } else {
        const videoElement = document.querySelector('video')
        if (videoElement) {
          videoElement.loop = false
          videoEndHandler = () => nextSlide()
          videoElement.addEventListener('ended', videoEndHandler)
        }
      }

      if (!hasStartedMusic && playWithMusic) {
        spotifyRef?.contentWindow?.postMessage({ command: 'play' }, SPOTIFY_ORIGIN)
        setHasStartedMusic(true)
      }

      progressInterval = setInterval(() => {
        if (!startTime || !slideshowStartTime || !totalSlideshowDuration) return

        const totalElapsed = Date.now() - slideshowStartTime
        const overallProgress = Math.min((totalElapsed / totalSlideshowDuration) * 100, 100)
        setProgress(overallProgress)
      }, 50)
    }

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
      if (videoEndHandler) {
        const videoElement = document.querySelector('video')
        if (videoElement) {
          videoElement.removeEventListener('ended', videoEndHandler)
          videoElement.loop = true
        }
      }
    }
  }, [isPlaying, nextSlide, spotifyRef, hasStartedMusic, playWithMusic, selectedImage, moments, slideshowStartTime, totalSlideshowDuration])

  useEffect(() => {
    if (isPlaying) {
      setSlideshowStartTime(Date.now())
      setProgress(0)
    } else {
      setSlideshowStartTime(null)
    }
  }, [isPlaying])

  useEffect(() => {
    const videoElement = document.querySelector('video')
    if (videoElement) {
      videoElement.loop = !isPlaying
    }
  }, [isPlaying])

  const toggleSlideshow = () => {
    if (!isPlaying) {
      setShowMusicModal(true)
    } else {
      setIsPlaying(false)
      if (playWithMusic) {
        spotifyRef?.contentWindow?.postMessage({ command: 'pause' }, SPOTIFY_ORIGIN)
        setHasStartedMusic(false)
      }
    }
  }

  const startSlideshow = (withMusic: boolean) => {
    setPlayWithMusic(withMusic)
    setShowMusicModal(false)
    setIsPlaying(true)
    setSelectedImage(0)
    setProgress(0)
  }

  const handleReplay = () => {
    setShowCompletionModal(false)
    setIsPlaying(true)
    setSelectedImage(0)
    setProgress(0)
    if (playWithMusic) {
      spotifyRef?.contentWindow?.postMessage({ command: 'play' }, SPOTIFY_ORIGIN)
      setHasStartedMusic(true)
    }
  }

  const handleExit = () => {
    setShowCompletionModal(false)
    setSelectedImage(null)
    setIsPlaying(false)
    setProgress(0)
    if (playWithMusic) {
      spotifyRef?.contentWindow?.postMessage({ command: 'pause' }, SPOTIFY_ORIGIN)
      setHasStartedMusic(false)
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full inset-0 bg-black-1/80 dark:bg-black-2/80 backdrop-blur-sm z-[1010] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white-0 dark:bg-black-1 p-8 rounded-lg border max-w-md w-full mx-4"
            >
              <h2 className="amiko-h1 text-center mb-2">Slideshow Completed!</h2>
              <p className="text-center text-gray-2 dark:text-gray-1 mb-8">Would you like to watch it again?</p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleReplay}
                  className="flex items-center justify-center gap-2 px-6 py-3 border rounded-full bg-yellow-4 hover:bg-yellow-3 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span>Watch Again</span>
                </button>

                <button
                  onClick={handleExit}
                  className="flex items-center justify-center gap-2 px-6 py-3 border rounded-full bg-white-2 dark:bg-black-2 hover:bg-white-1 dark:hover:bg-black-0 transition-colors group"
                >
                  <span>Exit</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showMusicModal && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowMusicModal(false)}
            className="fixed w-full h-full inset-0 bg-black-1/80 dark:bg-black-2/80 backdrop-blur-sm z-[1000] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white-0 dark:bg-black-1 p-8 rounded-lg border max-w-md w-full mx-4"
            >
              <h2 className="amiko-h1 text-center mb-2">Start Slideshow</h2>
              <p className="text-center text-gray-2 dark:text-gray-1 mb-8">Would you like to play with background music?</p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => startSlideshow(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 border rounded-full bg-yellow-4 hover:bg-yellow-3 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>Yes, with Music</span>
                </button>

                <button
                  onClick={() => startSlideshow(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 border rounded-full bg-white-2 dark:bg-black-2 hover:bg-white-1 dark:hover:bg-black-0 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                  <span>No, without Music</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full inset-0 overflow-hidden select-none flex flex-col justify-center items-center shadow-md bg-white-1 p-4 py-8 dark:bg-black-1 border z-[1000]"
          >
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <button
                onClick={() => {
                  setSelectedImage(null)
                  setIsPlaying(false)
                  setShowCompletionModal(false)
                  spotifyRef?.contentWindow?.postMessage({ command: 'pause' }, SPOTIFY_ORIGIN)
                  setHasStartedMusic(false)
                }}
                className="p-2 hover:bg-white-2 dark:hover:bg-black-2 rounded-full transition-colors"
              >
                <Close />
              </button>
            </div>

            <div className="relative flex items-center justify-center w-full px-4 md:px-12">
              <div className="relative max-h-[85vh] w-full max-w-[85vw] md:max-w-[75vw] h-full mx-auto flex items-center justify-center">
                {moments[selectedImage].data.type === "video" ? (
                  <video
                    src={`/assets/moments/${moments[selectedImage].src}`}
                    className="m-2 object-contain w-full h-full"
                    style={{ maxHeight: '80vh' }}
                    autoPlay
                    muted
                  />
                ) : (
                  <Image
                    alt={moments[selectedImage].data.description}
                    src={moments[selectedImage].src}
                    className="m-2 object-contain w-full h-full"
                    style={{ maxHeight: '80vh' }}
                  />
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white-2/90 dark:bg-black-2/90 backdrop-blur-sm px-4 py-2 rounded-full border text-sm">
                  {moments[selectedImage].data.date}
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-4 md:px-12">
              <div className="w-full bg-white-2 dark:bg-black-2 rounded-full h-2">
                <div
                  className="bg-yellow-4 h-2 rounded-full transition-all duration-50"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-2 dark:text-gray-1">
                <div>
                  {selectedImage + 1} of {moments.length}
                </div>
                <div>
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
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
                type={moment.data.type}
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
  type = "image",
}: {
  src: string | StaticImageData
  alt: string
  time: string
  i: number
  type?: "image" | "video"
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
      {type === "image" ? (
        <Image
          alt={alt}
          src={src}
          className={`row-span-2 md:grayscale group-hover:grayscale-0 max-h-[400px] transition-all duration-500 w-full`}
        />
      ) : (
        <video
          src={`/assets/moments/${src}`}
          className="row-span-2 max-h-[400px] transition-all duration-500 w-full object-cover"
          autoPlay
          muted
        />
      )}
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
