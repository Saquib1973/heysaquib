import type { Experience } from '.';
import Link from 'next/link';

export const experiences: Experience[] = [
  {
    company: 'Cokub',
    role: 'Freelance',
    duration: 'Mar 2025 - Present',
    location: 'Remote',
    content: (
      <div className="">
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Built a crypto on-ramping platform <Link href="https://amsafintech.com" className="link-text">amsafintech.com</Link> using Next.js for Australia-based Amsa Fintech.
          </li>
          <li>
            Integrated CoinGecko for live prices and Transak for fiat-to-crypto payments.
          </li>
          <li>
            Delivered a secure, scalable platform with smooth frontend-backend sync and API integration.
          </li>
        </ul>
      </div>
    ),
    technologies: ['Next.js', 'TypeScript', 'CoinGecko API', 'Transak API'],
    website: 'https://amsafintech.com/',
    images: [
      {
        src: '/assets/experience/amsa/amsa-1.png',
        alt: 'Amsa Fintech Home Page'
      },
      {
        src: '/assets/experience/amsa/amsa-2.png',
        alt: 'Amsa Fintech Dashboard'
      },
      {
        src: '/assets/experience/amsa/amsa-3.png',
        alt: 'Amsa Fintech Transactions'
      }
    ]
  },
  {
    company: 'Fursat Farms',
    role: 'Full Stack Intern',
    duration: 'Feb 2025 - Present',
    location: 'Remote',
    content: (
      <div className="">
        <ul className="list-disc list-inside space-y-1 mb-3">
          <li>
            Contributed to the development of <Link href="https://beasportsai.com" className="link-text">beasportsai.com</Link> a football SaaS platform, by developing key features, including the landing page and multiple other pages, using Next.js for the frontend and Node.js for backend services.
          </li>
          <li>
            Developed a custom video streaming API with Next.js, reducing video load times by 5%.
          </li>
          <li>
            It is a Saas which offering football courses with integrated AI to enhance user experience.
          </li>
        </ul>
      </div>
    ),
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    website: 'https://beasportai.com/',
    images: [
      {
        src: '/assets/experience/beasportai/beasportai-1.png',
        alt: 'BeaSports AI Home Page'
      },
      {
        src: '/assets/experience/beasportai/beasportai-2.png',
        alt: 'BeaSports AI Courses'
      },
      {
        src: '/assets/experience/beasportai/beasportai-3.png',
        alt: 'BeaSports AI Video Streaming'
      }
    ]
  },
]