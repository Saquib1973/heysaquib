'use client'

import { useEffect, useState } from 'react'

export const StatusClock = () => {
    const [timeData, setTimeData] = useState({ time: '', isLive: false })

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const hours = now.getHours()
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const ampm = hours >= 12 ? 'PM' : 'AM'
            const displayHours = hours % 12 || 12

            setTimeData({
                time: `${displayHours}:${minutes} ${ampm}`,
                // Logic: Online between 10 AM and 10 PM
                isLive: hours >= 10 && hours < 22
            })
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    // Prevent hydration mismatch or empty render
    if (!timeData.time) return null

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <span className="relative flex h-2 w-2">
                <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${timeData.isLive ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                />
                <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${timeData.isLive ? 'bg-green-500' : 'bg-orange-500'
                        }`}
                />
            </span>
            <span className="font-mono text-xs text-black dark:text-white min-w-[60px] text-right tabular-nums">
                {timeData.time}
            </span>
        </div>
    )
}