import StaggerAnimation from '@/components/StaggerAnimation'
import AboutSection from '@/components/about-section'
import ExperienceSection from '@/components/experience-section'
import LatestBlogsSection from '@/components/latest-blogs-section'
import MyLocationSection from '@/components/my-location-section'
import OsContributionSection from '@/components/os-contribution-section'
import ProjectsSection from '@/components/projects-section'
import TechnologySection from '@/components/technology-section'
import { Link } from 'next-view-transitions'
import { links } from './about/page'
export default function Home() {
  const allowedLinks = ['github', 'linkedin', 'leetcode', 'resume']
  const updatedLinks = links.filter((link) => allowedLinks.includes(link.name))

  return (
    <div className="">
      <StaggerAnimation>
        <AboutSection />
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
        <ExperienceSection />
        <TechnologySection />
        <ProjectsSection />
        <OsContributionSection />
        <LatestBlogsSection />
        <MyLocationSection />
      </StaggerAnimation>
    </div>
  )
}


