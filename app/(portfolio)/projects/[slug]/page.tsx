'use client'
import StaggerAnimation from '@/components/StaggerAnimation'
import Close from '@/components/svg/Close'
import Like from '@/components/svg/Like'
import Next from '@/components/svg/Next'
import type { ProjectInterface } from '@/lib/data'
import { Projects } from '@/lib/data/projects'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type ProjectImages = {
  src: any
  text: string
  liked: boolean
}

const Page = () => {
  const pathname = usePathname().split('/')[2]
  const [data, setData] = useState<ProjectInterface>()
  const [image, setImage] = useState<null | number>(null)
  const [images, setImages] = useState<ProjectImages[] | null>(null)

  useEffect(() => {
    const res = Projects.filter((project) => project.id === pathname)
    setData(res[0])
  }, [])

  useEffect(() => {
    if (data?.img) {
      const arr = data.img.map((item) => ({ ...item, liked: false }))
      setImages(arr)
    }
  }, [data])

  const toggleLike = (index: number) => {
    setImages((prev) => {
      if (!prev) return null
      return prev.map((img, i) =>
        i === index ? { ...img, liked: !img.liked } : img
      )
    })
  }
  const colors = [
    'dark:bg-green-600 bg-green-400',
    'dark:bg-blue-600 bg-blue-400',
    'dark:bg-yellow-600 bg-yellow-400',
    'dark:bg-red-600 bg-red-400',
    'dark:bg-indigo-600 bg-indigo-400',
    'dark:bg-pink-600 bg-pink-400',
    'dark:bg-purple-600 bg-purple-400',
    'dark:bg-gray-600 bg-gray-400',
    'dark:bg-teal-600 bg-teal-400',
    'dark:bg-orange-600 bg-orange-400',
    'dark:bg-cyan-600 bg-cyan-400',
    'dark:bg-lime-600 bg-lime-400',
    'dark:bg-violet-600 bg-violet-400',
    'dark:bg-lightBlue-600 bg-lightBlue-400',
    'dark:bg-emerald-600 bg-emerald-400',
    'dark:bg-rose-600 bg-rose-400',
    'dark:bg-cyan-600 bg-cyan-400',
    'dark:bg-fuchsia-600 bg-fuchsia-400',
    'dark:bg-sky-600 bg-sky-400',
    'dark:bg-amber-600 bg-amber-400',
  ]
  const length = colors.length

  return (
    <StaggerAnimation>
      <AnimatePresence mode="wait">
        {image !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full inset-0 overflow-hidden select-none flex justify-center items-center bg-primary-1 dark:bg-neutral-1 backdrop-blur-sm z-[1000]"
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 hover:bg-primary-1/10 dark:hover:bg-neutral-1/10 rounded-full transition-colors"
              onClick={() => setImage(null)}
            >
              <Close />
            </button>
            {data?.img && (
              <div className="relative flex flex-col items-center justify-center w-full px-4 md:px-12">
                <div className="relative max-h-[85vh] w-full max-w-[85vw] md:max-w-[75vw] h-full mx-auto">
                  <Image
                    alt={data?.img[image].text || 'Project image'}
                    className="m-2 object-contain w-full h-full rounded-lg shadow-2xl"
                    style={{ maxHeight: '80vh' }}
                    src={data?.img[image].src}
                  />
                  <div className="absolute bottom-0 left-2 -right-2 bg-gradient-to-t from-black-1 to-black-1/90 p-4 rounded-b-lg">
                    <p className="text-white-1 text-sm md:text-base">
                      {data?.img[image].text}
                    </p>
                    <p className="text-gray-1 text-xs md:text-sm mt-1">
                      Image {image + 1} of {data?.img.length}
                    </p>
                  </div>
                </div>

                {/* Desktop Navigation Buttons */}
                <button
                  className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 p-3 hover:bg-primary-1/10 dark:hover:bg-neutral-1/10 rounded-full transition-colors z-[200] hidden md:block"
                  onClick={() => setImage(image - 1 >= 0 ? image - 1 : image)}
                  disabled={image - 1 < 0}
                >
                  <Next
                    className={`${
                      image - 1 >= 0 ? 'text-yellow-4' : 'text-gray-1/50'
                    } -rotate-180 w-8 h-8 md:w-10 md:h-10`}
                  />
                </button>

                <button
                  className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 p-3 hover:bg-primary-1/10 dark:hover:bg-neutral-1/10 rounded-full transition-colors hidden md:block"
                  onClick={() =>
                    setImage(
                      image + 1 <= (data?.img?.length ?? 0) - 1
                        ? image + 1
                        : image
                    )
                  }
                  disabled={image + 1 > (data?.img?.length ?? 0) - 1}
                >
                  <Next
                    className={`${
                      image + 1 <= (data?.img?.length ?? 0) - 1
                        ? 'text-neutral-4'
                        : 'text-secondary-1'
                    } w-8 h-8 md:w-10 md:h-10`}
                  />
                </button>

                {/* Mobile Navigation Buttons */}
                <div className="flex justify-center items-center gap-8 mt-6 md:hidden">
                  <button
                    className="p-4 bg-primary-1/10 dark:bg-neutral-1/10 hover:bg-primary-1/20 dark:hover:bg-neutral-1/20 rounded-full transition-colors"
                    onClick={() => setImage(image - 1 >= 0 ? image - 1 : image)}
                    disabled={image - 1 < 0}
                  >
                    <Next
                      className={`${
                        image - 1 >= 0 ? 'text-neutral-4' : 'text-secondary-1/50'
                      } -rotate-180 w-10 h-10`}
                    />
                  </button>
                  <button
                    className="p-4 bg-primary-1/10 dark:bg-neutral-1/10 hover:bg-primary-1/20 dark:hover:bg-neutral-1/20 rounded-full transition-colors"
                    onClick={() =>
                      setImage(
                        image + 1 <= (data?.img?.length ?? 0) - 1
                          ? image + 1
                          : image
                      )
                    }
                    disabled={image + 1 > (data?.img?.length ?? 0) - 1}
                  >
                    <Next
                      className={`${
                        image + 1 <= (data?.img?.length ?? 0) - 1
                          ? 'text-neutral-4'
                          : 'text-secondary-1'
                      } w-10 h-10`}
                    />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hscreen max-lg:px-2">
        <h1 className="rampart-h1">{data?.name}</h1>

        {data?.detail && (
          <div className="py-4">
            <h1 className="amiko-h1 mb-2">Overview</h1>
            <p>{data?.detail}</p>
          </div>
        )}
        <div className="flex justify-end sticky top-[61px] md:top-[69px] z-50 bg-primary-1 dark:bg-neutral-1 md:text-xl px-3 gap-2 py-2  md:py-3">
          {data?.git && (
            <Link
              target="_blank"
              href={data.git}
              className="transition link-text flex gap-1 items-center"
            >
              {/* <Github /> */}
              Github
            </Link>
          )}
          {data?.link && (
            <Link
              target="_blank"
              href={data.link}
              className="transition link-text flex gap-1 items-center"
            >
              {/* <LinkLogo /> */}
              Live
            </Link>
          )}
        </div>

        <div className="py-4">
          <h1 className="amiko-h1 mb-2">Description</h1>
          <ul className="list">
            {data?.description.map((desc, index) => (
              <li key={index + 10}>{desc}</li>
            ))}
          </ul>
        </div>

        {data?.img && (
          <div>
            <h1 className="amiko-h1">Gallery</h1>
            <div className="grid grid-cols-2 transition md:grid-cols-3 mx-auto gap-0.5 p-4 px-1">
              {images?.map((img, index) => {
                return (
                  <div
                    key={index + 10}
                    className={`relative h-full cursor-pointer transition ${
                      colors[index % length]
                    } ${img.liked ? 'row-span-2 col-span-2' : ''}`}
                  >
                    <Image
                      onClick={() => setImage(index)}
                      src={img.src}
                      alt="test"
                      className={`w-full min-h-full brightness-[40%] grayscale hover:grayscale-0 hover:brightness-100 transition `}
                    />
                    <button
                      className="absolute bottom-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(index)
                      }}
                    >
                      <Like
                        className={`${
                          img.liked ? 'text-red-500' : 'text-gray-500'
                        }`}
                      />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </StaggerAnimation>
  )
}

export default Page
