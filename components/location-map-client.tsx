'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const LocationMapClient = () => {
  // Approximate coordinates for Anisabad area, Patna (not exact address)
  const position: [number, number] = [25.6093, 85.1376]
  const radius = 1500 // 1.5km radius to show general area

  useEffect(() => {
    // Cleanup function to prevent double initialization
    return () => {
      const containers = document.querySelectorAll('.leaflet-container')
      containers.forEach((container) => {
        if ((container as any)._leaflet_id) {
          ;(container as any)._leaflet_id = undefined
        }
      })
    }
  }, [])

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={position}
          radius={radius}
          pathOptions={{
            color: '#FFB300',
            fillColor: '#FFC107',
            fillOpacity: 0.3,
            weight: 2,
          }}
        >
          <Popup>
            <div className="text-center">
              <p className="font-semibold text-lg">📍 Patna, Bihar</p>
              <p className="text-sm text-gray-600">Anisabad Area</p>
              <p className="text-xs text-gray-500 mt-1">India</p>
            </div>
          </Popup>
        </Circle>
      </MapContainer>
    </div>
  )
}

export default LocationMapClient
