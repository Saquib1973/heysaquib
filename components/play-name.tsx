"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function PlayName() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/saquib-audio.mp3')
      audioRef.current.onended = () => setIsPlaying(false)
    }

    if (isPlaying) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    } else {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch((e) => console.error("Audio play failed", e))
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const waveTransition = {
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut",
    repeatType: "mirror" as const
  };

  return (
    <button
      onClick={playAudio}
      aria-label="Pronounce name"
      className="ml-2 mr-1 inline-flex items-center justify-center align-middle focus:outline-none"
    >
      {isPlaying ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-900 dark:text-white"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <motion.path
            d="M15.54 8.46a5 5 0 0 1 0 7.07"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ ...waveTransition, delay: 0 }}
          />
          <motion.path
            d="M19.07 4.93a10 10 0 0 1 0 14.14"
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ ...waveTransition, delay: 0.3 }}
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hover:text-black text-zinc-500 animate-mode dark:hover:text-white"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path
            d="M15.54 8.46a5 5 0 0 1 0 7.07"
          />
          <path
            d="M19.07 4.93a10 10 0 0 1 0 14.14"
          />
        </svg>
      )}
    </button>
  )
}
