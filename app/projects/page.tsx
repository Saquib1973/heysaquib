'use client'
import { Projects } from '@/lib/data/projects'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import FadeInAnimation from '@/components/FadeInAnimation'
import StaggerAnimation from '@/components/StaggerAnimation'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter()
  return (
    <FadeInAnimation>
      <div className="">
        <h1 className="rampart-h1 projects ml-2 my-4">Projects</h1>
        <div className="grid md:grid-cols-2">
          {Projects.map((project, index) => (
            <div
              onClick={() => router.push(`/projects/${project.id}`)}
              key={project.id}
              className={`cursor-pointer hover:border-b-yellow-4 group dark:hover:border-b-yellow-4 border border-t-transparent border-r border-l-transparent dark:border-t-transparent dark:border-r dark:border-l-transparent ${
                index % 2 === 0
                  ? ''
                  : 'border-r-transparent dark:border-r-transparent'
              } p-6 md:p-4 hover:bg-white-2 transition justify-between group dark:hover:bg-black-2 border-b dark:border-black-0 border-gray-0 flex flex-col gap-2`}
            >
              <div className="flex flex-col gap-1">
                <div className="w-full flex items-end gap-1">
                  <span className="text-5xl md:text-6xl font-rampart mr-2">
                    {index + 1}
                  </span>
                  <p className="text-2xl flex items-end txt md:text-2xl line-clamp-1 project-heading">
                    {project.name}
                    <span
                      className={`text-sm border ml-4 px-2 max-h-min rounded-md tracking-wide flex items-center gap-1 max-w-fit ${
                        project.status === 'live'
                          ? 'bg-green-50 text-green-500 border-green-500 dark:bg-green-600 dark:text-green-100 dark:border-green-300'
                          : project.status === 'building'
                          ? 'bg-yellow-50 text-yellow-600 border-yellow-600  dark:bg-yellow-600 dark:text-yellow-100 dark:border-yellow-300'
                          : 'bg-red-50 text-red-500 border-red-500  dark:bg-red-600 dark:text-red-100 dark:border-red-300'
                      }`}
                    >
                      {project.status}
                      <span
                        className={`h-1.5 w-1.5 animate-pulse rounded-full ${
                          project.status === 'live'
                            ? 'bg-green-500'
                            : project.status === 'building'
                            ? 'bg-yellow-600'
                            : 'bg-red-500'
                        } animate-blink`}
                      />
                    </span>
                  </p>
                </div>
                <div className="h-0.5 group-hover:w-1/3 w-[20%] transition bg-gray-0 dark:bg-black-0 my-4 group-hover:bg-yellow-4 " />
                <p className="txt-light text-sm tracking-widest">
                  {project.detail}
                </p>
                <div className="flex gap-1 flex-wrap">
                  {project?.tags?.map((tag, index) => (
                    <Badge variant="outline" className="badge" key={index}>
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm txt-light text-right">{project.date}</p>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="flex gap-2">
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    href={project.git}
                    target="_blank"
                    className="link-text"
                  >
                    Github
                  </Link>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    href={project.link}
                    target="_blank"
                    className="link-text"
                  >
                    Live
                  </Link>
                </div>
                {/* <Link
                  href={`/projects/${project.id}`}
                  className="hover:underline text-purple-500 transition-colors"
                >
                  Read More
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeInAnimation>
  )
}

export default page
