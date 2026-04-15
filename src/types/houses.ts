export interface House {
  id: string
  name: string
  description: string
  emblem?: string
  color: string
  lightTone: string
  members: Member[]
}

export interface Member {
  id: string
  name: string
  houseId: string
  descriptor: string
  status: 'revealed' | 'unrevealed'
  profile?: MemberProfile
}

export interface MemberProfile {
  overview: string
  work: Work[]
  socialLinks: SocialLink[]
  contact: Contact
}

export interface Work {
  id: string
  title: string
  type: string
  media: string
  category?: string
  year?: number
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Contact {
  email?: string
  website?: string
  inquiries?: string
}

export const HOUSES: House[] = [
  {
    id: 'solis',
    name: 'HOUSE SOLIS',
    description: 'Core / Vision',
    color: '#d4a574',
    lightTone: '#f4e4c1',
    members: []
  },
  {
    id: 'helios',
    name: 'HOUSE HELIOS',
    description: 'Photography',
    color: '#e6c088',
    lightTone: '#f5e6d0',
    members: []
  },
  {
    id: 'apollo',
    name: 'HOUSE APOLLO',
    description: 'Music',
    color: '#c9a96e',
    lightTone: '#e8d4a8',
    members: []
  },
  {
    id: 'vulcan',
    name: 'HOUSE VULCAN',
    description: 'Fashion / Design',
    color: '#b8935f',
    lightTone: '#d9c4a0',
    members: []
  },
  {
    id: 'noctis',
    name: 'HOUSE NOCTIS',
    description: 'Experimental',
    color: '#a8844f',
    lightTone: '#cab088',
    members: []
  }
]
