'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import clsx from 'clsx'

// Define the type for allowed options
type OptionType =
  | 'frontend'
  | 'backend'
  | 'design'
  | 'fullstack'
  | 'web3'
  | 'core'
  | 'others'

export default function CustomSelect({
  options = [
    'frontend',
    'backend',
    'design',
    'fullstack',
    'web3',
    'core',
    'others',
  ],
  placeholder = 'Select an option',
  onSelect,
}: {
  options?: OptionType[]
  placeholder?: string
  onSelect: (option: OptionType) => void
}) {
  const [selected, setSelected] = useState<OptionType | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-32 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-gray-0 outline-none bg-white-0 px-4 py-2 text-sm text-black-0 shadow-sm dark:border-black-0 dark:bg-black-2 dark:text-white-1"
      >
        <span>{selected || placeholder}</span>
        <ChevronUp
          className={`h-4 w-4 transition ${isOpen ? '-rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-1 rounded-md border border-gray-0 outline-none bg-white-0 text-black-0 py-2 text-sm shadow-md dark:border-black-0 dark:bg-black-2 dark:text-white-1"
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option)
                  setIsOpen(false)
                  onSelect(option)
                }}
                className={clsx(
                  'flex cursor-pointer items-center justify-between py-2 px-4 text-sm w-full hover:bg-white-1 hover:text-black-2 dark:hover:text-white-2 dark:hover:bg-black-1',
                  selected === option &&
                    'text-yellow-4 hover:text-yellow-4 dark:hover:text-yellow-4'
                )}
              >
                {option}
                {selected === option && (
                  <Check className="h-4 w-4 text-yellow-4" />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
