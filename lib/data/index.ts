export type ProjectInterface = {
  /*
Project content format :
    {
        id: '', name: '', description: [
            "","",""
        ]
        , detail: '', tags: ['', '', ''], link: '', git: '', img: , date: '',
        type: ['frontend' , 'backend' , 'design' , 'fullstack' , 'core' ,devops],
           "featured": bool
    },
*/
  id: string
  name: string
  description: string[]
  type: ProjectType[]
  detail: string
  tags?: string[]
  link: string
  status?: 'live' | 'building' |'archived'
  git: string
  img?: { src: any; text: string }[]
  date: string
  featured: boolean
  minor?: boolean
}
export type ProjectType =
  | 'frontend'
  | 'backend'
  | 'design'
  | 'fullstack'
  | 'web3'
  | 'core'
  | 'others'

export interface Experience {
  company: string
  role: string
  duration: string
  location: string
  description: string[]
  technologies: string[]
    website?: string
  }