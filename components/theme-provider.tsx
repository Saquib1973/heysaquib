"use client"
import * as React from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Optional: Prevent hydration mismatch by waiting for mount
  // If you don't mind a potential split-second flicker, you can remove the !mounted check
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}