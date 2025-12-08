'use client'
import React, { useEffect, useState } from 'react'

interface Heading {
  text: string | null
  id: string | null
}

interface OnThisPageProps {
  htmlContent: string
}

const OnThisPage: React.FC<OnThisPageProps> = ({ htmlContent }) => {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    // Parse the HTML content and extract h2 headings
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    const h2Elements = tempDiv.querySelectorAll('h2')
    const h2Data: Heading[] = Array.from(h2Elements).map((h2) => ({
      text: h2.textContent,
      id: h2.id,
    }))
    setHeadings(h2Data)
  }, [htmlContent])

  return (
    <div className="h-fit my-10 py-2">
      <h2 className="amiko-h2 mb-2">On This Page</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-3 tracking-wider text-sm py-4">
        {headings.map((heading, index) => (
          <li key={index} className="flex items-center gap-1 group w-full">
            <a
              href={`#${heading.id}`}
              className={`flex gap-1 flex-row-reverse overflow-hidden whitespace-nowrap group items-center w-full transition text-gray-1 hover:text-black-0 dark:hover:text-gray-200 dark:text-gray-500 relative`}
            >
              {heading.text}
              <span className="flex-grow mx-1 h-px transition bg-gray-300 group-hover:bg-gray-800 dark:bg-gray-500 dark:group-hover:bg-gray-200" />
              <span className="max-md:hidden">{index + 1}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OnThisPage
