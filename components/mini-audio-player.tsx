'use client'

import React from 'react'
import { useAudioPlayer } from '@/context/AudioPlayerContext'
import {
  PlayIcon,
  PauseIcon,
  FastForward,
  RewindIcon,
  ChevronUp,
  ChevronDown,
  MusicIcon,
} from 'lucide-react'

// Common styles
const playerBackgroundStyle = {
  backgroundImage: 'url(/assets/rotating-disc.gif)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

const expandCollapseButtonStyle = "p-0.5 absolute max-md:top-2 max-md:left-2 -top-2 -left-2 rounded-full border border-yellow-300 bg-yellow-300 text-black -rotate-45 transition-colors shadow-sm"

// Reusable player controls component
const PlayerControls: React.FC<{
  onPrev: () => void
  onPlayPause: () => void
  onNext: () => void
  isPlaying: boolean
  size?: 'sm' | 'lg'
}> = ({ onPrev, onPlayPause, onNext, isPlaying, size = 'sm' }) => {
  const iconSize = size === 'sm' ? 'size-3 md:size-4' : 'w-8 h-8'
  const buttonSize = size === 'sm' ? 'p-2' : 'p-3'
  const playButtonStyle = size === 'sm'
    ? 'hover:bg-gray-700 rounded-full transition-colors'
    : 'hover:bg-yellow-300 hover:text-black bg-gray-900 rounded-full shadow transition-colors text-yellow-300'

  return (
    <div className="flex items-center gap-2 md:gap-4 justify-center">
      <button
        onClick={onPrev}
        className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        title="Previous"
      >
        <RewindIcon className={iconSize} />
      </button>
      <button
        onClick={onPlayPause}
        className={playButtonStyle}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <PauseIcon className={iconSize} />
        ) : (
          <PlayIcon className={iconSize} />
        )}
      </button>
      <button
        onClick={onNext}
        className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        title="Next"
      >
        <FastForward className={iconSize} />
      </button>
    </div>
  )
}

const PlaylistItem: React.FC<{
  title: string
  artist: string
  isActive: boolean
  isPlaying: boolean
  onClick: () => void
}> = ({ title, artist, isActive, isPlaying, onClick }) => (
  <button
    onClick={onClick}
    aria-current={isActive ? 'true' : undefined}
    className={`w-full text-left px-4 py-2 transition-all flex items-center gap-3 group
      ${isActive
        ? 'dark:bg-white bg-black dark:text-black text-white border border-yellow-200'
        : 'hover:bg-gray-300/40 dark:hover:bg-gray-700/30 text-gray-800 dark:text-gray-200 border border-transparent'}
    `}
    style={{ position: 'relative' }}
  >
    <span className="flex-shrink-0">
      {isActive && isPlaying ? (
        <PauseIcon className="w-4 h-4 text-yellow-400" />
      ) : (
        <PlayIcon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-yellow-400" />
      )}
    </span>
    <span className="flex flex-col min-w-0">
      <span className={`truncate font-medium ${isActive ? 'dark:text-blacktext-white' : 'text-gray-900 dark:text-gray-100'}`}>{title}</span>
      <span className={`truncate text-xs ${isActive ? 'text-yellow-300/80 dark:text-yellow-900/80' : 'text-gray-600 dark:text-gray-400'}`}>{artist}</span>
    </span>
  </button>
)

const MiniAudioPlayer: React.FC = () => {
  const {
    isPlaying,
    handlePlayPause,
    handleNextTrack,
    handlePrevTrack,
    showPlayer,
    showExpanded,
    setShowExpanded,
    closePlayer,
    formatTime,
    currentTime,
    duration,
    progress,
    handleSeek,
    tracks,
    currentTrackIndex,
    handleTrackSelect,
    setShowPlayer,
  } = useAudioPlayer()

  // Add a function to handle track selection with explicit player show
  const handleTrackSelectWithShow = (index: number) => {
    setShowPlayer(true)
    handleTrackSelect(index)
  }

  if (!showPlayer) return null

  if (!showExpanded) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
        <div className="max-w-4xl mx-auto px-4 py-3 bg-white-1 dark:bg-black-1 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            {/* Song Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-black">
                  {tracks[currentTrackIndex]?.title?.[0] || '?'}
                </span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {tracks[currentTrackIndex]?.title || 'Audio Title'}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {tracks[currentTrackIndex]?.artist || 'Person Name'}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevTrack}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                title="Previous"
              >
                <RewindIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-2.5 bg-yellow-300 hover:bg-yellow-400 text-black rounded-full shadow transition-colors"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <PauseIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleNextTrack}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                title="Next"
              >
                <FastForward className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowExpanded(true)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors ml-2"
                title="Expand Player"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2">
            <div
              className="relative h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer group"
              onClick={(e) => {
                const rect = (e.target as HTMLDivElement).getBoundingClientRect()
                const clickPosition = (e.clientX - rect.left) / rect.width
                const boundedPosition = Math.max(0, Math.min(1, clickPosition))
                handleSeek(boundedPosition)
              }}
            >
              <div
                className="h-full bg-yellow-300 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm pt-20">
      <div className="h-full overflow-y-auto">
        <div className="min-h-full flex items-start justify-center p-4 md:p-6">
          <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Now Playing</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowExpanded(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  title="Minimize"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button
                  onClick={closePlayer}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 md:p-8">
              {/* Album Art / Title */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg mb-4">
                  <span className="text-6xl font-bold text-black">
                    {tracks[currentTrackIndex]?.title?.[0] || '?'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">
                  {tracks[currentTrackIndex]?.title || 'Audio Title'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {tracks[currentTrackIndex]?.artist || 'Person Name'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div
                  className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer group"
                  onClick={(e) => {
                    const rect = (e.target as HTMLDivElement).getBoundingClientRect()
                    const clickPosition = (e.clientX - rect.left) / rect.width
                    const boundedPosition = Math.max(0, Math.min(1, clickPosition))
                    handleSeek(boundedPosition)
                  }}
                >
                  <div
                    className="h-full bg-yellow-300 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={handlePrevTrack}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  title="Previous"
                >
                  <RewindIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-4 bg-yellow-300 hover:bg-yellow-400 text-black rounded-full shadow-lg transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-8 h-8" />
                  ) : (
                    <PlayIcon className="w-8 h-8" />
                  )}
                </button>
                <button
                  onClick={handleNextTrack}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  title="Next"
                >
                  <FastForward className="w-6 h-6" />
                </button>
              </div>

              {/* Playlist Section */}
              <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 px-2">Playlist</h3>
                <div className="max-h-[280px] overflow-y-auto">
                  <div className="flex flex-col gap-1">
                    {tracks.map((track, index) => (
                      <PlaylistItem
                        key={track.title + track.artist}
                        title={track.title}
                        artist={track.artist}
                        isActive={index === currentTrackIndex}
                        isPlaying={isPlaying && index === currentTrackIndex}
                        onClick={() => handleTrackSelectWithShow(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniAudioPlayer
