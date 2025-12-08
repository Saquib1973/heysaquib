import FadeInAnimation from '@/components/FadeInAnimation'
import Like from '@/components/svg/Like'
import { getAllPosts } from '@/lib/getPost'
import Link from 'next/link'

export default function HomePage() {
  const blogs = getAllPosts()

  return (
    <FadeInAnimation className="">
      <h2 className=" blogs text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
        Latest Blogs
      </h2>
      {/* <h1 className="rampart-h1 ml-2 my-2 blogHeading">Blogs</h1> */}

      <div className="grid md:grid-cols-2 p-2 md:px-0">
        {blogs.map((blog, index) => (
          <Link
            key={index}
            href={`/blogs/${blog.slug}`}
            className={`hover:border-b-yellow-4 group dark:hover:border-b-yellow-4 border border-t-transparent border-r border-l-transparent dark:border-t-transparent dark:border-r dark:border-l-transparent ${index % 2 === 0
                ? ''
                : 'border-r-transparent dark:border-r-transparent'
              } p-6 md:p-4 hover:bg-white-2 transition justify-between group dark:hover:bg-black-2 border-b dark:border-black-0 border-gray-0 flex flex-col gap-2`}
          >
            <div>
              <div className="w-full txt flex items-end gap-1">
                <span className="text-5xl md:text-7xl font-rampart mr-2">
                  {index + 1}
                </span>
                <p className="text-2xl md:text-2xl line-clamp-1 ">
                  {blog.title}
                </p>
              </div>
              <div className="h-0.5 group-hover:w-1/3 transition w-[20%] bg-gray-0 dark:bg-black-0 my-4 group-hover:bg-yellow-4" />
              <p className="txt-light text-sm tracking-widest">
                {blog.description}
              </p>
            </div>
            <div className="flex justify-between gap-2 items-center py-4">
              <Like />

              <time
                dateTime={blog.date}
                className="whitespace-nowrap text-sm md:text-base amiko-p p-1 pb-0.5"
              >
                {new Date(blog.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </FadeInAnimation>
  )
}
