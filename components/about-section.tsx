import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { StaggerSection, StaggerItem } from './stagger-section'
import Button from './ui/button'
import PenUnderline from './PenUnderline'
import ArrowDown from "@/public/arrow-down.png"

const AboutSection = () => {
  return (
    <section className="px-4 py-24 max-w-5xl mx-auto">
      <StaggerSection className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">

        {/* Left Column: Text Content */}
        <div className="flex flex-col gap-6 order-2 md:order-1 text-center md:text-left">
          <StaggerItem>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight about">
              About Me
            </h2>
          </StaggerItem>

          <StaggerItem className="space-y-5 text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
            <div>
              Hi, I’m <span className="font-medium text-gray-900 dark:text-white"><PenUnderline delay={0.5} text="Saquib Ali" /></span>.
              I am a final-year B.Tech ECE (Hons) student at{' '}
              <Link
                href="https://iiitranchi.ac.in/"
                target="_blank"
                className="text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-200 dark:decoration-gray-700 hover:decoration-yellow-500 transition-all"
              >
                IIIT Ranchi
              </Link>.
            </div>

            <p>
              I am passionate about <span className="text-gray-900 dark:text-white font-medium">coding, problem-solving, and building software</span>.
              I love tackling challenges and creating solutions that make a tangible difference.
            </p>
          </StaggerItem>

          <StaggerItem className="pt-2 flex justify-center md:justify-start">
            <div className="relative w-fit">

              <Image
                src={ArrowDown}
                alt="Arrow Down"
                // Added 'dark:invert' to the end of the className list
                className='absolute -top-12 p-1 -right-20 z-10 w-24 h-auto rotate-12 hidden md:block dark:invert'
                width={150}
                height={150}
              />

              <Button href="/about" variant="secondary" size="sm" className="w-fit">
                More about me
                <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </StaggerItem>

        </div>

        {/* Right Column: Image */}
        <StaggerItem className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative group w-32 sm:w-48 md:w-64 aspect-square mx-auto md:mx-0">
            <div className="relative h-full w-full overflow-hidden rounded-full md:rounded-2xl bg-gray-100 dark:bg-zinc-800 saquib-image shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10">
              <Image
                src="/assets/saquib.jpg"
                alt="Saquib Ali"
                fill
                className="object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 ease-in-out"
                sizes="(max-width: 768px) 150px, 300px"
                priority
              />
            </div>
          </div>
        </StaggerItem>

      </StaggerSection>
    </section>
  )
}

export default AboutSection