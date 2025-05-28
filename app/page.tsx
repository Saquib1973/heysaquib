import StaggerAnimation from '@/components/StaggerAnimation'
import AboutHomeSection from '@/components/about-home-section'
import Blogs from '@/components/blogs-home-section'
import Experience from '@/components/experience-home-section'
import Projects from '@/components/projects-home-section'
import Tech from '@/components/techstack-home-section'
import { Link } from 'next-view-transitions'
import { links } from './about/page'
export default function Home() {
  const allowedLinks = ['github', 'linkedin', 'leetcode', 'resume']
  const updatedLinks = links.filter((link) => allowedLinks.includes(link.name))

  return (
    <div className="">
      <StaggerAnimation>
        {/* About Section */}
        <AboutHomeSection />
        <div className="flex text-light justify-end items-center pr-10 gap-1">
          {updatedLinks.map((link, index) => (
            <div key={index} className="cursor-pointer">
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
        <Experience />
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


