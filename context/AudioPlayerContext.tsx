'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

// Define Track interface
export interface Track {
  title: string
  artist: string
  src: string
}

// Define the initial tracks list
export const tracksList: Track[] = [
  {
    title: "Wavin' Flag",
    artist: "K'naan",
    src: '/music/07-Wavin-Flag.mp3',
  },
  {
    title: 'Night Changes',
    artist: 'One Direction',
    src: '/music/One Direction - Night Changes.mp3',
  },
]

// Define the context shape
interface AudioPlayerContextType {
  tracks: Track[]
  currentTrackIndex: number
  isPlaying: boolean
  progress: number
  currentTime: number
  duration: number
  audioRef: React.RefObject<HTMLAudioElement | null>
  handlePlayPause: () => void
  handleNextTrack: () => void
  handlePrevTrack: () => void
  handleSeek: (position: number) => void
  formatTime: (time: number) => string
  showPlayer: boolean
  showExpanded: boolean
  setShowExpanded: (show: boolean) => void
  closePlayer: () => void
  setShowPlayer: (show: boolean) => void
  handleTrackSelect: (index: number) => void
}

// Create the context with a default value
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)  // Create a provider component
export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks] = useState<Track[]>(tracksList)
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() => {
    // Get stored index from localStorage or default to 0
    const stored = typeof window !== 'undefined' ? localStorage.getItem('currentTrackIndex') : null;
    return stored ? parseInt(stored, 10) : 0;
  })
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [showPlayer, setShowPlayer] = useState<boolean>(false)
  const [showExpanded, setShowExpanded] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Add effect to sync showPlayer with localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('showPlayer')
    if (stored === 'true') {
      setShowPlayer(true)
    }
  }, [])

  // Add effect to update localStorage when showPlayer changes
  useEffect(() => {
    localStorage.setItem('showPlayer', showPlayer.toString())
  }, [showPlayer])

  // Function to handle play/pause toggle
  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(error => {
        console.error("Playback failed:", error)
      })
      setIsPlaying(true)
      // Don't automatically show player on play
    }
  }

  // Function to handle seeking in the audio track
  const handleSeek = (position: number) => {
    if (audioRef.current) {
      const newTime = position * audioRef.current.duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
      setProgress((newTime / audioRef.current.duration) * 100)
    }
  }
  // Function to handle next track
  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % tracks.length;
      localStorage.setItem('currentTrackIndex', newIndex.toString());
      return newIndex;
    })
  }

  // Function to handle previous track
  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? tracks.length - 1 : prevIndex - 1;
      localStorage.setItem('currentTrackIndex', newIndex.toString());
      return newIndex;
    })
  }

  // Function to handle time update of the track
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      )
    }
  }

  // Function to handle metadata load of the track
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  // Function to handle track ending
  const handleTrackEnded = () => {
    handleNextTrack()
  }

  // Function to format time in minutes and seconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  // useEffect to handle track change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
    }
  }, [currentTrackIndex, tracks]);

  // Set up audio event listeners
  useEffect(() => {
    // Set up custom event listener for changing tracks
    const handleChangeTrack = (e: any) => {
      const { index } = e.detail;
      setCurrentTrackIndex(index);
      setShowPlayer(true);
      localStorage.setItem('showPlayer', 'true');
      // Auto play if not already playing
      if (!isPlaying) {
        setTimeout(() => {
          handlePlayPause();
        }, 100);
      }
    };
    document.addEventListener('changeTrack', handleChangeTrack as EventListener);
    return () => {
      document.removeEventListener('changeTrack', handleChangeTrack as EventListener);
    }
  }, [isPlaying]);

  // Add visible state when playing
  useEffect(() => {
    if (isPlaying) {
      setShowPlayer(true)
      localStorage.setItem('showPlayer', 'true')
    }
  }, [isPlaying])

  // Function to close player completely
  const closePlayer = () => {
    setShowPlayer(false)
    setIsPlaying(false)
    localStorage.setItem('showPlayer', 'false')
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  // Add new function to handle track selection
  const handleTrackSelect = (index: number) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentTrackIndex(index);
      localStorage.setItem('currentTrackIndex', index.toString());
      setShowPlayer(true);
      localStorage.setItem('showPlayer', 'true');
      // Auto play if not already playing
      if (!isPlaying) {
        setTimeout(() => {
          handlePlayPause();
        }, 100);
      }
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        tracks,
        currentTrackIndex,
        isPlaying,
        progress,
        currentTime,
        duration,
        audioRef,
        handlePlayPause,
        handleNextTrack,
        handlePrevTrack,
        handleSeek,
        formatTime,
        showPlayer,
        showExpanded,
        setShowExpanded,
        closePlayer,
        setShowPlayer,
        handleTrackSelect
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex]?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnded}
        autoPlay={isPlaying}
      />
    </AudioPlayerContext.Provider>
  )
}

// Create a custom hook to use the context
export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}
