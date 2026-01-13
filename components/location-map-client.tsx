'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const LocationMapClient = () => {
  const [mounted, setMounted] = useState(false)
  const patnaPosition: L.LatLngTuple = [25.6093, 85.1376]

  // Minimal "Pulsing Dot" Marker (Tailwind only)
  const pulseIcon = L.divIcon({
    className: '', 
    html: `
      <div class="relative flex size-3 rounded-full">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span class="relative inline-flex size-3 bg-primary border-2 rounded-full border-white dark:border-zinc-900"></span>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8], 
    popupAnchor: [0, -10],
  })

  // Cleanup to prevent "Map already initialized" errors
  useEffect(() => {
    setMounted(true)
    return () => {
      const container = document.getElementsByClassName('leaflet-container')[0] as HTMLElement
      if (container && (container as any)._leaflet_id) {
        (container as any)._leaflet_id = null
      }
    }
  }, [])

  // Don't render on server to avoid hydration issues
  if (!mounted) {
    return (
      <div className="h-full w-full bg-gray-100 dark:bg-zinc-900 animate-pulse rounded-lg" />
    )
  }

  return (
    <div className="h-full w-full 
      /* TAILWIND MAP FILTERS: */
      [&_.leaflet-tile-pane]:grayscale [&_.leaflet-tile-pane]:contrast-[1.1] 
      dark:[&_.leaflet-tile-pane]:invert dark:[&_.leaflet-tile-pane]:hue-rotate-180 dark:[&_.leaflet-tile-pane]:brightness-75 dark:[&_.leaflet-tile-pane]:contrast-[1.2]
      /* Hide default attribution for cleaner look */
      [&_.leaflet-control-attribution]:hidden
    ">
      <MapContainer
        key="patna-map"
        center={patnaPosition}
        zoom={3} // Zoomed into Patna city level
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={false}
        
        zoomControl={false} // Clean look, no buttons
        className="h-full w-full outline-none z-10"
        style={{ background: 'transparent' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={patnaPosition} icon={pulseIcon}>
          <Popup className="[&_.leaflet-popup-content-wrapper]:!bg-primary [&_.leaflet-popup-content-wrapper]:!p-0 [&_.leaflet-popup-content-wrapper]:!overflow-hidden">
            <div className="px-3 py-2 text-xs font-bold text-gray-800">
              Patna 
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default LocationMapClient