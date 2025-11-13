'use client'

import React from 'react'
import { motion } from 'framer-motion'


interface TextWrapperProps {
    children: React.ReactNode
    className?: string
    delay?: number
    staggerChildren?: number
}

const TextWrapper = ({
    children,
    className = '',
    delay = 0,
    staggerChildren = 0.05,
}: TextWrapperProps) => {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delay || 0,
            }
        }
    }
    
    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            }
        }
    }
    // Split text into words if children is a string
    const renderChildren = () => {
        if (typeof children === 'string') {
            return children.split(' ').map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="inline-block"
                    style={{ marginRight: '0.25em' }}
                >
                    {word}
                </motion.span>
            ))
        }
        
        return (
            <motion.span variants={child} className="inline-block">
                {children}
            </motion.span>
        )
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {renderChildren()}
        </motion.div>
    )
}

export default TextWrapper