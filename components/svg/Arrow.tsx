import { cn } from '@/lib/utils'
import React from 'react'

const Arrow = ({ className }: { className?: string }) => {
  return (
    <span>

      <svg
        stroke="currentColor"
        fill="none"
        className={cn(`inline mb-0.5`, className)}
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1.2em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
        </span>
  )
}

export default Arrow