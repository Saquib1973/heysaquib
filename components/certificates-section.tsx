import React from 'react'
import { Link } from 'next-view-transitions'
import { ArrowUpRight } from 'lucide-react'

const certificates = [
  {
    text: 'DSA with Fraz',
    href: 'https://drive.google.com/file/d/1t6l64xUsDSw9LwCj9XoQhiqlGFX1_j6h/view',
    issuer: 'Google Drive',
  },
  {
    text: 'Web Development by Angela Yu',
    href: 'https://www.udemy.com/certificate/UC-07816a11-5d5d-4ba7-99e3-07521e03ccf1/',
    issuer: 'Udemy',
  },
  { text: 'Harkirat Cohort 3.0', href: '/', issuer: '100xDevs' },
  { text: 'Harkirat Web3', href: '/', issuer: '100xDevs' },
  {
    text: 'Solution Challenge Hackathon',
    href: 'https://drive.google.com/file/d/1bCLa9oCI_OrSWUnNuW9gAJPpkDNsZc6P/view',
    issuer: 'Google DSC',
  },
]

const CertificateSection = () => {
  return (
    <div className="py-12">
      <h2 className="text-sm font-semibold text-zinc-400 mb-6 uppercase tracking-wider">
        Certifications
      </h2>
      
      <div className="flex flex-col group">
        {certificates.map((cert, index) => (
          <Link
            key={index}
            href={cert.href}
            target={cert.href.startsWith('http') ? '_blank' : undefined}
            className="
              group/item
              flex items-center justify-between py-4 border-b border-zinc-100 dark:border-zinc-800 transition-all duration-500 ease-out
              opacity-100
              md:group-hover:opacity-30
              md:hover:!opacity-100 md:hover:pl-4
            "
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-zinc-300 dark:text-zinc-600 transition-colors group-hover/item:text-zinc-500 dark:group-hover/item:text-zinc-400">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
                  {cert.text}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 transition-colors group-hover/item:text-zinc-600 dark:group-hover/item:text-zinc-300">
                  {cert.issuer}
                </p>
              </div>
            </div>

            <ArrowUpRight className="w-5 h-5 text-zinc-800 dark:text-zinc-200 transition-all duration-300 ease-out
              opacity-100 translate-x-0
              md:opacity-0 md:-translate-x-4
              md:group-hover/item:translate-x-0 md:group-hover/item:opacity-100" 
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CertificateSection