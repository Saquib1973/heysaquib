'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Briefcase,
  ChevronLeft, ChevronRight,
  Code2,
  Download,
  Github,
  Linkedin,
  MapPin,
  PlayCircle,
  Twitter
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import CertificateSection from '@/components/certificates-section'
import { StaggerItem, StaggerSection } from '@/components/stagger-section'
import { moments } from '@/public/assets/moments'
import { getDateHelper } from '@/public/utils/helper'

const links = [
  { name: 'Github', href: 'https://github.com/Saquib1973', icon: <Github className="w-5 h-5" /> },
  { name: 'Twitter', href: 'https://x.com/sacubeli', icon: <Twitter className="w-5 h-5" /> },
  { name: 'Leetcode', href: 'https://leetcode.com/u/sacube/', icon: <Code2 className="w-5 h-5" /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/saquibali1973/', icon: <Linkedin className="w-5 h-5" /> },
]

const timelineData = [
  {
    year: '2025',
    title: 'Fullstack Intern',
    org: 'Fursat Farms',
    location: 'Remote',
    description: 'Developing the frontend architecture for beasportsai.com, a SaaS platform for football analytics.',
    current: true
  },
  {
    year: '2021',
    duration: '2021 — 2025',
    title: 'B.Tech in ECE',
    org: 'IIIT Ranchi',
    location: 'Ranchi, JH',
    description: 'Electronics & Communication Engineering. Maintained 8.97 CGPA. Tech Club Lead.',
    current: false
  },
  {
    year: '2020',
    duration: '2020 — 2021',
    title: 'JEE Preparation',
    org: 'Gap Year',
    location: 'Home',
    description: 'Secured a top-percentile rank in JEE Mains to enter IIIT Ranchi.',
    current: false
  },
  {
    year: '2018',
    duration: '2018 — 2020',
    title: 'Higher Secondary',
    org: 'Park Mount High School',
    location: 'Patna, BR',
    description: 'Class XII (Science Major) with 82% distinction.',
    current: false
  },
]

// --- UTILITY COMPONENTS ---

const LetterRotator = () => {
  const words = ["Saquib Ali", "a Software Developer", "based in Patna", ""]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-center justify-start overflow-hidden h-[1.2em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={index}
          layout
          className="flex whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ y: { type: "spring", stiffness: 100, damping: 20 }, opacity: { duration: 0.2 } }}
        >
          {words[index].split("").map((letter, i) => (
            <motion.span
              key={`${index}-${i}`}
              className="inline-block text-yellow-500"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ delay: i * 0.03, type: "spring", stiffness: 150, damping: 25 }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          <span className="text-yellow-500">.</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// --- SUB-COMPONENTS ---

const HeroSection = () => {
  return (
    <StaggerSection className="flex flex-col md:flex-row gap-10 md:items-start justify-between">
      <StaggerItem>
        <motion.div layout className="space-y-6 max-w-lg">
          <motion.h1 layout className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            <div className="flex flex-wrap gap-x-2.5 items-end">
              <span className='block w-full'>Hi, I'm</span>
              <LetterRotator />
            </div>
          </motion.h1>
          <motion.div layout className="space-y-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>I'm a developer and student at <span className="text-zinc-900 dark:text-zinc-200 font-medium">IIIT Ranchi</span>. I like building software that feels solid and looks simple.</p>
            <p>When I'm not coding, I'm usually playing Valorant, watching football, or sleeping.</p>
          </motion.div>
          <motion.div layout className="flex flex-wrap gap-6 pt-2">
            <Link href="#" className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 border-b border-zinc-300 hover:border-black dark:hover:border-white transition-colors pb-0.5">
              <Download className="w-4 h-4" /> Resume
            </Link>
            <div className="flex gap-4">
              {links.map((link, i) => (
                <a key={i} href={link.href} target="_blank" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </StaggerItem>

      <StaggerItem className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image src="/assets/about-saquib.jpg" alt="Saquib Ali" fill className="object-cover" />
      </StaggerItem>
    </StaggerSection>
  )
}

const GallerySection = () => {
  const items = moments.slice(0, 6)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = direction === 'left' ? -300 : 300
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <StaggerSection className="w-full relative group">
      <StaggerItem>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 pl-1">Recent Moments</h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((moment: any, index: number) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-44 h-64 md:w-56 md:h-80 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm snap-start select-none"
            >
              {moment.data.type === 'image' ? (
                <Image
                  src={moment.src}
                  alt="Memory"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 176px, 224px"
                  priority={index < 2}
                  draggable={false}
                />
              ) : (
                <>
                  <video
                    src={`/assets/moments/${moment.src}`}
                    className="w-full h-full object-cover"
                    autoPlay muted loop playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <PlayCircle className="w-8 h-8 text-white/80 drop-shadow-md" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </StaggerItem>
    </StaggerSection>
  )
}

const TimelineSection = () => {
  return (
    <StaggerSection>
      <StaggerItem>
        <div className="flex items-center gap-3 mb-10">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Timeline</h2>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-grow" />
        </div>
      </StaggerItem>

      <div className="flex flex-col gap-10">
        {timelineData.map((item, index) => {
          const isLast = index === timelineData.length - 1

          return (
            <StaggerItem key={index} className="relative flex gap-8">
              {/* 1. LINE & DOT (The Axis) */}
              {/* We use absolute positioning to draw the line relative to the layout */}
              <div
                className="absolute left-[85px] top-[10px] bottom-[-50px] w-px bg-zinc-200 dark:bg-zinc-800 md:left-[100px]"
                aria-hidden="true"
                style={{ display: isLast ? 'none' : 'block' }}
              />

              <div className="absolute left-[85px] md:left-[100px] top-[10px] -ml-[3px] w-[7px] h-[7px] rounded-full bg-zinc-300 dark:bg-zinc-700 ring-4 ring-white dark:ring-zinc-950 z-10" />

              {/* Highlighting the 'Current' dot */}
              {item.current && (
                <div className="absolute left-[85px] md:left-[100px] top-[10px] -ml-[3px] w-[7px] h-[7px] rounded-full bg-yellow-500 ring-4 ring-white dark:ring-zinc-950 z-20 animate-pulse" />
              )}

              {/* 2. YEAR (Left Column) */}
              <div className="flex-shrink-0 w-[80px] md:w-[90px] text-right pt-0.5">
                <span className={`
                  font-mono text-sm font-bold tracking-wider 
                  ${item.current ? 'text-yellow-600 dark:text-yellow-500' : 'text-zinc-400 dark:text-zinc-500'}
                `}>
                  {item.year.split('—')[0]}
                </span>
              </div>

              {/* 3. CONTENT (Right Column) */}
              <div className="flex-grow pt-0 pb-2">
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className={`text-lg font-bold leading-none ${item.current ? 'text-zinc-900 dark:text-zinc-50' : 'text-zinc-700 dark:text-zinc-200'}`}>
                      {item.title}
                    </h3>
                    {item.current && (
                      <span className="self-start sm:self-auto inline-flex items-center px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                      <Briefcase className="w-3.5 h-3.5" />
                      {item.org}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          )
        })}
      </div>
    </StaggerSection>
  )
}

// --- MAIN PAGE ---
export default function AboutPage() {
  const lastUpdated = getDateHelper()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-24">
      <HeroSection />
      <GallerySection />
      <TimelineSection />

      {/* CERTIFICATES & FOOTER */}
      <StaggerSection className="w-full">
        <StaggerItem className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Certificates</h2>
        </StaggerItem>
        <StaggerItem className="w-full">
          <CertificateSection />
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 flex justify-between items-center">
            <span>Last updated: {lastUpdated}</span>
            <Link href="https://linkedin.com/in/saquibali1973" target="_blank" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1">
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </StaggerItem>
      </StaggerSection>
    </div>
  )
}