import Link from 'next/link'
import React from 'react'
import FadeInAnimation from './FadeInAnimation'
import Arrow from './svg/Arrow'
import Image from 'next/image'
import PenUnderline from './PenUnderline'
import TextRevealWrapper from './text-reveal-wrapper'
const AboutHomeSection = () => {
    return (
      <div className="flex max-md:flex-col section justify-center items-center px-1 gap-1">
        <Image
          className="mx-auto aspect-square w-full max-md:hidden -z-10 rounded-sm md:w-44 saquib-image"
          src="/assets/about-saquib.jpg"
          alt="Saquib Ali PFP"
          width={200}
          height={200}
          layout="intrinsic"
        />
        <div className="flex md:px-4 justify-around ml-1 md:ml-2">
          <FadeInAnimation duration={1}>
            <h1 className="rampart-h1 about">
              <TextRevealWrapper>ABOUT</TextRevealWrapper>
            </h1>
            <div className="txt-light">
              <span className="font-semibold yellow-text-0">
                Hi, I’m <PenUnderline text="Saquib Ali!" />{' '}
                <span className="text-2xl">👋</span>
              </span>
              <br />
              I’m a final-year B.Tech ECE (Hons) student at {` `}
              <Link href={'/'} className="link-text">
                IIIT Ranchi
              </Link>
              , passionate about
              <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                {' '}
                coding, problem-solving, and building software
              </span>
              . I love tackling challenges and creating solutions that make a
              difference. Whether it’s working on algorithms or developing cool
              tech, I’m always excited to learn and grow. Let’s connect and
              create something amazing together!{' '}
              <Link href={'/about'} className="link-text">
                Read more
                <Arrow />
              </Link>
            </div>
          </FadeInAnimation>
        </div>
      </div>
    )
  }

export default AboutHomeSection
