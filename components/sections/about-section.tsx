"use client"

import ArrowDown from "@/public/arrow-down.png"
import { motion } from "framer-motion"
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import PlayName from "../play-name"
import { StaggerItem, StaggerSection } from '../stagger-section'
import Button from '../ui/button'
import Underline from '../underline'

const AboutSection = () => {
  return (
    <StaggerSection className="py-20 flex flex-col-reverse gap-12 items-center md:flex-row md:justify-between">

      {/* Left Side */}
      <div className="flex flex-col gap-6 text-left">
        <StaggerItem className="space-y-5 font-light leading-relaxed text-gray-600 dark:text-gray-400">
          <div>
            Hi, I’m{' '}
            <span className="inline-flex items-center font-normal text-gray-900 dark:text-white">
              <Underline delay={0.5} text="Saquib Ali" />
              <PlayName />
            </span>
            , a B.Tech ECE (Hons) graduate from{' '}
            <br className="hidden md:block" />

            <Link
              href="https://iiitranchi.ac.in/"
              target="_blank"
              className="inline-block align-middle group"
            >
              <motion.span
                initial="initial"
                whileHover="hover"
                layout
                className="relative inline-flex items-center justify-center px-0.5 text-black group-hover:text-white dark:text-white transition-all duration-500 dark:hover:bg-white-200 dark:group-hover:text-black dark:group-hover:bg-white-0 max-md:bg-black-2 dark:max-md:bg-white-0 dark:max-md:text-black max-md:text-white group-hover:bg-black-0"
              >
                <motion.span layout className="font-semibold underline underline-offset-4 group-hover:no-underline transition-all duration-500">
                  IIIT Ranchi
                </motion.span>

                <motion.span
                  variants={{
                    initial: { width: 0, opacity: 0, scale: 0.5 },
                    hover: { width: "auto", opacity: 1, scale: 1 }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center overflow-hidden group-hover:bg-yellow-400 rounded-full ml-2 justify-center"
                >
                  <ArrowUpRight className="group-hover:p-0.5 w-5 h-5 text-black dark:text-white" />
                </motion.span>
              </motion.span>
            </Link>
          </div>
          <p>
            I am passionate about <span className="text-gray-900 dark:text-white font-normal">using simple ideas to solve problems through coding</span>.
            I enjoy tackling challenges and building meaningful solutions.
          </p>

        </StaggerItem>

        <StaggerItem className="relative w-fit pt-2 flex justify-start">
          <Image
            src={ArrowDown}
            alt="Arrow decoration"
            width={150}
            height={150}
            className="absolute -top-12 -right-20 z-10 w-24 rotate-12 p-1 dark:invert"
          />
          <Button href="/about" variant="secondary" size="sm" className="w-fit">
            More about me <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </StaggerItem>
      </div>

      <StaggerItem className="flex justify-start max-md:w-full md:justify-end">
        <div className="group relative w-36 sm:w-48 md:w-52 aspect-square">
          <Image
            src="/assets/saquib.jpg"
            alt="Saquib Ali"
            fill
            priority
            className="rounded-full border-2 border-zinc-100 dark:border-zinc-900 animate-mode object-cover"
          />
        </div>
      </StaggerItem>

    </StaggerSection>
  )
}

export default AboutSection