import React from 'react'
import Link from 'next/link'

const links = [
  {
    text: 'My Resume',
    href: 'https://drive.google.com/file/d/1a5tBPdkgfUi3My75upcW69VVQD8RPjwD/view',
  },
  { text: 'LinkedIn', href: 'https://www.linkedin.com/in/saquibali1973/' },
  { text: 'Github', href: 'https://github.com/Saquib1973' },
  { text: 'Leetcode', href: 'https://leetcode.com/u/sacube/' },
  { text: 'Twitter', href: 'https://x.com/sacubeli' },
  { text: 'Instagram', href: 'https://www.instagram.com/sacubeli/#' },
  {
    text: 'HTML5 Canvas Guide',
    href: 'https://wtf.tw/ref/fulton_fulton.pdf',
  },
]

const QuickLinks = () => {
  return (
    <div className="py-2">
      <h1 className="amiko-h2">Quick Links</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 tracking-wider text-sm py-4">
        {links.map((link, index) => (
          <Link
            key={index}
            className={`flex gap-0.5 group items-center w-full transition text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-500 relative`}
            href={link.href}
          >
            <span className='truncate'>

            {link.text}
            </span>
            <span className="flex-grow mx-1 h-px transition bg-gray-300 group-hover:bg-gray-800 dark:bg-gray-500 dark:group-hover:bg-gray-200" />
            <span className='max-md:hidden'>

            {index + 1}
          </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default QuickLinks
