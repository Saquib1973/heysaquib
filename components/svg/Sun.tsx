"use client"
import React from 'react'
import { motion } from 'framer-motion'

const Sun = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`size-9 dark:text-gray-1 hover:shadow-inner transition p-1.5 border border-transparent  active:animate-spin rounded-full`}
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  )
}

export default Sun
