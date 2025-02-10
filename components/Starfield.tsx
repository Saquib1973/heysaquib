'use client'
import { useEffect, useRef } from 'react'

interface ColorPalette {
  SHOOTING_STAR: [string, string]
  BACKGROUND: [string, string]
  STAR: [string, string]
}
interface StarLayer {
  speed: number
  scale: number
  count: number
  parallax: number
}
interface ShootingStarConfig {
  MIN_X: number
  MAX_X: number
  MIN_Y_RATIO: number
  MAX_Y_RATIO: number
  MIN_SPEED_X: number
  MAX_SPEED_X: number
  MIN_SPEED_Y: number
  MAX_SPEED_Y: number
  MIN_LENGTH: number
  MAX_LENGTH: number
  FADE_RATE: number
  SPAWN_CHANCE: number
}
interface Point {
  x: number
  y: number
  opacity: number
}
const COLORS: ColorPalette = {
  SHOOTING_STAR: ['#5A6B7A', '#FFD54F'],
  BACKGROUND: ['#F8F9FA', '#1C1C1C'],
  STAR: ['#222831', '#FFB300'],
}
const STAR_LAYERS: StarLayer[] = [
  { speed: 0.015, scale: 0.2, count: 100, parallax: 0.02 },
  { speed: 0.03, scale: 0.5, count: 30, parallax: 0.05 },
  { speed: 0.05, scale: 0.75, count: 15, parallax: 0.1 },
]
const SHOOTING_STAR_CONFIG: ShootingStarConfig = {
  MIN_X: -50,
  MAX_X: -10,
  MIN_Y_RATIO: 0.1,
  MAX_Y_RATIO: 0.6,
  MIN_SPEED_X: 2,
  MAX_SPEED_X: 5,
  MIN_SPEED_Y: -2,
  MAX_SPEED_Y: 2,
  MIN_LENGTH: 10,
  MAX_LENGTH: 30,
  FADE_RATE: 0.008,
  SPAWN_CHANCE: 0.001,
}

const STARS_ANGLE = 120
const MAX_PARALLAX_OFFSET = 30
const TRAIL_LENGTH = 4

class ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  length: number
  trail: Point[]

  constructor(canvas: HTMLCanvasElement) {
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min)
    this.x = randomRange(SHOOTING_STAR_CONFIG.MIN_X, SHOOTING_STAR_CONFIG.MAX_X)
    this.y = randomRange(
      canvas.height * SHOOTING_STAR_CONFIG.MIN_Y_RATIO,
      canvas.height * SHOOTING_STAR_CONFIG.MAX_Y_RATIO
    )
    this.vx = randomRange(
      SHOOTING_STAR_CONFIG.MIN_SPEED_X,
      SHOOTING_STAR_CONFIG.MAX_SPEED_X
    )
    this.vy = randomRange(
      SHOOTING_STAR_CONFIG.MIN_SPEED_Y,
      SHOOTING_STAR_CONFIG.MAX_SPEED_Y
    )
    this.opacity = 1
    this.length = randomRange(
      SHOOTING_STAR_CONFIG.MIN_LENGTH,
      SHOOTING_STAR_CONFIG.MAX_LENGTH
    )
    this.trail = []
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, opacity: this.opacity })
    if (this.trail.length > TRAIL_LENGTH) this.trail.shift()
    this.x += this.vx
    this.y += this.vy
    this.opacity -= SHOOTING_STAR_CONFIG.FADE_RATE
  }

  draw(ctx: CanvasRenderingContext2D) {
    const isDarkMode = document.documentElement.classList.contains('dark')
    ctx.save()
    ctx.strokeStyle = isDarkMode
      ? COLORS.SHOOTING_STAR[1]
      : COLORS.SHOOTING_STAR[0]
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    this.trail.forEach((t) => {
      ctx.globalAlpha = t.opacity
      ctx.lineTo(t.x, t.y)
    })
    ctx.stroke()
    ctx.restore()
  }

  isDead(canvas: HTMLCanvasElement) {
    return this.opacity <= 0 || this.x > canvas.width
  }
}

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const parallaxOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const shootingStars = useRef<ShootingStar[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min)
    const degreesToRads = (degrees: number) => (degrees / 180) * Math.PI

    class Star {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      layer: StarLayer

      constructor(
        x: number,
        y: number,
        speed: number,
        direction: number,
        radius: number,
        layer: StarLayer
      ) {
        this.x = x
        this.y = y
        this.vx = Math.cos(direction) * speed
        this.vy = Math.sin(direction) * speed
        this.radius = radius
        this.layer = layer
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (!canvas) {
          this.x = 0
          this.y = 0
        } else {
          if (this.x > canvas.width) this.x = 0
          if (this.x < 0) this.x = canvas.width
          if (this.y > canvas.height) this.y = 0
          if (this.y < 0) this.y = canvas.height
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const isDarkMode = document.documentElement.classList.contains('dark')
        ctx.fillStyle = isDarkMode ? COLORS.STAR[1] : COLORS.STAR[0]
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
      }
    }

    const stars = STAR_LAYERS.flatMap((layer) =>
      Array.from({ length: layer.count }, () => {
        return new Star(
          randomRange(0, canvas.width),
          randomRange(0, canvas.height),
          layer.speed,
          degreesToRads(STARS_ANGLE),
          2 * layer.scale,
          layer
        )
      })
    )

    const handleMouseMove = (event: MouseEvent) => {
      const targetX =
        ((event.clientX - canvas.width / 2) / canvas.width) *
        MAX_PARALLAX_OFFSET
      const targetY =
        ((event.clientY - canvas.height / 2) / canvas.height) *
        MAX_PARALLAX_OFFSET
      parallaxOffset.current.x += (targetX - parallaxOffset.current.x) * 0.05
      parallaxOffset.current.y += (targetY - parallaxOffset.current.y) * 0.05
    }
    window.addEventListener('mousemove', handleMouseMove)

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isDarkMode = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDarkMode ? COLORS.BACKGROUND[1] : COLORS.BACKGROUND[0]
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.translate(parallaxOffset.current.x, parallaxOffset.current.y)
      stars.forEach((star) => {
        star.update()
        star.draw(ctx)
      })
      ctx.restore()

      if (Math.random() < SHOOTING_STAR_CONFIG.SPAWN_CHANCE) {
        shootingStars.current.push(new ShootingStar(canvas))
      }
      shootingStars.current.forEach((shootingStar, index) => {
        shootingStar.update()
        shootingStar.draw(ctx)
        if (shootingStar.isDead(canvas)) {
          shootingStars.current.splice(index, 1)
        }
      })
      requestAnimationFrame(update)
    }
    update()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="-z-[500]"
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  )
}

export default Starfield
