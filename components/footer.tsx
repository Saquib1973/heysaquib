'use client'
import Button from "@/components/ui/button"
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { StaggerSection, StaggerItem } from './stagger-section'

const CONFIG = {
  email: "saquibali353@gmail.com",
  whatsapp: "https://wa.me/916202303022?text=Hi%20Saquib!%20I%20saw%20your%20portfolio...",
  socials: [
    { label: "Github", href: "https://github.com/Saquib1973" },
    { label: "Twitter", href: "https://twitter.com/sacubeli" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saquib-ali-4a3235219/" },
    { label: "WhatsApp", href: "https://wa.me/916202303022?text=Hi%20Saquib!" },
  ]
}

const Footer = () => {
  const [timeData, setTimeData] = useState({ time: '', isLive: false })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12

      setTimeData({
        time: `${displayHours}:${minutes} ${ampm}`,
        isLive: hours >= 10 && hours < 22
      })
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(CONFIG.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="footer w-full py-12 pt-24 px-4 bg-transparent overflow-hidden">
      <StaggerSection className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <StaggerItem>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white leading-[0.9]">
                  Let's make something <span className="text-yellow-400 ">great.</span>
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="text-lg font-amiko text-gray-500 dark:text-gray-400 max-w-md">
                  Focusing on accessible, pixel-perfect, and performant web experiences.
                </p>
              </StaggerItem>
            </div>

            <StaggerItem className="flex items-center gap-3 relative">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="peer w-[260px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.div
                      key="copied"
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={18} />
                      <span className="font-medium text-sm">Copied!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="email"
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <Mail size={18} />
                      <span className="font-mono text-sm">{CONFIG.email}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </StaggerItem>
          </div>

          <div className="flex flex-col items-start md:items-end justify-center">
            <div className="flex flex-col items-start md:items-end gap-1">
               <StaggerItem>
                 <span className="text-xs font-bold uppercase tracking-wider underline underline-offset-4 mb-3 block">Connect</span>
               </StaggerItem>
               
               {CONFIG.socials.map((social) => (
                  <StaggerItem key={social.label} className="w-full flex md:justify-end">
                    <Button
                      variant="link"
                      onClick={() => window.open(social.href, '_blank')}
                      className="font-normal group flex items-center my-1 text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white animate-mode px-0">
                      <span className="">{social.label}</span>
                      <ArrowUpRight
                        size={16}
                        className="text-gray-400 group-hover:text-black dark:group-hover:text-yellow-400 origin-bottom-left !transition-all animate-mode group-hover:scale-125 ml-1"
                      />
                    </Button>
                  </StaggerItem>
                ))}
            </div>
          </div>
        </div>

        <StaggerItem>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-sm font-amiko text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Saquib Ali. All rights reserved.</p>

            {timeData.time && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${timeData.isLive ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${timeData.isLive ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                </span>
                <span className="font-mono text-xs text-black dark:text-white min-w-[60px] text-right tabular-nums">
                  {timeData.time}
                </span>
              </div>
            )}
          </div>
        </StaggerItem>
      </StaggerSection>
    </footer>
  )
}

export default Footer