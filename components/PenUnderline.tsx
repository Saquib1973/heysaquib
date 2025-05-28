"use client"
import { motion } from 'framer-motion';
import React from 'react';

interface PenUnderlineProps {
  text: string;
}

const PenUnderline = ({ text }: PenUnderlineProps) => {
  return (
    <div className="inline-block relative">
      <span className="relative inline-block">{text}</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="12"
        viewBox="0 0 100 12"
        className="absolute -bottom-2 left-0 w-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 8 C 20 8, 30 4, 50 6 C 70 8, 85 10, 100 7"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
        />
      </motion.svg>
    </div>
  );
};

export default PenUnderline;
