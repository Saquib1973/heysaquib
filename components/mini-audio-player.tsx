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
      <div
        className="fixed bottom-6 max-md:rounded-full right-6 z-50 border aspect-square shadow-xl w-full max-w-[100px] md:max-w-[150px] flex flex-col items-center justify-end transition-all duration-300 ease-in-out"
        style={playerBackgroundStyle}
      >
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <div className="flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="p-2 hover:bg-yellow-300 hover:text-black rounded-full shadow transition-colors text-yellow-300"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="size-4" />
              ) : (
                <PlayIcon className="size-4" />
              )}
            </button>
          </div>
          <button
            onClick={() => setShowExpanded(true)}
            className={expandCollapseButtonStyle}
            title="Expand Player"
          >
            <ChevronUp className="size-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed border bottom-6 right-6 z-50 shadow-xl flex flex-col items-center min-w-[300px] max-w-sm w-full transition-all duration-300 ease-in-out"
      style={playerBackgroundStyle}
    >
      <div className="flex w-full justify-end items-center mb-4">
        <button
          onClick={() => setShowExpanded(false)}
          className={expandCollapseButtonStyle}
          title="Collapse Player"
        >
          <ChevronDown className="size-4" />
        </button>
        <button
          onClick={closePlayer}
          className="p-2 rounded-full text-xs text-gray-400 hover:text-white transition-colors"
          title="Close"
        >
          ✕
        </button>
      </div>
      <div className="flex flex-col p-2 items-center w-full transition-all duration-300 ease-in-out">
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between text-sm text-gray-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            className="relative h-2 w-full overflow-hidden rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer group shadow-sm"
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
        </div>
      </div>
      <div className="flex items-center gap-6 mt-6 justify-center w-full transition-all duration-300 ease-in-out">
        <PlayerControls
          onPrev={handlePrevTrack}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          isPlaying={isPlaying}
          size="lg"
        />
      </div>

      {/* Playlist Section */}
      <div className="w-full mt-6 bg-white dark:bg-black  pt-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 px-4">Playlist</h3>
        <div className="max-h-[220px] overflow-y-auto transition-all duration-200">
          <div className="flex flex-col">
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
  )
}

export default MiniAudioPlayer
