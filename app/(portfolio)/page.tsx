import FadeInAnimation from '@/components/FadeInAnimation'
import AboutSection from '@/components/about-section'
import ExperienceSection from '@/components/experience-section'
import Footer from '@/components/footer'
import OsContributionSection from '@/components/os-contribution-section'
import ProjectsSection from '@/components/projects-section'
import { StaggerItem } from '@/components/stagger-section'
import { Github, Linkedin, Twitter } from '@/components/svg'
import TechnologySection from '@/components/technology-section'
import { Link } from 'next-view-transitions'

const links = [
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/saquibali1973/',
    icon: <Linkedin />,
  },
  { name: 'github', href: 'https://github.com/Saquib1973', icon: <Github /> },
  { name: 'x', href: 'https://x.com/sacubeli', icon: <Twitter /> },
]

export default function Home() {

  return (
    <FadeInAnimation className='px-4'>
      <AboutSection />
      <StaggerItem >

        <div className="flex text-light justify-end items-center gap-1">
          {links.map((link, index) => (
            <div key={index} className="cursor-pointer">
              <Link
                href={link.href}
                className="capitalize hover:link-text transition"
                target="_blank"
              >
                {link.name}
              </Link>
              {index < links.length - 1 ? ` /` : ''}
            </div>
          ))}
        </div>
      </StaggerItem>
      <ExperienceSection />
      <TechnologySection />
      <ProjectsSection />
      <OsContributionSection />
      <Footer />
    </FadeInAnimation>
  )
}


