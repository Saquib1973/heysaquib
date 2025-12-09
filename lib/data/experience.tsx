import Link from 'next/link'
import React from 'react'

export interface Experience {
  company: string
  role: string
  duration: string
  location: string
  content: React.ReactNode
  technologies: string[]
  website?: string
  images?: { src: string; alt: string }[]
}

export const experiences: Experience[] = [
  {
    company: 'Cokub',
    role: 'Fullstack Developer',
    duration: 'Feb 2025 - Present',
    location: 'Australia (Remote)',
    content: (
      <div>
        <ul className="list-disc list-inside space-y-2 mb-3">
          <li>
            Built a crypto on-ramping platform{' '}
            <Link href="https://amsa-fintech.vercel.app/" target="_blank" className="text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600">
              amsafintech.com
            </Link>{' '}
            for Amsa Fintech, using Next.js and TypeScript.
          </li>
          <li>
            Worked closely with the client to understand their needs and
            designed the full system from scratch, including frontend, backend,
            and database.
          </li>
          <li>
            Integrated CoinGecko API for real-time crypto prices and Transak API
            to allow users to buy crypto using fiat currency.
          </li>
          <li>
            Used Prisma ORM to design and manage a PostgreSQL database,
            including complete schema creation for users, transactions, and
            more.
          </li>
          <li>
            Built a basic notification system using long polling to alert users
            about logins, transactions, and other important activities.
          </li>
          <li>
            Added analytics so users can view their purchase history and track
            activity through simple charts and summaries.
          </li>
        </ul>
      </div>
    ),
    technologies: [
      'Next.js',
      'TypeScript',
      'CoinGecko API',
      'Transak API',
      'Prisma',
      'PostgreSQL',
    ],
    website: 'https://cokub.com/',
    images: [
      {
        src: '/assets/experience/amsa/amsa-1.png',
        alt: 'Amsa Fintech Home Page',
      },
      {
        src: '/assets/experience/amsa/amsa-2.png',
        alt: 'Amsa Fintech Dashboard',
      },
      {
        src: '/assets/experience/amsa/amsa-3.png',
        alt: 'Amsa Fintech Transactions',
      },
    ],
  },
  {
    company: 'Fursat Farms',
    role: 'Fullstack Intern',
    duration: 'Feb 2025 - Apr 2025',
    location: 'Remote',
    content: (
      <div className="">
        <ul className="list-disc list-inside space-y-2 mb-3">
          <li>
            Contributed to the development of{' '}
            <Link href="https://beasportsai.com" target="_blank" className="text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-600">
              beasportsai.com
            </Link>{' '}
            a football SaaS platform, by developing key features, including the
            landing page and multiple other pages, using Next.js for the
            frontend and Node.js for backend services.
          </li>
          <li>
            Developed a custom video streaming API with Next.js, reducing video
            load times by 5%.
          </li>
          <li>
            It is a Saas which offering football courses with integrated AI to
            enhance user experience.
          </li>
        </ul>
      </div>
    ),
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    website: 'https://beasportai.com/',
    images: [
      {
        src: '/assets/experience/beasportai/beasportai-1.png',
        alt: 'BeaSports AI Home Page',
      },
      {
        src: '/assets/experience/beasportai/beasportai-2.png',
        alt: 'BeaSports AI Courses',
      },
      {
        src: '/assets/experience/beasportai/beasportai-3.png',
        alt: 'BeaSports AI Video Streaming',
      },
    ],
  },
]