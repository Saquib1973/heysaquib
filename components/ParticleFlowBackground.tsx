'use client'
import { useEffect, useRef, useState } from 'react'

const RAINDROP_COUNT = 150
const RAINDROP_MIN_LENGTH = 4
const RAINDROP_MAX_LENGTH = 18
const RAINDROP_MIN_SPEED = 0.2
const RAINDROP_MAX_SPEED = 1.5
const RAINDROP_MIN_ALPHA = 0.12
const RAINDROP_MAX_ALPHA = 0.4
const BG_LIGHT = '#F8F9FA'
const BG_DARK = '#1C1C1C'
const RAINDROP_COLOR_LIGHT = '#b7babd'
const RAINDROP_COLOR_DARK = '#404040'
const WIND_STRENGTH = 0.8 // Increased for more visible wind effect
const WIND_FREQUENCY = 0.003 // Faster wind oscillation
const WIND_AMPLITUDE = 40 // Increased amplitude for more dramatic wind

interface Raindrop {
  x: number
  y: number
  length: number
  speed: number
  alpha: number
  windOffset: number
  originalX: number
  windPhase: number // Individual wind phase for variation
}

const generateRaindrops = (count: number, width: number, height: number): Raindrop[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    length: RAINDROP_MIN_LENGTH + Math.random() * (RAINDROP_MAX_LENGTH - RAINDROP_MIN_LENGTH),
    speed: RAINDROP_MIN_SPEED + Math.random() * (RAINDROP_MAX_SPEED - RAINDROP_MIN_SPEED),
    alpha: RAINDROP_MIN_ALPHA + Math.random() * (RAINDROP_MAX_ALPHA - RAINDROP_MIN_ALPHA),
    windOffset: (Math.random() - 0.5) * 1.2, // Increased wind variation
    originalX: Math.random() * width,
    windPhase: Math.random() * Math.PI * 2, // Random starting phase
  }))
}

const ParticleFlowBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const raindropsRef = useRef<Raindrop[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const timeRef = useRef(0)

  useEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    updateDarkMode()
    const observer = new MutationObserver(updateDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvasAndRaindrops = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      raindropsRef.current = generateRaindrops(RAINDROP_COUNT, canvas.width, canvas.height)
    }
    resizeCanvasAndRaindrops()
    window.addEventListener('resize', resizeCanvasAndRaindrops)

    let animationId: number
    const animate = () => {
      timeRef.current += 0.016 // Approximate 60fps

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = isDarkMode ? BG_DARK : BG_LIGHT
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const raindropColor = isDarkMode ? RAINDROP_COLOR_DARK : RAINDROP_COLOR_LIGHT

      // Stronger global wind effect that oscillates over time
      const globalWind = Math.sin(timeRef.current * WIND_FREQUENCY) * WIND_STRENGTH
      const windAmplitude = Math.sin(timeRef.current * 0.002) * WIND_AMPLITUDE

      for (const raindrop of raindropsRef.current) {
        // Update position with variable speed and strong wind effect
        raindrop.y += raindrop.speed

        // Enhanced wind effect with individual variation
        const individualWind = Math.sin(timeRef.current * 0.001 + raindrop.windPhase) * raindrop.windOffset
        const totalWind = globalWind + individualWind

        // Apply wind effect to X position with amplitude
        raindrop.x = raindrop.originalX + (totalWind * windAmplitude) +
                     Math.sin(timeRef.current * 0.001 + raindrop.originalX * 0.005) * 15

        // Reset raindrop if it goes off screen
        if (raindrop.y > canvas.height + raindrop.length) {
          raindrop.y = -raindrop.length
          raindrop.x = Math.random() * canvas.width
          raindrop.originalX = raindrop.x
          raindrop.windOffset = (Math.random() - 0.5) * 1.2
          raindrop.windPhase = Math.random() * Math.PI * 2
          raindrop.speed = RAINDROP_MIN_SPEED + Math.random() * (RAINDROP_MAX_SPEED - RAINDROP_MIN_SPEED)
        }

        // Reset raindrop if it goes too far horizontally
        if (raindrop.x > canvas.width + 30) {
          raindrop.x = -30
          raindrop.originalX = raindrop.x
          raindrop.y = Math.random() * canvas.height
        }
        if (raindrop.x < -30) {
          raindrop.x = canvas.width + 30
          raindrop.originalX = raindrop.x
          raindrop.y = Math.random() * canvas.height
        }

        // Draw raindrop with variable thickness based on speed
        ctx.save()
        ctx.globalAlpha = raindrop.alpha
        ctx.strokeStyle = raindropColor
        ctx.lineWidth = Math.max(0.5, raindrop.speed * 0.8) // Thicker lines for faster raindrops
        ctx.lineCap = 'round'

        // Enhanced glow effect for faster raindrops
        ctx.shadowColor = raindropColor
        ctx.shadowBlur = Math.max(1, raindrop.speed * 2)

        // Smooth line drawing
        ctx.beginPath()
        ctx.moveTo(raindrop.x, raindrop.y)
        ctx.lineTo(raindrop.x, raindrop.y + raindrop.length)
        ctx.stroke()
        ctx.restore()
      }
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvasAndRaindrops)
      cancelAnimationFrame(animationId)
    }
  }, [isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      className="-z-[500]"
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  )
}

export default ParticleFlowBackground
