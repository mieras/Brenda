'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface UserProfile {
  name: string
  email: string
  role: string
  avatar?: string
  favoritePages: string[]
}

interface UserContextType {
  user: UserProfile
  setRole: (role: string) => void
  addFavoritePage: (page: string) => void
  removeFavoritePage: (page: string) => void
}

const defaultUser: UserProfile = {
  name: 'Guest User',
  email: 'user@postcodeloterij.nl',
  role: 'designer',
  favoritePages: ['/guidelines/colour-palette', '/guidelines/typography']
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser)

  const setRole = (role: string) => {
    setUser(prev => ({ ...prev, role }))
  }

  const addFavoritePage = (page: string) => {
    setUser(prev => ({
      ...prev,
      favoritePages: prev.favoritePages.includes(page) 
        ? prev.favoritePages 
        : [...prev.favoritePages, page]
    }))
  }

  const removeFavoritePage = (page: string) => {
    setUser(prev => ({
      ...prev,
      favoritePages: prev.favoritePages.filter(p => p !== page)
    }))
  }

  return (
    <UserContext.Provider value={{ user, setRole, addFavoritePage, removeFavoritePage }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const roleLabels: Record<string, string> = {
  designer: 'Designer',
  developer: 'Developer',
  content: 'Content Designer',
  brand: 'Brand Guardian',
  agency: 'Agency Partner'
}

// Section visibility per role
export type SectionId = 'brand-story' | 'brand-portal' | 'brand-design' | 'content-guidelines'

export interface SectionVisibility {
  id: SectionId
  label: string
  defaultOpen: boolean
}

export const roleSectionVisibility: Record<string, Record<SectionId, boolean>> = {
  designer: {
    'brand-story': true,
    'brand-portal': true,
    'brand-design': true,
    'content-guidelines': false,
  },
  developer: {
    'brand-story': false,
    'brand-portal': false,
    'brand-design': true,
    'content-guidelines': false,
  },
  content: {
    'brand-story': true,
    'brand-portal': true,
    'brand-design': false,
    'content-guidelines': true,
  },
  brand: {
    'brand-story': true,
    'brand-portal': true,
    'brand-design': true,
    'content-guidelines': true,
  },
  agency: {
    'brand-story': true,
    'brand-portal': true,
    'brand-design': true,
    'content-guidelines': false,
  },
}

export function getSectionVisibility(role: string): Record<SectionId, boolean> {
  return roleSectionVisibility[role] || roleSectionVisibility.designer
}

export function isSectionVisible(role: string, sectionId: SectionId): boolean {
  const visibility = getSectionVisibility(role)
  return visibility[sectionId] ?? false
}


