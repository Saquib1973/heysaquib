import { Link } from 'next-view-transitions'
import Image from 'next/image'
import FadeInAnimation from './../components/FadeInAnimation'
import Arrow from '@/components/svg/Arrow'
import StaggerAnimation from '@/components/StaggerAnimation'
import Tech from '@/components/techstack-home-section'
import Projects from '@/components/projects-home-section'
import Blogs from '@/components/blogs-home-section'
import { links } from './about/page'

export default function Home() {
const allowedLinks = ['github', 'linkedin', 'leetcode', 'resume']
const updatedLinks = links.filter((link) => allowedLinks.includes(link.name))

  return (
    <div className="">
      <StaggerAnimation>
        {/* About Section */}
        <AboutSection />
        <div className="flex text-light justify-end items-center pr-10 gap-1">
          {updatedLinks.map((link, index) => (
            <div
                key={index}
                className="cursor-pointer"
            >
              <Link
                href={link.href}
                className="capitalize hover:link-text transition"
                target="_blank"
              >
                {link.name}
              </Link>
              {index < updatedLinks.length - 1 ? ` /` : ''}
            </div>
          ))}
        </div>
        <div className="w-[80%] mt-8 mb-2 max-md:hidden h-[1px] dark:bg-gray-800 bg-gray-200 mx-auto" />
        {/* Skills Section */}
        <Tech />
        {/* Project */}
        <Projects />
        <Blogs />
        {/* <CertificateSection /> */}
      </StaggerAnimation>
    </div>
  )
}

const AboutSection = () => {
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
          <h1 className="rampart-h1 about">ABOUT</h1>
          <div className="txt-light">
            <span className="font-semibold yellow-text-0">
              Hi, I’m Saquib Ali! <span className='text-2xl'>👋</span>
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
            tech, I’m always excited to learn and grow. Let’s connect and create
            something amazing together!{' '}
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
