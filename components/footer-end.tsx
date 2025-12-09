'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { StaggerItem } from './stagger-section'

const FooterEnd = () => {
    const [mounted, setMounted] = useState(false)
    const [visitors, setVisitors] = useState(0)
    const [timeData, setTimeData] = useState({ 
        time: '', 
        isLive: false 
    })

    useEffect(() => {
        setMounted(true)
        setVisitors(8420) // Static or fetched count

        const updateTime = () => {
            const now = new Date()
            // 24H format matches the minimalist aesthetic better
            const hours = now.getHours()
            const minutes = now.getMinutes().toString().padStart(2, '0')
            
            // Logic: Online between 10 AM and 10 PM
            const isOnline = hours >= 10 && hours < 22

            setTimeData({
                time: `${hours.toString().padStart(2, '0')}:${minutes}`,
                isLive: isOnline
            })
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    if (!mounted) return (
        <StaggerItem className='pt-20 py-12'>
             <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded" />
        </StaggerItem>
    )

    return (
        <StaggerItem className='pt-20 py-12'>
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* LEFT: Copyright */}
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    © 2025 Saquib Ali.
                </p>

                {/* RIGHT: Minimalist "Raw Text" + Status Dot */}
                <div className="flex items-center gap-3 text-xs font-medium text-zinc-400">
                    
                    {/* Location & Time */}
                    <span className="flex items-center gap-1.5">
                        Patna, IN 
                        <span className="text-zinc-700 dark:text-zinc-200 font-mono">
                            {timeData.time}
                        </span>
                    </span>

                    {/* The Status Dot (Functions as a separator) */}
                    <span className="relative flex h-2 w-2 mx-1" title={timeData.isLive ? "Online" : "Offline"}>
                        <span className={cn(
                            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                            timeData.isLive ? 'bg-emerald-500' : 'bg-orange-500'
                        )}/>
                        <span className={cn(
                            "relative inline-flex rounded-full h-2 w-2",
                            timeData.isLive ? 'bg-emerald-500' : 'bg-orange-500'
                        )}/>
                    </span>

                    {/* Visitors */}
                    <span>
                        <span className="text-zinc-700 dark:text-zinc-200 font-mono">
                            {visitors.toLocaleString()}
                        </span>
                        {' '} total views
                    </span>

                </div>
            </div>
        </StaggerItem>
    )
}

export default FooterEnd