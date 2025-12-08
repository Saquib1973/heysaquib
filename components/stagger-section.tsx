'use client'

import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  className?: string
  viewportAmount?: number
  staggerDuration?: number
  delay?: number
}

// 1. The Container
export const StaggerSection = ({
  children,
  className = "",
  viewportAmount = 0.2,
  staggerDuration = 0.1, // Fast stagger by default
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
  duration?: number // Now controls the spring speed
}

// 2. The Item (Spring Physics)
export const StaggerItem = ({
  children,
  className = "",
  duration = 1 // Default fast duration
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
        // When using 'spring', duration is calculated roughly from stiffness/damping
        // But if we provide 'duration', Framer calculates the physics to match that time.
        duration: duration, 
        bounce: 0.2, // Subtle bounce for "alive" feel, set to 0 for no bounce
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}