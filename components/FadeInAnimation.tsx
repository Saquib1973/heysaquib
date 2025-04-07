'use client'
import React from 'react'
import { motion } from 'framer-motion'

const FadeInAnimation = ({
  className,
  children,
  duration = 0.2,
  delay = 0.1,
}: {
  className?: string
  children: React.ReactNode
  duration?: number
  delay?: number
}) => {
  const hasChildren = React.Children.count(children) > 0
  return hasChildren ? (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        delay,
        duration,
        staggerChildren: 0.2,
      }}
      viewport={{ once: true }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            initial: { opacity: 0, y: 5 , filter:"blur(5px)" },
            animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{
            duration
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  ) : null
}

export default FadeInAnimation
