"use client"

import { motion } from 'framer-motion'
import React from 'react'

const TextRevealWrapper = ({ children }: { children: React.ReactNode }) => {
  const text = React.Children.toArray(children).join('')
  const characters = text.split('')

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              x: 10,
              scale: 0.6,
            },
            visible: {
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut",
              },
            },
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default TextRevealWrapper