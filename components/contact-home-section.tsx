'use client'
import { sendEmail } from '@/public/utils/helper'
import Link from 'next/link'
import FadeInAnimation from './FadeInAnimation'
import Arrow from './svg/Arrow'

const ContactHomeSection = () => {
  return (
    <div className="pt-8 px-4">
      <FadeInAnimation>
        <div className="flex gap-1 gap-y-2 amiko-p py-2 items-center flex-wrap">
          Contact me{' '}
          <button
            onClick={sendEmail}
            className="flex items-center hover:link-text underline underline-offset-4 transition"
          >
            @saquibali353@gmail.com
          </button>
          ,{' '}
          <Link
            href={'https://twitter.com/sacubeli'}
            className="flex items-center transition hover:link-text underline underline-offset-4"
          >
            twitter
            <Arrow />
          </Link>
          or{' '}
          <Link
            href={'https://www.linkedin.com/in/saquib-ali-4a3235219/'}
            className="flex items-center transition hover:link-text underline underline-offset-4"
          >
            linkedIn
            <Arrow />
          </Link>
          . Check out my{' '}
          <Link
            href={'https://github.com/Saquib1973'}
            className="flex items-center transition hover:link-text underline underline-offset-4"
          >
            github
            <Arrow />
          </Link>
          for more "code"
        </div>
      </FadeInAnimation>
    </div>
  )
}

export default ContactHomeSection
