import React from 'react'
import { Link } from 'next-view-transitions'

const certificates = [
  {
    text: 'DSA with Fraz',
    href: 'https://drive.google.com/file/d/1t6l64xUsDSw9LwCj9XoQhiqlGFX1_j6h/view',
  },
  {
    text: 'Web Development by Angela Yu',
    href: 'https://www.udemy.com/certificate/UC-07816a11-5d5d-4ba7-99e3-07521e03ccf1/',
  },
  { text: 'Harkirat Cohort 3.0', href: '/' },
  { text: 'Harkirat Web3', href: '/' },
  {
    text: 'Solution Challenge Hackathon',
    href: 'https://drive.google.com/file/d/1bCLa9oCI_OrSWUnNuW9gAJPpkDNsZc6P/view',
  },
  // { text: '', href: '/' },
]

const CertificateSection = () => {
  return (
    <div className="py-2">
      <p className="amiko-h2">Certificates</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 tracking-wider text-sm py-4">
        {certificates.map((certificate, index) => (
          <Link
          target="_blank"
            key={index}
            href={certificate.href}
            className={`flex gap-1  overflow-hidden group items-center w-full transition text-gray-1 hover:text-black-0 dark:hover:text-gray-200 dark:text-gray-500 relative`}
          >
            <span className='truncate'>

            {certificate.text}
            </span>
            <span className="flex-grow mx-1 h-px transition bg-gray-300 group-hover:bg-gray-800 dark:bg-gray-500 dark:group-hover:bg-gray-200" />
            <span className="max-md:hidden">{index + 1}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CertificateSection
