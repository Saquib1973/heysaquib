'use client'

import React from 'react'
import { motion } from 'framer-motion'

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

const Timeline = () => {
  return (
    <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 md:ml-6 space-y-12 py-2">
      {timelineData.map((item, index) => (
        <div key={index} className="relative pl-8 md:pl-12 group">
          
          {/* --- THE NODE (Visual Anchor) --- */}
          <span 
            className={`
              absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full z-10 transition-all duration-300
              ${item.current 
                ? 'bg-yellow-500 ring-4 ring-yellow-500/20' 
                : 'bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-950 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600'
              }
            `} 
          />
          
          {/* --- CONTENT --- */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
            
            {/* Year (Fixed Width for alignment) */}
            <span className={`
              text-xs font-mono tracking-widest uppercase mb-1 sm:mb-0 w-24 flex-shrink-0
              ${item.current ? 'text-yellow-600 dark:text-yellow-500 font-semibold' : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors'}
            `}>
              {item.year}
            </span>

            {/* Details */}
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                {item.title}
              </h3>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {item.org}
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed max-w-md">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Timeline