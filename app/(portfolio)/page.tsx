import Footer from '@/components/footer'
import AboutSection from '@/components/sections/about-section'
import ExperienceSection from '@/components/sections/experience-section'
import OsContributionSection from '@/components/sections/os-contribution-section'
import ProjectsSection from '@/components/sections/projects-section'
import TechnologySection from '@/components/sections/technology-section'
import { StaggerItem, StaggerSection } from '@/components/stagger-section'
import { socialLinks } from '@/lib/data/social-links'
import { Link } from 'next-view-transitions'


export default function Home() {

  return (
    <StaggerSection>
      <div className='px-4'>
        <AboutSection />
        {/* <StaggerItem >

          <div className="flex text-light justify-end items-center gap-1">
            {socialLinks.map((link, index) => (
              <div key={index} className="cursor-pointer">
                <Link
                  href={link.href}
                  className="capitalize hover:text-black dark:hover:text-white  transition-all duration-500"
                  target="_blank"
                >
                  {link.name}
                </Link>
                {index < socialLinks.length - 1 ? ` /` : ''}
              </div>
            ))}
          </div>
        </StaggerItem> */}
        <ExperienceSection />
        <TechnologySection />
        <ProjectsSection />
        <OsContributionSection />
      </div>
      <Footer />
    </StaggerSection>
  )
}


