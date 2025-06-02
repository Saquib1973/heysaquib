"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FadeInAnimation from './FadeInAnimation'
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

interface PullRequestItemProps {
  pr: PullRequest;
}

const PullRequestItem: React.FC<PullRequestItemProps> = ({ pr }) => {
  const repo = getRepoInfo(pr);
  return (
    <div
      className="py-1 border-b border-dotted dark:border-gray-600 border-gray-300 last:border-b-0 transition-colors duration-150"
    >
      <Link
        href={pr.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View PR: ${pr.title}`}
        className="block font-sans dark:text-gray-200 text-gray-900 max-md:underline max-md:underline-offset-2 hover:underline transition-all truncate"
        title={pr.title}
      >
        {pr.title}
      </Link>
      <div className="mt-1 flex flex-wrap items-center text-sm dark:text-gray-400 text-gray-600 gap-3 font-light">
        <Link
          href={`https://github.com/${repo.owner}/${repo.name}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View repository: ${repo.owner}/${repo.name}`}
          className="hover:underline dark:text-gray-400 text-gray-700"
        >
          {repo.owner}/{repo.name}
        </Link>
        <span>•</span>
        <span>#{pr.number}</span>
        <span>•</span>
        <span>{formatDate(pr.created_at)}</span>
      </div>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const getRepoInfo = (pr: PullRequest) => {
  const repoUrl = pr.repository_url
  const parts = repoUrl.split('/')
  return {
    owner: parts[parts.length - 2],
    name: parts[parts.length - 1],
  }
}

const GitHubMergedPRs = () => {
  const [prs, setPrs] = useState<PullRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const GITHUB_USERNAME = 'saquib1973'
  const PRS_PER_PAGE = 12

  useEffect(() => {
    fetchMergedPRs()
  }, [page])

  const fetchMergedPRs = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://api.github.com/search/issues?q=is:pr+author:${GITHUB_USERNAME}+is:merged&sort=created&order=desc&per_page=${PRS_PER_PAGE}&page=${page}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch PRs')
      }

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

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p>Error loading pull requests: {error}</p>
        <button
          onClick={() => {
            setError(null)
            fetchMergedPRs()
          }}
          className="mt-4 px-3 text-sm py-2 bg-gray-700 text-white"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <FadeInAnimation>
      <div className="md:px-4 p-6">
        <h2 className="text-3xl font-bold mb-4 text-yellow-600">Open Source Contributions</h2>
        <div>
        {prs.map((pr) => (
          <PullRequestItem key={pr.id} pr={pr} />
        ))}
      </div>
      </div>
    </FadeInAnimation>
  )
}

export default GitHubMergedPRs
