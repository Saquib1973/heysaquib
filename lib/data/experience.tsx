
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
    company: 'Cokub',
    role: 'Fullstack Developer',
    duration: '2025 - Present', // Shortened date looks cleaner
    location: 'Remote, United States',
    website: 'https://cokub.com/',
    logo: '/assets/experience/cokub-logo.png',
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