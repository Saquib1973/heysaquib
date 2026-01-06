'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { StaggerSection, StaggerItem } from './stagger-section'
import Button from './ui/button'
import SectionHeader from './section-header'

// --- Types ---
interface Label {
  id: number
  name: string
  color: string
}

interface PullRequest {
  id: number
  number: number
  title: string
  html_url: string
  created_at: string
  repository_url: string
  labels: Label[]
}

// --- Helper Functions ---
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: '2-digit'
  })
}

const getRepoInfo = (pr: PullRequest) => {
  const parts = pr.repository_url.split('/')
  return {
    owner: parts[parts.length - 2],
    name: parts[parts.length - 1],
  }
}

// --- Components ---

const PRSkeleton = () => (
  <div className="py-5 border-b border-gray-100 dark:border-white/5 animate-pulse flex flex-col gap-2">
    <div className="h-4 w-24 bg-gray-200 dark:bg-white/10 rounded" />
    <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/10 rounded" />
  </div>
)

const PullRequestItem = ({ pr }: { pr: PullRequest }) => {
  const repo = getRepoInfo(pr);

  return (
    <Link
      href={pr.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group/item
        block w-full py-4 sm:py-5 px-2 -mx-2
        border-b border-gray-100 dark:border-white/5
        transition-all duration-500 ease-out
        opacity-100
        md:group-hover:opacity-30
        md:hover:!opacity-100 md:hover:pl-6
      "
    >
      <article className="flex flex-col sm:grid sm:grid-cols-[140px_1fr_auto] gap-2 sm:gap-6 sm:items-baseline">

        {/* 1. Repo Name Badge */}
        <div className="flex items-center gap-2">
          <span className="
            text-xs font-mono text-gray-500 dark:text-gray-400 
            bg-gray-100 dark:bg-white/10 
            px-2 py-1 rounded truncate max-w-[140px]
            transition-colors group-hover/item:text-gray-700 dark:group-hover/item:text-gray-300
          ">
            {repo.name}
          </span>
        </div>

        {/* 2. Title & Mobile Meta */}
        <div className="min-w-0">
          <h3 className="
            text-base sm:text-lg font-medium 
            text-gray-900 dark:text-gray-100 
            transition-colors
          ">
            {pr.title}
          </h3>
          <div className="flex sm:hidden text-xs text-gray-400 mt-1 gap-2">
            <span>#{pr.number}</span>
            <span>•</span>
            <span>{formatDate(pr.created_at)}</span>
          </div>
        </div>

        {/* 3. Desktop Date & Animated Arrow */}
        <div className="hidden sm:flex items-center gap-6 justify-end text-sm text-gray-400 dark:text-gray-500 font-mono">
          <span className="transition-colors group-hover/item:text-gray-600 dark:group-hover/item:text-gray-300">
            {formatDate(pr.created_at)}
          </span>
          
          <ArrowUpRight 
            size={18}
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
};

const OsContributionSection = () => {
  const [prs, setPrs] = useState<PullRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const GITHUB_USERNAME = 'saquib1973'
  const PRS_PER_PAGE = 8

  useEffect(() => {
    fetchMergedPRs()
  }, [page])

  const fetchMergedPRs = async () => {
    try {
      setLoading(true)
      // Small delay for skeleton smoothness
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await fetch(
        `https://api.github.com/search/issues?q=is:pr+author:${GITHUB_USERNAME}+is:merged&sort=created&order=desc&per_page=${PRS_PER_PAGE}&page=${page}`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      )

      if (!response.ok) throw new Error('Failed to fetch PRs')

      const data = await response.json()

      if (page === 1) {
        setPrs(data.items as PullRequest[])
      } else {
        setPrs((prev) => [...prev, ...(data.items as PullRequest[])])
      }

      setHasMore(data.items.length === PRS_PER_PAGE)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="text-red-500 mb-4">Unable to load contributions</p>
        <Button variant="secondary" onClick={() => { setError(null); fetchMergedPRs(); }}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <StaggerSection className="py-20">

      {/* Header */}
      <SectionHeader text='OpenSource Contributions' />

      {/* PR List - Added 'group' class here to enable sibling dimming */}
      <div className="flex flex-col group border-t border-gray-100 dark:border-white/10">
        {prs.map((pr) => (
          <StaggerItem key={pr.id} className="w-full">
            <PullRequestItem pr={pr} />
          </StaggerItem>
        ))}

        {/* Loading Skeletons */}
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <StaggerItem key={`skeleton-${i}`}>
            <PRSkeleton />
          </StaggerItem>
        ))}
      </div>

      {/* Load More Button */}
      {!loading && hasMore && (
        <StaggerItem className="mt-12 flex justify-center">
          <Button
            variant="secondary"
            onClick={() => setPage(prev => prev + 1)}
            className="min-w-[150px]"
          >
            Load More
          </Button>
        </StaggerItem>
      )}

    </StaggerSection>
  )
}

export default OsContributionSection