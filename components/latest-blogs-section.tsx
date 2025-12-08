import Link from 'next/link'
import { getAllPosts } from '@/lib/getPost'
import BlogTimeComponent from './BlogTimeComponent'
import Button from './ui/button'
import { ArrowUpRight } from 'lucide-react'
import { StaggerSection, StaggerItem } from './stagger-section'

interface BlogPost {
    slug: string
    title: string
    date: string
    readTime: number
}

// Server-side data fetching
const blogs = (getAllPosts() as unknown as BlogPost[]).slice(0, 4)

const BlogListItem = ({ blog }: { blog: BlogPost }) => {
    return (
        <Link
            href={`/blogs/${blog.slug}`}
            className="group block w-full py-5 pl-4 -mx-4 animate-mode"
        >
            <article className="flex flex-col sm:grid sm:grid-cols-[100px_1fr_auto] sm:items-center gap-2 sm:gap-6">

                {/* 1. Date (Mono column) */}
                <div className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider group-hover:text-black dark:group-hover:text-white transition-colors">
                    <BlogTimeComponent date={blog.date} />
                </div>

                {/* 2. Title & Read Time */}
                <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:underline group-hover:underline-offset-4">
                        {blog.title}
                    </h3>
                    <span className="text-xs text-gray-400 dark:text-gray-600 mt-1 sm:hidden">
                        {blog.readTime} min read
                    </span>
                </div>

                {/* 3. Desktop Read Time & Arrow */}
                <div className="hidden sm:flex items-center gap-6 text-gray-400 dark:text-gray-600">
                    <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {blog.readTime} min read
                    </span>
                    <div className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-black dark:text-white">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>

            </article>
        </Link>
    )
}

export default function LatestBlogsSection() {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="px-4 py-32">
            <StaggerSection>

                {/* Header - Aligned to grid start */}
                <StaggerItem className="flex items-center justify-between mb-12">
                    <h2 className=" blogs text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Latest Blogs
                    </h2>
                    <Button
                        href="/blogs"
                        variant="secondary"
                        size="sm"
                        className="hidden sm:flex"
                    >
                        View Archive
                        <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Button>
                </StaggerItem>

                {/* The Index List */}
                <div className="flex flex-col border-t border-gray-100 dark:border-white/10">
                    {blogs.map((blog, index) => (
                        <StaggerItem key={blog.slug || index} className="border-b border-gray-100 dark:border-white/10">
                            <BlogListItem blog={blog} />
                        </StaggerItem>
                    ))}
                </div>

                {/* Mobile Button */}
                <StaggerItem className="mt-8 sm:hidden">
                    <Button href="/blogs" variant="secondary" className="w-full justify-center">
                        View Archive
                    </Button>
                </StaggerItem>

            </StaggerSection>
        </section>
    )
}