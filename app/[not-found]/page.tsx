'use client'

import { StaggerItem, StaggerSection } from '@/components/stagger-section'
import Button from '@/components/ui/button'
import { Home } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden relative">
      <StaggerSection className="w-full max-w-2xl mx-auto text-center relative z-10">
        
        {/* Layer 1: Massive Background Number (Subtle Texture) */}
        <StaggerItem>
            <h1 className="text-[10rem] sm:text-[14rem] md:text-[16rem] font-bold leading-none text-gray-100 dark:text-white/[0.03] select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                404
            </h1>
        </StaggerItem>

        {/* Layer 2: Foreground Content */}
        <div className="space-y-6">
            <StaggerItem>
                <div className="inline-block px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-500/10 text-xs font-mono font-medium text-yellow-700 dark:text-yellow-500 uppercase tracking-wider mb-4">
                    Error 404
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Page not found
                </h2>
            </StaggerItem>

            <StaggerItem>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed font-light">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                </p>
            </StaggerItem>

            <StaggerItem className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button href="/" variant="secondary" size="lg" className="min-w-[160px] justify-center">
                    <Home className="mr-2 w-4 h-4" />
                    Go Home
                </Button>
                
                {/* Optional: A simple back button using standard anchor or div if router.back logic is preferred, 
                    but strictly linking to previous page isn't always reliable in 404s. 
                    Keeping it simple with just Home is usually better UX. */}
            </StaggerItem>
        </div>

      </StaggerSection>
    </div>
  )
}

export default NotFoundPage