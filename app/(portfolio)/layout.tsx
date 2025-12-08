import Footer from '@/components/footer'
import Navbar from '@/components/navbar'


export default function PortfolioLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='mx-auto max-w-4xl '>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
