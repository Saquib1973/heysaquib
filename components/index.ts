export { default as MomentsHomeSection } from './sections/moments-home-section'
export { default as LocationMap } from './sections/my-location-section'

export type ProjectCardType = {
  name: string
  detail: string
  index: number
  tags?: string[]
  type: string[]
  id: string
  status?: 'live' | 'building' | 'archived'
  image?: { src: any; text: string }[]
  git: string
  liveLink: string
  date: string
}