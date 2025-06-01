'use client' // Enables client-side rendering for this component

import React, { useState, useRef, useEffect } from 'react' // Import React hooks
import {
  PlayIcon,
  RewindIcon,
  UploadIcon,
  PauseIcon,
  FastForward,
} from 'lucide-react' // Import icons from lucide-react
import Image from 'next/image' // Import Next.js Image component
import { useAudioPlayer } from '@/context/AudioPlayerContext'

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
  size?: 'default' | 'icon'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  }
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Card Component
interface CardProps {
  children: React.ReactNode
  className?: string
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>
}

// Progress Component
interface ProgressProps {
  value: number
  className?: string
  onSeek?: (position: number) => void
}

const Progress: React.FC<ProgressProps> = ({ value, className = '', onSeek }) => {
  const progressRef = useRef<HTMLDivElement>(null)

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !onSeek) return

    const rect = progressRef.current.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    // Ensure the position is between 0 and 1
    const boundedPosition = Math.max(0, Math.min(1, clickPosition))
    onSeek(boundedPosition)
  }

  return (
    <div
      ref={progressRef}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className} cursor-pointer`}
      onClick={handleProgressClick}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  )
}

// Define types for the component props and state
interface AudioPlayerProps {}

const AudioPlayerComponent: React.FC<AudioPlayerProps> = () => {
  const {
    audioRef,
    isPlaying,
    currentTrackIndex,
    tracks,
    progress,
    currentTime,
    duration,
    handlePlayPause,
    handleNextTrack,
    handlePrevTrack,
    handleSeek,
    formatTime,
    showExpanded,
    setShowExpanded
  } = useAudioPlayer()

  if (!showExpanded) return null;

  // JSX return statement rendering the Audio Player UI
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-black rounded-xl shadow-2xl w-full max-w-lg mx-auto">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl"
          onClick={() => setShowExpanded(false)}
          aria-label="Close expanded player"
        >
          ✕
        </button>
        <div className="flex flex-col items-center w-full py-12">
          <div className="w-full space-y-6">
            <div className="">
              <CardContent className="flex items-center justify-center gap-6 p-8">
                <div className="rounded-full h-20 aspect-square flex items-center justify-center bg-primary/20 border-border mb-4 select-none mx-auto">
                  <span className="text-4xl font-bold text-primary">
                    {tracks[currentTrackIndex]?.title?.[0] || '?'}
                  </span>
                </div>
                <div className='w-full flex flex-col items-center justify-center gap-2'>
                  <div className="text-center flex flex-col w-full">
                    <h2 className="text-xl font-bold text-primary break-words">
                      {tracks[currentTrackIndex]?.title || 'Audio Title'}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {tracks[currentTrackIndex]?.artist || 'Person Name'}
                    </p>
                  </div>
                  <div className="w-full">
                    <Progress
                      value={progress}
                      onSeek={handleSeek}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevTrack}
                      aria-label="Previous"
                    >
                      <RewindIcon className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePlayPause}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-6 h-6" />
                      ) : (
                        <PlayIcon className="w-6 h-6" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextTrack}
                      aria-label="Next"
                    >
                      <FastForward className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayerComponent
