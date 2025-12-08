'use client'
import React from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  href?: string
  target?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  href,
  ...props
}, ref) => {

  // 1. CONTAINER (The Wrapper)
  // Fixes Jitter: We add an invisible pseudo-element (before:) that covers the 
  // "lifted" area (-4px). When the button moves down on hover, this ghost layer 
  // stays compliant, keeping the hover state active.
  const containerClasses = cn(
    "relative inline-block group",
    // The invisible hit-box extender:
    "before:absolute before:top-[-4px] before:left-[-4px] before:w-full before:h-full before:content-[''] before:z-0"
  )

  // 2. SHADOW LAYER (The Background Block)
  const shadowBase = "absolute inset-0 rounded-md select-none border-2 border-transparent"
  const shadowVariants = {
    primary: "bg-black dark:bg-white",
    secondary: "bg-black dark:bg-yellow-50",
    outline: "bg-black dark:bg-white", 
    link: "bg-transparent hidden"
  }

  // 3. BUTTON LAYER (The Top Interactive Part)
  const buttonBase = cn(
    "relative block h-full w-full rounded-md font-bold uppercase tracking-wider",
    "border-2 transition-all duration-150 ease-in-out", // Snappy transition
    "disabled:opacity-50 disabled:pointer-events-none",
    "z-10", // Ensure button is above the ghost layer
    
    // THE PHYSICS:
    // Default: Lifted up (-4px)
    "translate-x-[-4px] translate-y-[-4px]",
    
    // Hover: Presses down (to 0,0)
    "group-hover:translate-x-0 group-hover:translate-y-0",
    
    // Active: Presses down (to 0,0) - redundant but good fallback
    "active:translate-x-0 active:translate-y-0"
  )

  const buttonVariants = {
    primary: cn(
      "bg-white text-black border-black",
      "dark:bg-zinc-900 dark:text-white dark:border-white",
    ),
    secondary: cn(
      "bg-yellow-400 text-black border-black",
      "dark:bg-yellow-400 dark:border-yellow-100",
    ),
    outline: cn(
      // 1. Background must be solid (White/Black) to hide the shadow layer behind it
      "bg-white text-black border-black",
      "dark:bg-zinc-950 dark:text-white dark:border-white",
      
    ),
    link: "text-black dark:text-white hover:underline underline-offset-4 border-none shadow-none !translate-x-0 !translate-y-0 !p-0 bg-transparent"
  }

  const sizes = {
    xs: "px-3 py-1.5 text-[10px]", 
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm", // Adjusted padding slightly for better aspect ratio
    lg: "px-8 py-4 text-base",
    icon: "h-12 w-12 flex items-center justify-center p-0"
  }

  const content = (
    <span className="flex items-center justify-center gap-2">
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </span>
  )

  // --- RENDER ---

  // Handle "Link" variant separately (no blocks)
  if (variant === 'link') {
    const linkClasses = cn("inline-flex items-center justify-center font-bold uppercase tracking-wider transition-colors", buttonVariants.link, className)
    if (href) return <Link href={href} target={props.target} className={linkClasses}>{content}</Link>
    return <button ref={ref} disabled={disabled || isLoading} className={linkClasses} {...props}>{content}</button>
  }

  // Handle Block Buttons
  const appliedShadow = shadowVariants[variant]
  const appliedButton = cn(buttonBase, buttonVariants[variant], sizes[size], className)

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={containerClasses}>
      <span className={cn(shadowBase, appliedShadow)} />
      {children}
    </div>
  )

  if (href) {
    return (
      <Wrapper>
        <Link
          href={href}
          target={props.target}
          className={cn(appliedButton, (disabled || isLoading) && "pointer-events-none opacity-50")}
          aria-disabled={disabled || isLoading}
        >
          {content}
        </Link>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={appliedButton}
        {...props}
      >
        {content}
      </button>
    </Wrapper>
  )
})

Button.displayName = "Button"

export default Button