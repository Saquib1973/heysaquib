'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Mail } from 'lucide-react'
import { useState } from 'react'
import SocialLinks from './social-links'
import { StaggerItem, StaggerSection } from './stagger-section'
import Button from './ui/button'

const email = "saquibali353@gmail.com"

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="w-full py-16 px-6">
      <StaggerSection className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6">

        <StaggerItem>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
            For inquiries or to connect, feel free to drop me an email.
          </p>
        </StaggerItem>

        <StaggerItem>
          <Button
            variant="outline-s"
            size="sm"
            onClick={handleCopy}
            className='w-[250px]'
          >
            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={copied ? "check" : "mail"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {copied ? (
                    <Check size={16} className="text-emerald-500" />
                  ) : (
                    <Mail size={16} className="text-neutral-500" />
                  )}
                </motion.div>
              </AnimatePresence>
              <span className="text-neutral-800 dark:text-neutral-200 font-medium">
                {copied ? "Address Copied" : email}
              </span>
            </div>
          </Button>
        </StaggerItem>

        <StaggerItem className="w-full flex flex-col items-center gap-6 mt-4">
          <div className="w-12 h-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <SocialLinks />
        </StaggerItem>


      </StaggerSection>
    </footer>
  )
}