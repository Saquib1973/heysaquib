import { BracketsIcon, HomeIcon, UserIcon } from 'lucide-react'
import type { ReactElement } from 'react'

interface HeaderLink {
  name: string
  href: string
  logo?: ReactElement
}

export const headerLinks: HeaderLink[] = [
  {
    name: 'Home',
    href: '/',
    logo: <HomeIcon className="w-5 h-5" aria-hidden="true" />,
  },
  // {
  //   name: 'About',
  //   href: '/about',
  //   logo: <UserIcon className="w-5 h-5" aria-hidden="true" />,
  // },
  {
    name: 'Projects',
    href: '/projects',
    logo: <BracketsIcon className="w-5 h-5" aria-hidden="true" />,
  },
  // {
  //   name: 'Blogs',
  //   href: '/blogs',
  //   logo: <BookOpenIcon className="w-5 h-5" aria-hidden="true" />,
  // },
  {
    name: 'Resume',
    href: 'https://drive.google.com/file/d/1uy_pExXcnC35CJEACcN3DfigwJPFtd_o/view',
  },
]