'use client'

import React from 'react'
import { useAudioPlayer } from '@/context/AudioPlayerContext'

const MusicPlayerDemo = () => {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    handlePlayPause,
    setShowPlayer,
  } = useAudioPlayer()

  const handleTrackClick = (index: number) => {
    // Initialize the audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioContext.resume()

    // Either switch tracks or toggle play/pause
    if (currentTrackIndex !== index) {
      // Save to localStorage to persist
      localStorage.setItem('currentTrackIndex', index.toString());

      // Show player explicitly before changing track
      setShowPlayer(true);

      // Update the track directly in the AudioContext
      const event = new CustomEvent('changeTrack', { detail: { index } });
      document.dispatchEvent(event);
    } else {
      // Just toggle play/pause for the current track
      handlePlayPause()
    }
  }

  return (
    <div className="hscreen flex flex-col items-center justify-center p-6">
      <h1 className="rampart-h1 mb-6">Music Player</h1>

      <div className="w-full max-w-md space-y-6">
        <p className="txt-light text-center mb-8">
          Click on any song below to play. A mini player will appear at the bottom right corner.
          Click on the mini player to expand it and access more controls.
        </p>

        <div className="space-y-4">
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => handleTrackClick(index)}
              className={`w-full p-4 text-left rounded-lg transition-all border ${
                currentTrackIndex === index && isPlaying
                  ? 'border-yellow-4 bg-yellow-4/10'
                  : 'border-gray-0 dark:border-black-0 hover:border-yellow-4 hover:bg-yellow-4/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{track.title}</p>
                  <p className="text-sm text-gray-2 dark:text-gray-1">{track.artist}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  currentTrackIndex === index && isPlaying
                    ? 'bg-yellow-4 animate-pulse'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MusicPlayerDemo
