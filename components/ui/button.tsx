'use client'
import React from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'icon'
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

  // 1. Removed 'rounded' classes for the brutalist look
  // 2. Added transition for the press effect
  const baseStyles = "group relative inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 rounded-md"

  const variants = {
    primary: cn(
      "bg-white-0 text-black-0 border-2 border-black-0",
      "dark:bg-black-2 dark:text-white dark:border-white-2",
      
      // LIGHT MODE: Black Shadow
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      
      // DARK MODE FIX: Pure White Shadow (Matching Secondary)
      "dark:shadow-[4px_4px_0px_0px] dark:shadow-white-0",

      // HOVER: Press down effect
      "hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none"
    ),
    
    secondary: cn(
      "bg-yellow-400 text-black border-2 border-black-2 dark:border-black-2",
      
      // Shadow remains black here because it contrasts with the Yellow button
      "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      
      // DARK MODE FIX: Pure White Shadow
      "dark:shadow-[4px_4px_0px_0px] dark:shadow-yellow-50", 

      "hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none"
    ),
    
    outline: cn(
      "bg-transparent text-black border-2 border-black dark:text-white dark:border-white",
      "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
      
    ),
    
    link: "text-black dark:text-white underline-offset-4 hover:underline !p-0 !h-auto shadow-none border-none"
  }

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-12 px-8 text-sm",
    lg: "h-14 px-10 text-base",
    icon: "h-12 w-12 flex items-center justify-center p-0"
  }

  const content = (
    <>
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      {children}
    </>
  )

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)

  // RENDER AS LINK
  if (href) {
    return (
      <Link
        href={href}
        className={cn(combinedClassName, (disabled || isLoading) && "pointer-events-none opacity-50")}
        target={props.target}
        aria-disabled={disabled || isLoading}
      >
        {content}
      </Link>
    )
  }

  // RENDER AS BUTTON
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={combinedClassName}
      {...props}
    >
      {content}
    </button>
  )
})

Button.displayName = "Button"

export default Button