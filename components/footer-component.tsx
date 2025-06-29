'use client'
import { useEffect, useState } from 'react'
import FadeInAnimation from './FadeInAnimation'
import Link from 'next/link'
import { Heart, Star, MessageCircle } from 'lucide-react'

const Footer = () => {
  const [time, setTime] = useState('')
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'

      setIsLive(hours >= 10 && hours < 22)

      hours = hours % 12 || 12
      setTime(`${hours}:${minutes}:${seconds} ${ampm}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="py-4 px-4 footer group">
      <div className="w-[90%] h-px mx-auto md:group-hover:w-full transition-all mb-6 my-2 dark:bg-black-0 bg-gray-0 duration-500 " />
      <FadeInAnimation>
        <div className="flex justify-end gap-2 items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isLive
                  ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50'
                  : 'bg-orange-500 shadow-lg shadow-orange-500/50'
              }`}
            />
          </div>

          <div className="flex py-0.5 text-xs md:text-sm items-center justify-center text-gray-2">
            <p className="text-gray-500 dark:text-gray-400">{time}</p>
          </div>
        </div>
      </FadeInAnimation>
    </div>
  )
}

export default Footer
