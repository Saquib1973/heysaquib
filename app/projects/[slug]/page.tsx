'use client'
import StaggerAnimation from '@/components/StaggerAnimation'
import Close from '@/components/svg/Close'
import Next from '@/components/svg/Next'
import Like from '@/components/svg/Like'
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
    'bg-green-600 dark:bg-green-400',
    'bg-blue-600 dark:bg-blue-400',
    'bg-yellow-600 dark:bg-yellow-400',
    'bg-red-600 dark:bg-red-400',
    'bg-indigo-600 dark:bg-indigo-400',
    'bg-pink-600 dark:bg-pink-400',
    'bg-purple-600 dark:bg-purple-400',
    'bg-gray-600 dark:bg-gray-400',
    'bg-teal-600 dark:bg-teal-400',
    'bg-orange-600 dark:bg-orange-400',
    'bg-cyan-600 dark:bg-cyan-400',
    'bg-lime-600 dark:bg-lime-400',
    'bg-violet-600 dark:bg-violet-400',
    'bg-lightBlue-600 dark:bg-lightBlue-400',
    'bg-emerald-600 dark:bg-emerald-400',
    'bg-rose-600 dark:bg-rose-400',
    'bg-cyan-600 dark:bg-cyan-400',
    'bg-fuchsia-600 dark:bg-fuchsia-400',
    'bg-sky-600 dark:bg-sky-400',
    'bg-amber-600 dark:bg-amber-400',
  ]
  const length = colors.length

  return (
    <StaggerAnimation>
      <AnimatePresence>
        {image !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full h-full inset-0 overflow-hidden select-none flex justify-center items-center shadow-md bg-white-1 p-4 py-8 dark:bg-black-1 border z-[100]"
          >
            <button
              className="absolute top-2 right-2 z-10"
              onClick={() => setImage(null)}
            >
              <Close />
            </button>
            {data?.img && (
              <div className="relative flex items-center justify-around">
                <div
                  className="max-md:absolute max-md:-left-2 cursor-pointer z-[200]"
                  onClick={() => setImage(image - 1 >= 0 ? image - 1 : image)}
                >
                  <Next
                    className={`${
                      image - 1 >= 0 ? '' : 'opacity-0'
                    } -rotate-180`}
                  />
                </div>
                <div className="relative max-h-[80vh] w-full md:max-w-[80vw] h-full">
                  <Image
                    alt="test"
                    className={`m-2 object-contain `}
                    style={{ maxHeight: '80vh', maxWidth: '80vw' }}
                    src={data?.img[image].src}
                  />
                </div>
                <div
                  className="max-md:absolute max-md:-right-2 cursor-pointer"
                  onClick={() =>
                    setImage(
                      image + 1 < (data?.img?.length || 0) ? image + 1 : image
                    )
                  }
                >
                  <Next
                    className={`${
                      data?.img?.length > image + 1 ? '' : 'opacity-0'
                    }`}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hscreen max-lg:px-2">
        <h1 className="rampart-h1">{data?.name}</h1>

        <div className="py-4">
          <h1 className="amiko-h1 mb-2">Overview</h1>
          <p>{data?.detail}</p>
        </div>

        <div className="py-4">
          <h1 className="amiko-h1 mb-2">Description</h1>
          <ul className="list">
            {data?.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="amiko-h1">Gallery</h1>
          <div className="grid grid-cols-2 transition md:grid-cols-3 mx-auto gap-0.5 p-4 px-1">
            {images?.map((img, index) => {
              return (
                <div
                  key={index}
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

        <div className="flex gap-2 sticky bottom-0 p-2 left-0">
          {data?.git && (
            <Link
              target="_blank"
              href={data.git}
              className="border w-1/2 p-2 py-4 bg-white-1 shadow-inner shadow-gray-1 dark:bg-black-1 text-center"
            >
              Github
            </Link>
          )}
          {data?.link && (
            <Link
              target="_blank"
              href={data.link}
              className="border w-1/2 p-2 py-4 bg-white-1 shadow-inner shadow-gray-1 dark:bg-black-1 text-center"
            >
              Live
            </Link>
          )}
        </div>
      </div>
    </StaggerAnimation>
  )
}

export default Page
