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
      <StaggerSection className="flex flex-col-reverse gap-12 items-center md:grid md:grid-cols-[1fr_auto]">
        
        <div className="flex flex-col gap-6 text-center md:text-left">
          <StaggerItem>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              About Me
            </h2>
          </StaggerItem>

          <StaggerItem className="space-y-5 text-lg font-light leading-relaxed text-gray-600 dark:text-gray-400">
            <div>
              Hi, I’m <span className="font-medium text-gray-900 dark:text-white"><PenUnderline delay={0.5} text="Saquib Ali" /></span>
              , a B.Tech ECE (Hons) graduate from{' '}
              <br />
              <Link
                href="https://iiitranchi.ac.in/"
                target="_blank"
                className="text-gray-900 dark:text-white underline underline-offset-4 decoration-gray-200 dark:decoration-gray-700 hover:decoration-yellow-500 transition-all"
              >
                IIIT Ranchi
              </Link>
              {" "}(Class of 2025).
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
                alt="Arrow decoration"
                width={150}
                height={150}
                className="absolute -top-12 -right-20 z-10 w-24 rotate-12 p-1  dark:invert"
              />
              <Button href="/about" variant="secondary" size="sm" className="w-fit">
                More about me <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </StaggerItem>
        </div>

        <StaggerItem className="flex justify-center md:justify-end">
          <div className="group relative w-32 sm:w-48 md:w-64 aspect-square">
            <div className="relative h-full w-full overflow-hidden rounded-full md:rounded-2xl bg-gray-100 dark:bg-zinc-800 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10">
              <Image
                src="/assets/saquib.jpg"
                alt="Saquib Ali"
                fill
                priority
                sizes="(max-width: 768px) 150px, 300px"
                className="object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </StaggerItem>

      </StaggerSection>
    </section>
  )
}

export default AboutSection