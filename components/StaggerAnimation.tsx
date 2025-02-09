'use client'
import React from 'react'
import { motion } from 'framer-motion'

const StaggerAnimation = ({
  children,
  duration = 0.8,
  delay = 0.1,
  stagger = 0.1,
}: {
  children: React.ReactNode
  duration?: number
  delay?: number
  stagger?: number
}) => {
  const hasChildren = React.Children.count(children) > 0

  return hasChildren ? (
    <motion.div
      className='w-full'
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            initial: { opacity: 0, y: 5 },
            animate: { opacity: 1, y: 0 },
          }}
          transition={{ duration }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  ) : null
}

export default StaggerAnimation
