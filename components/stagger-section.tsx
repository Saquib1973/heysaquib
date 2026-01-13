'use client'

import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  className?: string
  viewportAmount?: number
  staggerDuration?: number
  delay?: number
}

export const StaggerSection = ({
  children,
  className = "",
  viewportAmount = 0.2,
  staggerDuration = 0.15,
  delay = 0
}: SectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDuration,
            delayChildren: delay,
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ItemProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export const StaggerItem = ({
  children,
  className = "",
  duration = 1.5
}: ItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: 20, 
          scale: 0.95,
          filter: 'blur(10px)' 
        },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          filter: 'blur(0px)' 
        }
      }}
      transition={{
        type: "spring",
        duration: duration, 
        bounce: 0.2,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  viewportAmount?: number
}

export const Section = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  viewportAmount = 0.2
}: SectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={{
        hidden: { 
          opacity: 0, 
          filter: 'blur(8px)'
        },
        visible: { 
          opacity: 1, 
          filter: 'blur(0px)' 
        }
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}