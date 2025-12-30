'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Filter } from 'lucide-react'
import clsx from 'clsx'

interface FilterDropdownProps<T extends string> {
  options: T[]
  selected: T | null
  onSelect: (option: T | null) => void
  placeholder?: string
}

export default function FilterDropdown<T extends string>({
  options,
  selected,
  onSelect,
  placeholder = 'Filter',
}: FilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
      >
        <Filter className="w-3.5 h-3.5" />
        <span className="capitalize">{selected || placeholder}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            // Removed bg-red-400, restored standard white/dark theme
            className="absolute right-0 mt-2 w-56 z-[100] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden p-1.5"
          >
            {/* 'All' Option */}
            <div
              onClick={() => { onSelect(null); setIsOpen(false) }}
              className={clsx(
                'flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-colors mb-1',
                selected === null 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-medium' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              )}
            >
              <span>All Projects</span>
              {selected === null && <Check className="w-3.5 h-3.5 text-green-500" />}
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-1" />

            {/* Options List */}
            {options.map((option) => (
              <div
                key={option}
                onClick={() => { onSelect(option); setIsOpen(false) }}
                className={clsx(
                  'flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors capitalize',
                  selected === option
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-medium' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                )}
              >
                <span>{option}</span>
                {selected === option && <Check className="w-3.5 h-3.5 text-green-500" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}