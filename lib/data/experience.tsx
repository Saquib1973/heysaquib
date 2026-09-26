
export interface Experience {
  company: string
  role: string
  duration: string
  location: string
  website: string
  logo: string
  technologies: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Eximpedia',
    role: 'Fullstack Developer',
    duration: 'Sept 2026 - Present',
    location: 'Noida, Delhi, India',
    website: 'https://www.eximpedia.app/',
    logo: '/assets/experience/eximpedia',
    technologies: ['React', 'Next']
  },
  {
    company: 'Pleesh',
    role: 'Fullstack Developer',
    duration: 'May 2025 - May 2026',
    location: 'Remote, Australia',
    website: 'https://pleesh.com/',
    logo: '',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
  },
  {
    company: 'Fursat Farms',
    role: 'Fullstack Intern',
    duration: 'Feb - Apr 2025',
    location: 'Remote, Darjeeling, India',
    website: 'https://beasportsai.com',
    logo: '/assets/experience/beasportai.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
  },
]