"use client"
import React, { useState, useEffect } from 'react'
import techstack from '../lib/data/techstack'
import { motion } from 'framer-motion'
import FadeInAnimation from './FadeInAnimation';

const bentoLayout = [
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 2, row: 2 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 2 },
  { col: 2, row: 1 },
  { col: 2, row: 1 },
  { col: 2, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 2 },
];

const typeColor: Record<string, string> = {
  frontend: 'bg-green-400',
  backend: 'bg-red-400',
  database: 'bg-yellow-400',
  devops: 'bg-purple-400',
  others: 'bg-yellow-400',
}

const SkillsSectionHomeV2 = () => {
  const [page, setPage] = useState('all')
  const [loading, setLoading] = useState(true)
  const buttonList = [
    'all',
    'frontend',
    'backend',
    'database',
    'devops',
    'others',
  ]

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [page])

  const filteredTechs = page === 'all'
    ? techstack
    : techstack.filter(tech => tech.type && tech.type.includes(page))

  const repeatedLayout = Array.from({ length: filteredTechs.length }, (_, i) => bentoLayout[i % bentoLayout.length])

  const skeletons = Array.from({ length: Math.max(filteredTechs.length, 11) }, (_, i) => (
    <motion.div
      key={i}
      className={`animate-pulse col-span-${bentoLayout[i % bentoLayout.length].col} row-span-${bentoLayout[i % bentoLayout.length].row} dark:bg-black-2/60 bg-white-2 border border-gray-200 dark:border-gray-800`}
      style={{ minHeight: bentoLayout[i % bentoLayout.length].row === 2 ? 220 : 110 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.04 }}
    />
  ))

  return (
    <section id="skills" className="max-md:hidden">
      <FadeInAnimation>
        <h1 className="rampart-h1">SKILLS</h1>
      </FadeInAnimation>
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="flex flex-wrap gap-3 txt">
          {buttonList.map((but, i) => (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className={`${page === but ? 'link-text' : ''}`}
              key={but}
              onClick={() => {
                setPage(but)
              }}
            >
              {but}
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-8 lg:grid-cols-16 gap-1 py-4 ">
          {loading
            ? skeletons
            : filteredTechs.map((tech, i) => {
                const layout = repeatedLayout[i]
                return (
                  <motion.div
                    key={tech.name + i}
                    aria-label={
                      tech.name + (tech.type ? ' ' + tech.type.join(', ') : '')
                    }
                    className={`relative group col-span-${layout.col} row-span-${layout.row}`}
                    style={{ minHeight: layout.row === 2 ? 200 : 100 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <div
                      className={`relative p-6 bg-white-2 dark:bg-black-2/60 hover:bg-yellow-2 dark:hover:bg-yellow-4 hover:text-white-0 dark:hover:text-white-0 text-black-2/60 dark:text-white-0 flex flex-col items-center border border-gray-200 dark:border-gray-800 justify-center h-full transition-all duration-200`}
                    >
                      <h3 className="text-lg font-semibold text-center">
                        {tech.name}
                      </h3>
                    </div>
                  </motion.div>
                )
              })}
        </div>
      </div>
    </section>
  )
}

export default SkillsSectionHomeV2