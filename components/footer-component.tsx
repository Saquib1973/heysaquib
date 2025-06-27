'use client'
import { useEffect, useState } from 'react'
import FadeInAnimation from './FadeInAnimation'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'

const Footer = () => {
  const [time, setTime] = useState('')
  const [visitorCount, setVisitorCount] = useState(0)
  useEffect(() => {
    const fetchVisitorCount = async () => {
      const res = await fetch('/api/visitor?q=count')
      const data = await res.json()
      setVisitorCount(data.count)
    }
    const interval = setInterval(fetchVisitorCount, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'

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
        <div className="flex justify-between items-center">
          <div className="flex gap-2 justify-center items-center">
            <Link
              href="https://github.com/Saquib1973/saquib-ali-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 underline-offset-4 underline"
            >
              Github
            </Link>
          </div>

          <div className="flex py-0.5 text-xs md:text-sm items-center justify-center text-gray-2">
            <p className="text-gray-500 dark:text-gray-400">{time}</p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {visitorCount > 1 ? `Visitors : ${visitorCount}` : 'Visitor : 1'}
          </div>
        </div>
      </FadeInAnimation>
    </div>
  )
}

export default Footer
