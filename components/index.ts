export { default as MomentsHomeSection } from './moments-home-section'

export type ProjectCardType = {
  name: string
  detail: string
  index: number
  tags?: string[]
  id: string
  status?: 'live' | 'building' | 'archived'
  image?: { src: any; text: string }[]
  git: string
  liveLink: string
  date: string
}