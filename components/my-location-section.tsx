'use client'

import dynamic from 'next/dynamic'
import Button from '@/components/ui/button'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { StaggerSection, StaggerItem } from './stagger-section'

// Minimal Skeleton Loader
const MapSkeleton = () => (
  <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 animate-pulse flex items-center justify-center">
    <MapPin className="w-8 h-8 text-zinc-300 dark:text-zinc-700 animate-bounce" />
  </div>
)

const MapClient = dynamic(() => import('./location-map-client'), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

const MyLocationSection = ({ className = '' }: { className?: string }) => {
  return (
    <section className={`px-4 py-24 max-w-4xl mx-auto ${className}`}>
      <StaggerSection>
        
        {/* Header Section */}
        <StaggerItem className="border-b border-gray-200 dark:border-white/5 pb-8 flex items-end justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Where am I?
            </h2>
          </div>

          <Button
            className='flex items-center justify-center'
            href="https://www.google.com/maps/place/Patna"
            target="_blank"
            variant="secondary"
            size="sm"
          >
            Get Directions
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </StaggerItem>

        {/* Map Container */}
        <StaggerItem className="relative w-full h-[400px] overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900/50">
           <MapClient />
        </StaggerItem>

      </StaggerSection>
    </section>
  )
}

export default MyLocationSection