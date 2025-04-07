'use client'
import { motion } from 'framer-motion'
import FadeInAnimation from './FadeInAnimation'
import { Badge } from './ui/badge'
import Link from 'next/link'
import { experiences } from '@/lib/data/experience'





const ExperienceSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.4, duration: 1 }}
      className="section"
    >
      <FadeInAnimation>
        <h1 className="rampart-h1 mb-4">EXPERIENCE</h1>
      </FadeInAnimation>

      <div className="py-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="mb-8 last:mb-0"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">{exp.role}</h3>
                {exp.website ? (
                  <Link
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-text text-lg text-yellow-4 hover:text-yellow-500 transition-colors"
                  >
                    {exp.company}
                  </Link>
                ) : (
                  <p className="text-lg text-yellow-4">{exp.company}</p>
                )}
              </div>
              <div className="flex flex-col md:items-end mt-2 md:mt-0">
                <time className="text-sm text-gray-600 dark:text-gray-400">{exp.duration}</time>
                <p className="text-sm text-gray-600 dark:text-gray-400">{exp.location}</p>
              </div>
            </div>

            <ul className="list-disc list-inside space-y-1 mb-3">
              {exp.description.map((item, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">{item}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <Badge key={i} variant="outline" className="badge">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ExperienceSection