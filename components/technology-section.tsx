'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import techstack from '@/lib/data/techstack'
import { StaggerSection, StaggerItem } from './stagger-section'
import { Layers } from 'lucide-react'

const TechnologySection = () => {
  const [activeTab, setActiveTab] = useState('all')

  const categories = [
    'all',
    'frontend',
    'backend',
    'database',
    'devops',
    'others',
  ]

  return (
    // Reduced vertical padding (py-12 instead of py-24)
    <section className="px-4 py-12 max-w-4xl mx-auto">
      <StaggerSection>

        {/* 1. Header - Reduced margin-bottom (mb-8 instead of mb-12) */}
        <StaggerItem className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-white/5 pb-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              Skills
              <Layers className="w-6 h-6 text-gray-300 dark:text-gray-700" />
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The tools and technologies currently in my arsenal.
            </p>
          </div>
        </StaggerItem>

        {/* 2. Filter Tabs - Reduced margin-bottom (mb-6 instead of mb-8) */}
        <StaggerItem className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 capitalize z-0
                  ${activeTab === tab
                    ? 'text-white dark:text-black'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                {/* Sliding Background */}
                {activeTab === tab && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </StaggerItem>

        {/* 3. The Tech Items */}
        <StaggerItem>
          <div className="flex gap-3 py-4 flex-wrap">
            {techstack.map((tech, i) => {
              // Logic to check if active
              const isActive = tech.type.includes(activeTab) || activeTab === 'all';

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, x: 5 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: i * 0.02, duration: 0.4 }}
                  className={`
                    cursor-pointer border-r-4 border-b-4 border-transparent transition p-2 py-1 max-md:text-sm
                    ${isActive
                      // Active State: Yellow borders, sharp corners (removed rounded-l-md)
                      ? 'text-gray-800 shadow-sm bg-yellow-200 dark:bg-yellow-500 dark:text-white border-yellow-400 dark:border-yellow-600'
                      // Inactive State: Grayed out, line-through
                      : 'border-white dark:border-black text-gray-400 bg-gray-50 dark:bg-white/5 line-through decoration-gray-400'
                    }
                  `}
                >
                  {tech.name}
                </motion.div>
              )
            })}
          </div>
        </StaggerItem>

      </StaggerSection>
    </section>
  )
}

export default TechnologySection