'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { 
  X, 
  Sun, 
  Wind, 
  Droplets, 
  Navigation, 
  ArrowUpRight 
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface TimeWidgetProps {
  location?: string;
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2 // Wait for layout expansion to finish partially
    }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
}

export const TimeWidget = ({ location = "San Francisco, CA" }: TimeWidgetProps) => {
  const [timeData, setTimeData] = useState({ 
    time: '', 
    ampm: '',
    date: '',
    day: '',
    greeting: '',
    isLive: false 
  })
  const [isTimeOpen, setIsTimeOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const WEATHER_IMG = "https://images.unsplash.com/photo-1542601098-8fc114e148e2?q=80&w=2070&auto=format&fit=crop"
  const MAP_IMG = "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1748&auto=format&fit=crop"

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12

      let greeting = 'Good Evening'
      if (hours < 12) greeting = 'Good Morning'
      else if (hours < 18) greeting = 'Good Afternoon'

      setTimeData({
        time: `${displayHours}:${minutes}`,
        ampm,
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        day: now.toLocaleDateString('en-US', { weekday: 'long' }),
        greeting,
        isLive: hours >= 9 && hours < 23
      })
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTimeOpen(false)
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  useEffect(() => {
    if (isTimeOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isTimeOpen])

  if (!mounted || !timeData.time) return null;

  return (
    <>
      {/* --- Trigger Widget --- */}
      <motion.button 
        layoutId="widget-container" // Key for shared layout animation
        onClick={() => setIsTimeOpen(true)}
        className="group relative flex items-center gap-3 pl-3 pr-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 z-40"
      >
        <motion.div layoutId="status-indicator" className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${timeData.isLive ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${timeData.isLive ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
        </motion.div>
        
        <div className="flex flex-col items-start text-xs leading-none">
          <motion.span layoutId="clock-text" className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {timeData.time} <span className="text-zinc-400 font-normal">{timeData.ampm}</span>
          </motion.span>
          <motion.span layoutId="location-text" className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {location.split(',')[0]}
          </motion.span>
        </div>
      </motion.button>

      {/* --- Expanded Modal --- */}
      {createPortal(
        <AnimatePresence>
          {isTimeOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsTimeOpen(false)}
                className="absolute inset-0 bg-zinc-200/20 dark:bg-black/40 backdrop-blur-xl"
              />
              
              {/* Main Container */}
              <motion.div
                layoutId="widget-container"
                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                className="relative w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
              >
                
                {/* Close Button */}
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setIsTimeOpen(false)}
                  className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/50 dark:bg-black/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors backdrop-blur-sm text-zinc-500"
                >
                  <X size={20} />
                </motion.button>

                {/* Staggered Content Grid */}
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 h-full min-h-[420px]"
                >
                  
                  {/* Left Column */}
                  <div className="md:col-span-5 flex flex-col gap-3 h-full">
                    
                    {/* Time Card */}
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] p-8 flex flex-col justify-between border border-zinc-100 dark:border-zinc-800/50 relative overflow-hidden group"
                    >
                      {/* Decorative background blob */}
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full blur-3xl group-hover:bg-zinc-300/50 transition-colors" />

                      <div className="relative z-10">
                         <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800/80 text-xs font-medium text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-700/50 mb-6 shadow-sm">
                            <motion.div layoutId="status-indicator" className={`h-2 w-2 rounded-full ${timeData.isLive ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                            Local Time
                         </span>
                         <h2 className="text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-none">
                            {timeData.time.split(':')[0]}
                            <span className="text-zinc-300 dark:text-zinc-700 animate-pulse">:</span>
                            {timeData.time.split(':')[1]}
                         </h2>
                         <span className="text-xl text-zinc-400 font-medium ml-1 block mt-1">{timeData.ampm}</span>
                      </div>
                      
                      <div className="relative z-10 space-y-1">
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">{timeData.greeting}</p>
                        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{timeData.day}, {timeData.date}</p>
                      </div>
                    </motion.div>

                    {/* Status Pill */}
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-zinc-50 dark:bg-zinc-900/50 rounded-[2rem] p-6 border border-zinc-100 dark:border-zinc-800/50 flex items-center gap-4 cursor-default"
                    >
                       <div className="flex-1">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                          {timeData.isLive ? "Online" : "Away"}
                          <span className={`inline-block w-2 h-2 rounded-full ${timeData.isLive ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                        </p>
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
                          {timeData.isLive ? "Responses are usually quick." : "I will respond when back."}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Column */}
                  <div className="md:col-span-7 flex flex-col gap-3 h-full">
                    
                    {/* Weather Card */}
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      className="relative h-52 rounded-[2rem] overflow-hidden group cursor-pointer"
                    >
                      <motion.img 
                        src={WEATHER_IMG} 
                        alt="Weather" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-center text-white">
                        <div className="flex items-center gap-2 mb-2">
                           <Sun size={18} className="text-yellow-300" />
                           <span className="font-medium text-white/90 text-sm">San Francisco</span>
                        </div>
                        <div className="text-5xl font-bold tracking-tight mb-4">24°C</div>
                        <div className="flex gap-4 text-xs text-white/80 font-medium uppercase tracking-wide">
                          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10"><Droplets size={12}/> 42%</span>
                          <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10"><Wind size={12}/> 12km/h</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Map Card */}
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      className="relative flex-1 rounded-[2rem] overflow-hidden group bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                    >
                       <img 
                        src={MAP_IMG} 
                        alt="Map View" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                       
                       <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent dark:from-zinc-950/95 dark:via-zinc-950/40" />

                       <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                          <div>
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1 text-[10px] uppercase tracking-wider font-bold">
                              <Navigation size={12} />
                              Current Location
                            </div>
                            <motion.h3 
                              layoutId="location-text" 
                              className="text-xl font-bold text-zinc-900 dark:text-white"
                            >
                              {location}
                            </motion.h3>
                          </div>

                          <div className="h-10 w-10 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black shadow-lg transform group-hover:-rotate-45 transition-transform duration-300">
                             <ArrowUpRight size={20} />
                          </div>
                       </div>
                    </motion.div>

                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}