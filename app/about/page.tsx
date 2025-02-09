import StaggerAnimation from '@/components/StaggerAnimation'
import Github from '@/components/svg/Github'
import Instagram from '@/components/svg/Instagram'
import Leetcode from '@/components/svg/Leetcode'
import Linkedin from '@/components/svg/Linkedin'
import Twitter from '@/components/svg/Twitter'
import Timeline from '@/components/timeline-about'
import { getDateHelper } from '@/public/utils/helper'
import Image from 'next/image'
import Link from 'next/link'
import FadeInAnimation from './../../components/FadeInAnimation'
import CertificateSection from './../../components/certificates-section'
import QuickLinks from '@/components/quick-links-section'
let lastUpdated = null
export const links = [
  { name: 'github', href: 'https://github.com/Saquib1973', icon: <Github /> },
  { name: 'twitter', href: 'https://x.com/sacubeli', icon: <Twitter /> },
  {
    name: 'leetcode',
    href: 'https://leetcode.com/u/sacube/',
    icon: <Leetcode />,
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/saquibali1973/',
    icon: <Linkedin />,
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com/sacubeli/#',
    icon: <Instagram />,
  },
  {
    name: 'resume',
    href: 'https://drive.google.com/file/d/1a5tBPdkgfUi3My75upcW69VVQD8RPjwD/view',
    icon: <>Resume</>,
  },
]
const page = () => {
  lastUpdated = getDateHelper()
  return (
    <div className="flex flex-col gap-1 gap-y-4 relative w-full justify-center px-2">
      <div className="flex flex-col gap-1 py-2">
        <FadeInAnimation>
          <h1 className="rampart-h1 about ">ABOUT</h1>
          <p className="text-gray-1 text-sm">
            A little bit about the face behind the codes.
          </p>
        </FadeInAnimation>
      </div>
      <div className="flex max-sm:flex-col gap-2 relative ">
        <div className="w-full max-w-[300px] md:max-w-[250px] h-fit md:sticky top-20 max-md:mb-10 mb-[75px] left-0 mx-auto">
          <Image
            className="saquib-image w-full border rounded-sm"
            src="/assets/about-saquib.jpg"
            alt="Saquib Ali PFP"
            width={200}
            height={200}
            layout="intrinsic"
          />
          <p className="text-light text-sm pt-2">
            Student | Fullstack Developer
          </p>
          <div className="flex items-center justify-end gap-2 mr-4 py-4">
            {links.map((link, index) => (
              <Link href={link.href} target='_blank' key={index}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="ml-4 md:ml-10 text-base">
          <div className="mb-4">
            <StaggerAnimation delay={0.1}>
              <strong className="txt text-lg">
                Hi! My name is
                <br />{' '}
                <span className="text-6xl font-happymonkey">
                  <span className="text-yellow-4 text-6xl">Saquib </span>Ali.
                </span>
              </strong>
              <span className="amiko-p"> (You pronounce it as 'saakib')</span>
            </StaggerAnimation>
          </div>
          <FadeInAnimation delay={0.2}>
            <div className="text-light tracking-wide">
              I'm a student living in Ranchi, Jharkhand pursuing my BTech from{' '}
              <Link
                className=" link-text "
                href={'https://iiitranchi.ac.in/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                IIIT Ranchi
              </Link>{' '}
              in Electronics and Communication Engineering. Sleeping, playing
              football and too much of{' '}
              <Link
                className="link-text"
                href="https://tracker.gg/valorant/profile/riot/SheikhChilLi%23devar/overview"
                target="_blank"
                rel="noopener noreferrer"
              >
                Valorant
              </Link>{' '}
              / GTA V are a few of my favorite hobbies.
            </div>
          </FadeInAnimation>
          <StaggerAnimation delay={0.3}>
            <div className=" tracking-wide txt-light">
              I'm currently looking for opportunities related to my skills.{' '}
              <br />
              <br />
              See how I look on paper :{' '}
              <Link
                className="link-text"
                href="https://drive.google.com/file/d/1a5tBPdkgfUi3My75upcW69VVQD8RPjwD/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                resume
              </Link>
            </div>
          </StaggerAnimation>
          <Timeline />
          <p className="text-sm  flex justify-end txt-light2">
            Last Updated on {lastUpdated}
          </p>
        </div>
      </div>
      <CertificateSection />
      <QuickLinks />
    </div>
  )
}

export default page
