import StaggerAnimation from '@/components/StaggerAnimation'
import AboutSection from '@/components/about-section'
import ExperienceSection from '@/components/experience-section'
import LatestBlogsSection from '@/components/latest-blogs-section'
import MyLocationSection from '@/components/my-location-section'
import OsContributionSection from '@/components/os-contribution-section'
import ProjectsSection from '@/components/projects-section'
import TechnologySection from '@/components/technology-section'
import { Link } from 'next-view-transitions'
import Footer from '@/components/footer'
import { Github, Instagram, Leetcode, Linkedin, Twitter } from '@/components/svg'
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
  // {
  //   name: 'resume',
  //   href: 'https://drive.google.com/file/d/1a5tBPdkgfUi3My75upcW69VVQD8RPjwD/view',
  //   icon: <>Resume</>,
  // },
]
export default function Home() {
  const allowedLinks = ['github', 'linkedin', 'leetcode', 'resume']
  const updatedLinks = links.filter((link) => allowedLinks.includes(link.name))

  return (
    <div className="">
      <StaggerAnimation>
        <AboutSection />
        <div className="flex text-light justify-end items-center border-b border--200 pr-10 gap-1">
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
        <Footer />
      </StaggerAnimation>
    </div>
  )
}


