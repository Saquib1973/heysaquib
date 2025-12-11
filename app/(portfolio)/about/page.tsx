'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Github, Twitter, Linkedin, Code2, ArrowUpRight, Download,
  Star, BookOpen, Sparkles, Zap, GraduationCap
} from 'lucide-react'

// --- IMPORTS ---
import CertificateSection from '@/components/certificates-section'
import { StaggerSection, StaggerItem } from '@/components/stagger-section'
import { moments } from '@/public/assets/moments'
import { getDateHelper } from '@/public/utils/helper'

// --- DATA ---
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
    description: 'Developing the frontend architecture for beasportsai.com, a SaaS platform for football analytics.',
    current: true
  },
  {
    year: '2021 — 2025',
    title: 'B.Tech in ECE',
    org: 'IIIT Ranchi',
    description: 'Electronics & Communication Engineering. Maintained 8.97 CGPA. Tech Club Lead.',
    current: false
  },
  {
    year: '2020 — 2021',
    title: 'JEE Preparation',
    org: 'Gap Year',
    description: 'Secured a top-percentile rank in JEE Mains to enter IIIT Ranchi.',
    current: false
  },
  {
    year: '2018 — 2020',
    title: 'Higher Secondary',
    org: 'Park Mount High School',
    description: 'Class XII (Science Major) with 82% distinction.',
    current: false
  },
]

// --- COMPONENT: LETTER ROTATOR (The "Instagram" Effect) ---
const LetterRotator = () => {
  const words = [
    "Saquib Ali", 
    "a Software Developer", 
    "based in Patna", 
    ""
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-center justify-start overflow-hidden h-[1.2em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={index}
          layout // Smoothly animates width changes
          className="flex whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 100, damping: 20 },
            opacity: { duration: 0.2 },
            layout: { duration: 0.3 }
          }}
        >
          {words[index].split("").map((letter, i) => (
            <motion.span
              key={`${index}-${i}`}
              className="inline-block text-yellow-500"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                delay: i * 0.03,
                type: "spring",
                stiffness: 150,
                damping: 25,
              }}
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

// --- COMPONENT: SCATTERED COLLAGE ---
const CollageMoments = () => {
  const items = moments.slice(0, 6)
  const positions = [
    { top: '0%', left: '5%', rotate: -6, z: 1 },
    { top: '10%', left: '60%', rotate: 12, z: 2 },
    { top: '45%', left: '10%', rotate: 3, z: 3 },
    { top: '35%', left: '55%', rotate: -8, z: 2 },
    { top: '10%', left: '35%', rotate: -3, z: 4 },
    { top: '50%', left: '35%', rotate: 6, z: 1 },
  ]

  return (
    <StaggerSection className="py-20 relative w-full overflow-hidden">
      <div className="relative w-full h-[600px] md:h-[500px] mx-auto max-w-3xl">
        {/* Background Elements */}
        <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-0 left-1/2 text-yellow-400"><Star className="w-8 h-8 fill-current opacity-50" /></motion.div>
        <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="absolute bottom-10 left-10 text-blue-400"><BookOpen className="w-10 h-10 opacity-40 -rotate-12" /></motion.div>
        <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="absolute top-20 right-10 text-pink-400"><Sparkles className="w-6 h-6 opacity-60" /></motion.div>
        <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="absolute bottom-1/4 right-20 text-purple-400"><Zap className="w-8 h-8 opacity-40 rotate-12" /></motion.div>
        <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="absolute top-1/2 left-0 text-zinc-300 dark:text-zinc-700"><GraduationCap className="w-12 h-12 opacity-30 -rotate-6" /></motion.div>

        {items.map((moment: any, index: number) => {
          const pos = positions[index] || { top: '0', left: '0', rotate: 0, z: 1 }
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', duration: 0.8, delay: index * 0.1, bounce: 0.4 }}
              whileHover={{ scale: 1.2, rotate: 0, zIndex: 50, transition: { duration: 0.2 } }}
              className="absolute w-32 h-44 md:w-48 md:h-64 bg-zinc-100 dark:bg-zinc-800 border-4 border-white dark:border-zinc-800 shadow-xl rounded-lg overflow-hidden cursor-pointer"
              style={{ top: pos.top, left: pos.left, rotate: pos.rotate, zIndex: pos.z }}
            >
              {moment.data.type === 'image' ? (
                <Image src={moment.src} alt="Memory" fill className="object-cover pointer-events-none select-none grayscale hover:grayscale-0 transition-all duration-500" sizes="(max-width: 768px) 150px, 200px" />
              ) : (
                <video src={`/assets/moments/${moment.src}`} className="w-full h-full object-cover pointer-events-none select-none grayscale hover:grayscale-0 transition-all duration-500" autoPlay muted loop playsInline />
              )}
            </motion.div>
          )
        })}
      </div>
    </StaggerSection>
  )
}

// --- COMPONENT: CONNECTED TIMELINE ---
const ConnectedTimeline = () => {
  return (
    <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 md:ml-6 space-y-12 py-2">
      {timelineData.map((item, index) => (
        <StaggerItem key={index} className="relative pl-8 md:pl-12 group">
          <span className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full z-10 transition-all duration-300 ${item.current ? 'bg-yellow-500 ring-4 ring-yellow-500/20' : 'bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-950 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600'}`} />
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
            <span className={`text-xs font-mono tracking-widest uppercase mb-1 sm:mb-0 w-24 flex-shrink-0 ${item.current ? 'text-yellow-600 dark:text-yellow-500 font-semibold' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors'}`}>
              {item.year}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-none">{item.title}</h3>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{item.org}</span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed max-w-md">{item.description}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </div>
  )
}

// --- MAIN PAGE ---
export default function AboutPage() {
  const lastUpdated = getDateHelper()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-24">

      {/* --- 1. HERO SECTION --- */}
      <StaggerSection className="flex flex-col md:flex-row gap-10 md:items-start justify-between">
        
        {/* WRAPPED IN MOTION.DIV WITH LAYOUT FOR SMOOTH HEIGHT TRANSITION */}
        <StaggerItem>
          <motion.div 
            layout 
            className="space-y-6 max-w-lg"
            transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
          >
            
            {/* Heading with Layout Prop */}
            <motion.h1 
              layout
              className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight"
            >
               <div className="flex flex-wrap gap-x-2.5 items-end">
                <span className='block w-full'>Hi, I'm</span>
                <LetterRotator />
               </div>
            </motion.h1>

            <motion.div layout className="space-y-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I'm a developer and student at <span className="text-zinc-900 dark:text-zinc-200 font-medium">IIIT Ranchi</span>. I like building software that feels solid and looks simple.
              </p>
              <p>
                When I'm not coding, I'm usually playing Valorant, watching football, or sleeping.
              </p>
            </motion.div>

            <motion.div layout className="flex flex-wrap gap-6 pt-2">
              <Link
                href="https://drive.google.com/file/d/1uy_pExXcnC35CJEACcN3DfigwJPFtd_o/view"
                target="_blank"
                className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 border-b border-zinc-300 hover:border-black dark:hover:border-white transition-colors pb-0.5"
              >
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
          <Image
            src="/assets/about-saquib.jpg"
            alt="Saquib Ali"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </StaggerItem>
      </StaggerSection>

      {/* --- 2. COLLAGE MOMENTS --- */}
      <CollageMoments />

      {/* --- 3. TIMELINE --- */}
      <StaggerSection>
        <StaggerItem><h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">Timeline</h2></StaggerItem>
        <ConnectedTimeline />
      </StaggerSection>

      {/* --- 4. CERTIFICATES --- */}
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