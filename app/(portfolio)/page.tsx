import Footer from '@/components/footer'
import AboutSection from '@/components/sections/about-section'
import WorkHistorySection from '@/components/sections/work-history'
import OsContributionSection from '@/components/sections/os-contribution-section'
import ProjectsSection from '@/components/sections/projects-section'
import TechnologySection from '@/components/sections/technology-section'
import { Section } from '@/components/stagger-section'


export default function Home() {

  return (
    <Section viewportAmount={0} className=''>
      <div className='px-4'>
        <AboutSection />
        <WorkHistorySection />
        <TechnologySection />
        <ProjectsSection />
        <OsContributionSection />
      </div>
      <Footer />
    </Section>
  )
}


