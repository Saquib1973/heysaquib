'use client'
import { useEffect, useState } from 'react'
import { sendEmail } from '@/public/utils/helper'
import Link from 'next/link'
import FadeInAnimation from './FadeInAnimation'
import Arrow from './svg/Arrow'

const Footer = () => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      setTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-6 px-4 md:p-8 footer group">
      <div className="w-[90%] h-px mx-auto md:group-hover:w-full transition-all mb-6 my-2 dark:bg-black-0 bg-gray-0 duration-500 " />
      <FadeInAnimation>
        <div className="flex gap-1 gap-y-2 amiko-p py-2 items-center flex-wrap">
          Contact me{' '}
          <button onClick={sendEmail} className="flex items-center link-text">
            @saquibali353@gmail.com
          </button>
          ,{' '}
          <Link
            href={'https://twitter.com/sacubeli'}
            className="flex items-center transition hover:link-text"
          >
            twitter
            <Arrow />
          </Link>
          or{' '}
          <Link
            href={'https://www.linkedin.com/in/saquib-ali-4a3235219/'}
            className="flex items-center transition hover:link-text"
          >
            linkedIn
            <Arrow />
          </Link>
          . Check out my{' '}
          <Link
            href={'https://github.com/Saquib1973'}
            className="flex items-center transition hover:link-text"
          >
            github
            <Arrow />
          </Link>
          for more "code".
        </div>
        <div className="flex justify-between text-gray-400">
          <p>Made with ❤️ by Saquib</p>
          <p>Time : {time}</p>
        </div>
      </FadeInAnimation>
    </div>
  )
}

export default Footer
