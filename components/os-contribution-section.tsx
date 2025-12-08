"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { GitMerge, ArrowUpRight, Github } from 'lucide-react'
import { StaggerSection, StaggerItem } from './stagger-section'
import Button from './ui/button'

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
      className="group block w-full py-4 sm:py-5 px-2 -mx-2"
    >
      <article className="flex flex-col sm:grid sm:grid-cols-[140px_1fr_auto] gap-2 sm:gap-6 sm:items-baseline">

        {/* 1. Repo Name (Mono Badge style) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-2 py-1 rounded truncate max-w-[140px]">
            {repo.name}
          </span>
        </div>

        {/* 2. Title */}
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline dark:group-hover:underline-offset-4 transition-colors truncate">
            {pr.title}
          </h3>
          <div className="flex sm:hidden text-xs text-gray-400 mt-1 gap-2">
            <span>#{pr.number}</span>
            <span>•</span>
            <span>{formatDate(pr.created_at)}</span>
          </div>
        </div>

        {/* 3. Metadata & Icon (Desktop) */}
        <div className="hidden sm:flex items-center gap-6 justify-end text-sm text-gray-400 dark:text-gray-500 font-mono">
          <span>{formatDate(pr.created_at)}</span>
          <div className="group-hover:text-yellow-400 transition-colors">
            <GitMerge size={18} />
          </div>
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
      // Added a small artificial delay so the skeleton doesn't flash too fast on quick connections
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
    <section className="px-4 py-24 max-w-5xl mx-auto">
      <StaggerSection>

        {/* Header */}
        <StaggerItem className="flex items-end justify-between mb-12 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
            Open Source Contributions
          </h2>
        </StaggerItem>

        {/* PR List */}
        <div className="flex flex-col border-t border-gray-100 dark:border-white/10">
          {prs.map((pr) => (
            <StaggerItem key={pr.id} className="border-b border-gray-100 dark:border-white/10">
              <PullRequestItem pr={pr} />
            </StaggerItem>
          ))}

          {/* Loading Skeletons (Show when loading) */}
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
    </section>
  )
}

export default OsContributionSection