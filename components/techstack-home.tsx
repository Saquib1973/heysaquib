'use client'
import React, { useState } from 'react'
import FadeInAnimation from './FadeInAnimation'
import { motion } from 'framer-motion'
import techstack from '@/lib/data/techstack'
const Tech = () => {
  const [page, setPage] = useState('frontend')
  const buttonList = [
    'all',
    'frontend',
    'backend',
    'database',
    'devops',
    'others',
  ]

  return (
    <div className="section">
      <FadeInAnimation>
        <h1 className="rampart-h1">SKILLS</h1>
      </FadeInAnimation>
      <div className="py-2">
        <div className="flex flex-wrap gap-3 txt">
          {buttonList.map((but, i) => (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className={`${
                page === but
                  ? 'link-text'
                  : ''
              }`}
              key={but}
              onClick={() => {
                setPage(but)
              }}
            >
              {but}
            </motion.button>
          ))}
        </div>
        <div className="flex gap-3 py-4 flex-wrap">
          {techstack.map((tech, i) => (
            <motion.div
              key={i}
              className={` cursor-pointer border-l-4 rounded-r-md border-transparent transition-all bg-blackFade  p-2 py-1 max-md:text-sm  ${
                tech.type.includes(page) || page === 'all'
                  ? 'text-gray-800 shadow-sm bg-yellow-2 dark:border-yellow-800 dark:bg-yellow-4 dark:shadow-inner dark:text-white border-yellow-4  '
                  : 'amiko-p border-gray-100 bg-white-0 dark:bg-gray-0 line-through'
              }`}
              initial={{ opacity: 0, y: 10, x: 5 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tech
