'use client'
import { sendEmail } from '@/public/utils/helper'
import Link from 'next/link'
import FadeInAnimation from './FadeInAnimation'
import Arrow from './svg/Arrow'
import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

const ContactHomeSection = () => {
  const whatsappLink = `https://wa.me/916202303022?text=Hi%20Saquib!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.`

  return (
    <div className="pt-8 px-4">
      <FadeInAnimation>
        <div className="flex gap-1 gap-y-2 amiko-p py-2 items-center flex-wrap">
          Contact me using{' '}
          <button
            onClick={sendEmail}
            className="flex items-center hover:link-text underline underline-offset-4 transition"
          >
            mail
            <Arrow />
          </button>
          ,{' '}
          <Link
            href={'https://twitter.com/sacubeli'}
            className="flex items-center transition hover:link-text underline underline-offset-4"
          >
            twitter
            <Arrow />
          </Link>
          ,{' '}
          <Link
            href={'https://www.linkedin.com/in/saquib-ali-4a3235219/'}
            className="flex items-center transition hover:link-text underline underline-offset-4"
          >
            linkedIn
            <Arrow />
          </Link>
          ,{' '}
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition hover:link-text underline underline-offset-4"
          >
            <div className="flex items-center gap-1">whatsapp</div>
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
