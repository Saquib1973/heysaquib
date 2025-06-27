"use client"
import { AudioPlayerProvider } from './AudioPlayerContext';

export default function ContextWrapper({ children }: { children: React.ReactNode }) {

  return (
    <AudioPlayerProvider>
      {children}
    </AudioPlayerProvider>
  )
}
