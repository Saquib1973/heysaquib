'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the entire Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/location-map-client'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[400px] md:my-16 overflow-hidden bg-white-2 dark:bg-black-2 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    </div>
  ),
})

interface LocationMapProps {
  className?: string
}

const LocationMap = ({ className = '' }: LocationMapProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-[300px] md:h-[400px] md:my-16 overflow-hidden bg-white-2 dark:bg-black-2 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
            </div>
          </div>
        </div>
        <div className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>📍 Based in Patna, Bihar, India</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative md:my-16 ${className}`}>
      <Map />
      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        <p>📍 Based in Patna, Bihar, India</p>
      </div>
    </div>
  )
}

export default LocationMap
