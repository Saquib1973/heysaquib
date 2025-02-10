'use client'
import type { ProjectInterface } from '@/lib/data'
import { Projects } from '@/lib/data/projects'
import { motion } from 'framer-motion'
import { Link as TransitionLink } from 'next-view-transitions'
import Link from 'next/link'
import type { ProjectCardType } from '.'
import { Badge } from './ui/badge'
import { useRouter } from 'next/navigation'
const page = () => {
  const featuredProjects: ProjectInterface[] = Projects.filter(
    (project) => project.featured
  )
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="section"
    >
      <p className="rampart-h1 projects">Project</p>
      <div className="grid grid-cols-1 lg:mx-1 lg:grid-cols-2 h-full gap-4 md:gap-6 py-4 md:py-6 md:pt-16">
        {featuredProjects.map((project, index) => {
          return (
            <ProjectCard
              key={index}
              index={index}
              id={project.id}
              name={project.name}
              detail={project.detail}
              tags={project.tags}
              git={project.git}
              liveLink={project.link}
              image={project.img}
              date={project.date}
              status={project.status}
            />
          )
        })}
      </div>
      <div className="flex justify-end mt-3 md:mt-6 items-center">
        <TransitionLink
          href="/projects"
          className="flex gap-1 group items-center text-green text-lg transition underline-offset-4 hover:underline"
        >
          View All Projects
          <svg
            className={`text-xl text-green group-hover:rotate-0 rotate-45 group-hover:text-yellow-500 hover:scale-110 group-hover:translate-x-0.5 transition-all group-hover:-translate-y-0.5"}`}
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </TransitionLink>
      </div>
    </motion.div>
  )
}
const ProjectCard = ({
  name,
  detail,
  index,
  tags,
  id,
  git: repoLink,
  liveLink,
  date,
  status,
}: ProjectCardType) => {
  const router = useRouter()
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.5, duration: 1 }}
    >
      <div
        className={`relative mouse-pointer block h-full group bg-gray-200 dark:bg-black-0`}
        // tabIndex="0"
      >
        <motion.div
          onClick={() => router.push(`/projects/${id}`)}
          className="cursor-pointer lg:group-hover:translate-x-[0.010rem] lg:group-hover:translate-y-[0.010rem] border group-hover:border-yellow-4 dark:group-hover:border-yellow-4 bg-white border-1 dark:bg-black-1 txt h-full flex flex-col p-2 pb-4 transition-all lg:-translate-x-2 lg:-translate-y-2 justify-between relative duration-300"
        >
          <div className=" p-4 pb-0 flex flex-col h-full">
            <motion.div className="flex w-full flex-col items-start justify-between md:flex-row md:space-x-2">
              <h3 className="text-xl md:text-2xl flex items-center w-full mb-1">
                {name}
                <span
                  className={`text-sm border ml-4 px-2 max-h-min rounded-md tracking-wide flex items-center gap-1 max-w-fit ${
                    status === 'live'
                      ? 'bg-green-50 text-green-500 border-green-500 dark:bg-green-600 dark:text-green-100 dark:border-green-300'
                      : status === 'building'
                      ? 'bg-yellow-50 text-yellow-600 border-yellow-600  dark:bg-yellow-600 dark:text-yellow-100 dark:border-yellow-300'
                      : 'bg-red-50 text-red-500 border-red-500  dark:bg-red-600 dark:text-red-100 dark:border-red-300'
                  }`}
                >
                  {status}
                  <span
                    className={`h-1.5 w-1.5 animate-pulse rounded-full ${
                      status === 'live'
                        ? 'bg-green-500'
                        : status === 'building'
                        ? 'bg-yellow-600'
                        : 'bg-red-500'
                    } animate-blink`}
                  />
                </span>
              </h3>

              <time
                dateTime={date}
                className="absolute top-0 right-2 bg-white  group-hover:border-yellow-4 transition dark:bg-black-1 border-1 -translate-y-2.5 whitespace-nowrap text-sm max-md:text-xs border p-1 pb-0.5"
              >
                {date}
              </time>
            </motion.div>
            <div className="flex w-full items-center justify-between mt-2">
              <p className="text-sm tracking-tight">{detail}</p>
            </div>
            <div className="flex gap-1 gap-y-1 items-center overflow-y-auto flex-wrap mt-2">
              {tags &&
                tags.map((tag, index) => (
                  <Badge variant="outline" className="badge" key={index}>
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="flex gap-2 justify-end px-4">
            <Link
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              className="link-text"
              href={repoLink}
            >
              Github
            </Link>
            <Link
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              className="link-text"
              href={liveLink}
            >
              Live
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default page
