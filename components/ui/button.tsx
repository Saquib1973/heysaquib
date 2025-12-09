'use client'
import React from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'link' | 'primary-s' | 'secondary-s' | 'outline-s'
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

  const isSimple = variant.endsWith('-s')

  // 1. CONTAINER
  const containerClasses = cn(
    "relative inline-block group",
    !isSimple && "before:absolute before:top-[-4px] before:left-[-4px] before:w-full before:h-full before:content-[''] before:z-0"
  )

  // 2. SHADOW LAYER
  const shadowBase = "absolute inset-0 rounded-md select-none border-2 border-transparent"
  const shadowVariants = {
    primary: "bg-black dark:bg-white",
    secondary: "bg-black dark:bg-zinc-700",
    outline: "bg-black dark:bg-white", 
    link: "hidden",
    'primary-s': "hidden",
    'secondary-s': "hidden",
    'outline-s': "hidden"
  }

  // 3. BUTTON LAYER
  const buttonBase = cn(
    "relative block h-full w-full font-bold uppercase tracking-wider",
    "transition-colors duration-200 ease-in-out", // Changed to transition-colors for simple buttons
    "disabled:opacity-50 disabled:pointer-events-none",
    "z-10",
    
    // RETRO LIFT PHYSICS (Square buttons)
    !isSimple && "rounded-md border-2 transition-all translate-x-[-4px] translate-y-[-4px] group-hover:translate-x-0 group-hover:translate-y-0 active:translate-x-0 active:translate-y-0",
    
    // SIMPLE PILL PHYSICS (Rounded buttons)
    // REMOVED: hover:scale-105 active:scale-95
    isSimple && "rounded-full border-0" 
  )

  const buttonVariants = {
    // --- RETRO VARIANTS ---
    primary: cn(
      "bg-white text-black border-black",
      "dark:bg-zinc-900 dark:text-white dark:border-white",
    ),
    secondary: cn(
      "bg-yellow-400 text-black border-black",
      "dark:bg-yellow-400 dark:border-black-2",
    ),
    outline: cn(
      "bg-white text-black border-black",
      "dark:bg-zinc-950 dark:text-white dark:border-white",
    ),
    
    // --- SIMPLE VARIANTS ---
    
    // 1. Live Site Style (Solid Dark Pill)
    'primary-s': cn(
      "bg-gray-900 text-white shadow-lg shadow-black/5",
      "dark:bg-white dark:text-black",
      "hover:bg-gray-800 dark:hover:bg-zinc-200"
    ),

    // 2. Source Code Style (Light Gray Pill)
    'secondary-s': cn(
      "bg-gray-200/90 text-gray-900",
      "dark:bg-white/10 dark:text-white",
      "hover:bg-gray-200 dark:hover:bg-white/15"
    ),

    // 3. Gallery Button Style (Outline Pill)
    'outline-s': cn(
      "bg-transparent text-gray-600 border-2 border-gray-200",
      "dark:text-gray-300 dark:border-white/10",
      "hover:border-gray-900 hover:text-black",
      "dark:hover:border-white dark:hover:text-white"
    ),

    link: "text-black dark:text-white hover:underline underline-offset-4 border-none shadow-none !translate-x-0 !translate-y-0 !p-0 bg-transparent rounded-none"
  }

  const sizes = {
    xs: "px-3 py-1.5 text-[10px]", 
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-sm", 
    icon: "h-12 w-12 flex items-center justify-center p-0"
  }

  const content = (
    <span className="flex items-center justify-center gap-2">
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </span>
  )

  // --- RENDER ---

  if (variant === 'link') {
    const linkClasses = cn("inline-flex items-center justify-center font-bold uppercase tracking-wider transition-colors", buttonVariants.link, className)
    if (href) return <Link href={href} target={props.target} className={linkClasses}>{content}</Link>
    return <button ref={ref} disabled={disabled || isLoading} className={linkClasses} {...props}>{content}</button>
  }

  const appliedShadow = shadowVariants[variant]
  const appliedButton = cn(buttonBase, buttonVariants[variant], sizes[size], className)

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={containerClasses}>
      {!isSimple && <span className={cn(shadowBase, appliedShadow)} />}
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