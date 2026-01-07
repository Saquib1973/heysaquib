'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Mail } from 'lucide-react'
import { useState } from 'react'
import { StaggerItem, StaggerSection } from './stagger-section'
import Button from './ui/button'

const CONFIG = {
  email: "saquibali353@gmail.com",
  socials: [
    { label: "Github", href: "https://github.com/Saquib1973" },
    { label: "Twitter", href: "https://twitter.com/sacubeli" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saquib-ali-4a3235219/" },
    { label: "WhatsApp", href: "https://wa.me/916202303022" },
  ]
}

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CONFIG.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="relative w-full pt-20 pb-10 overflow-hidden">
      <StaggerSection className="relative z-20 px-6 flex flex-col items-center text-center">

        {/* HEADING */}
        <StaggerItem>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-800 dark:text-neutral-200 mb-6">
            Have an idea? <span className="text-neutral-400 dark:text-neutral-500 italic font-light">Let's connect.</span>
          </h2>
        </StaggerItem>

        {/* EMAIL BUTTON (Using Custom Button) */}
        <StaggerItem className="mb-10">
          <Button
            variant="primary-s"
            size="sm"
            onClick={handleCopy}
            className='w-80'

          >
            <div className="relative h-4 w-4 flex items-center justify-center mr-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={copied ? "check" : "mail"}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Mail size={14} className="text-neutral-400" />}
                </motion.div>
              </AnimatePresence>
            </div>
            <span>{copied ? "Copied" : CONFIG.email}</span>
          </Button>
        </StaggerItem>

        <div className="flex gap-8 mb-12">
          {CONFIG.socials.map((link) => (
            <StaggerItem key={link.label}>
              <a href={link.href} target="_blank" className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1">
                {link.label} <ArrowUpRight size={10} className="opacity-30" />
              </a>
            </StaggerItem>
          ))}
        </div>

      </StaggerSection>
    </footer>
  )
}