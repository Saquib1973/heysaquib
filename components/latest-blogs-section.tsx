import { getAllPosts } from '@/lib/getPost'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import BlogTimeComponent from './BlogTimeComponent'
import { StaggerItem, StaggerSection } from './stagger-section'
import Button from './ui/button'

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
            className="
                group/item
                block w-full py-5 px-2 -mx-2
                transition-all duration-500 ease-out
                opacity-100
                md:group-hover:opacity-30
                md:hover:!opacity-100 md:hover:pl-6
            "
        >
            <article className="flex flex-col sm:grid sm:grid-cols-[100px_1fr_auto] sm:items-center gap-2 sm:gap-6">

                {/* 1. Date (Mono column) */}
                <div className="
                    text-xs font-mono 
                    text-gray-400 dark:text-gray-500 
                    uppercase tracking-wider 
                    transition-colors group-hover/item:text-gray-700 dark:group-hover/item:text-gray-300
                ">
                    <BlogTimeComponent date={blog.date} />
                </div>

                {/* 2. Title & Read Time (Mobile) */}
                <div className="flex flex-col justify-center min-w-0">
                    <h3 className="
                        text-lg font-semibold 
                        text-gray-900 dark:text-gray-100 
                        transition-colors
                    ">
                        {blog.title}
                    </h3>
                    <span className="text-xs text-gray-400 dark:text-gray-600 mt-1 sm:hidden">
                        {blog.readTime} min read
                    </span>
                </div>

                {/* 3. Desktop Read Time & Animated Arrow */}
                <div className="hidden sm:flex items-center gap-6 justify-end text-sm text-gray-400 dark:text-gray-600">
                    <span className="
                        text-xs font-mono 
                        transition-colors group-hover/item:text-gray-600 dark:group-hover/item:text-gray-300
                    ">
                        {blog.readTime} min read
                    </span>
                    
                    <ArrowUpRight 
                        size={20}
                        className="
                            text-gray-900 dark:text-white
                            transition-all duration-300 ease-out
                            opacity-100 translate-x-0
                            md:opacity-0 md:-translate-x-4
                            md:group-hover/item:translate-x-0 md:group-hover/item:opacity-100
                        "
                    />
                </div>

            </article>
        </Link>
    )
}

export default function LatestBlogsSection() {
    if (!blogs || blogs.length === 0) return null;

    return (
        <StaggerSection className='py-20'>

            {/* Header */}
            <StaggerItem className="flex items-center justify-between mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
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

            {/* The Index List - 'group' class triggers sibling dimming */}
            <div className="flex flex-col group border-t border-gray-100 dark:border-white/10">
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
    )
}