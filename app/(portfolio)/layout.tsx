import ContactHomeSection from '@/components/contact-home-section'
import Footer from '@/components/footer-component'
import Header from '@/components/header-component'
import ParticleFlowBackground from '@/components/ParticleFlowBackground'


export default function PortfolioLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='mx-auto max-w-4xl '>
            <Header />
            {/* <Starfield /> */}
            <ParticleFlowBackground />
            {children}
            <ContactHomeSection />
            <Footer />
        </div>
    )
}
