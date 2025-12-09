'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Home,
  Circle,
  Palette,
  Type,
  Shapes,
  Grid3X3,
  CheckCircle,
  Ticket,
  Star,
  Camera,
  Shirt,
  Car,
  Gift,
  BarChart3,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  X,
  BookOpen,
  Code,
  Layers,
  GraduationCap,
  FileText,
  Layout,
  Move,
  Accessibility,
  Brain,
  Square,
  Box,
  Image as ImageIcon,
  MessageSquare,
} from 'lucide-react'
import { SheetClose } from '@/components/ui/sheet'
import { useUser, getSectionVisibility, type SectionId } from '@/lib/user-context'

const mainItems = [
  { label: 'Homepage', href: '/', icon: Home },
  { label: 'My Activity', href: '/activity', icon: Clock },
]

// Brand Story items
const brandStoryItems = [
  { label: 'The Power of Brenda', href: '/brand-story/power-of-brenda', icon: Zap },
  { label: 'Brand Purpose', href: '/brand-story/purpose', icon: Sparkles },
  { label: 'Design Principles', href: '/brand-story/principles', icon: BookOpen },
  { label: 'Core Values', href: '/brand-story/values', icon: Star },
]

// Brand Portal items (current guidelines)
const brandPortalItems = [
  { label: 'Our Logos', href: '/guidelines/our-logos', icon: Circle },
  { label: 'Colour Palette', href: '/guidelines/colour-palette', icon: Palette },
  { label: 'Typography', href: '/guidelines/typography', icon: Type },
  { label: 'Graphic Elements', href: '/guidelines/supporting-graphic-elements', icon: Shapes },
  { label: 'Icons', href: '/guidelines/icons', icon: Grid3X3 },
  { label: 'Photography', href: '/guidelines/photography', icon: Camera },
  { label: 'Tone of Voice', href: '/guidelines/tone-of-voice', icon: MessageSquare },
  { label: 'Plus and Premium', href: '/guidelines/plus-and-premium', icon: Star },
  { label: 'Cheques', href: '/guidelines/cheques', icon: CheckCircle },
  { label: 'Tickets', href: '/guidelines/tickets', icon: Ticket },
  { label: 'Clothing', href: '/guidelines/clothing', icon: Shirt },
  { label: 'Vehicles', href: '/guidelines/vehicles', icon: Car },
  { label: 'Prize Plan', href: '/guidelines/prize-plan', icon: Gift },
  { label: 'Creative Ladder', href: '/guidelines/creative-ladder', icon: BarChart3 },
  { label: 'Brenda Group', href: '/guidelines/brenda-group', icon: Users },
]

// Brand & Design - Foundations
const brandDesignFoundations = [
  { label: 'Spacing', href: '/brand-design/foundations/spacing', icon: Layout },
  { label: 'Layout', href: '/brand-design/foundations/layout', icon: Layers },
  { label: 'Typography', href: '/brand-design/foundations/typography', icon: Type },
  { label: 'Colors', href: '/brand-design/foundations/colors', icon: Palette },
  { label: 'Icons', href: '/brand-design/foundations/icons', icon: Grid3X3 },
  { label: 'Motion', href: '/brand-design/foundations/motion', icon: Move },
  { label: 'Strokes', href: '/brand-design/foundations/strokes', icon: Square },
  { label: 'Radius', href: '/brand-design/foundations/radius', icon: Circle },
  { label: 'Shadows', href: '/brand-design/foundations/shadows', icon: Box },
  { label: 'Accessibility', href: '/brand-design/foundations/accessibility', icon: Accessibility },
  { label: 'AI Guidelines', href: '/brand-design/foundations/ai', icon: Brain },
]

// Brand & Design - Components
const brandDesignComponents = [
  { label: 'Buttons', href: '/brand-design/components/buttons', icon: Square },
  { label: 'Links', href: '/brand-design/components/links', icon: Zap },
  { label: 'Input', href: '/brand-design/components/input', icon: Type },
  { label: 'Modal', href: '/brand-design/components/modal', icon: Box },
  { label: 'Notification', href: '/brand-design/components/notification', icon: Circle },
  { label: 'Tabs', href: '/brand-design/components/tabs', icon: Layers },
]

// Brand & Design - Building Blocks
const brandDesignBlocks = [
  { label: 'Card Group', href: '/brand-design/blocks/card-group', icon: Box },
  { label: 'Pill Group', href: '/brand-design/blocks/pill-group', icon: Circle },
  { label: 'Text and Media', href: '/brand-design/blocks/text-media', icon: ImageIcon },
  { label: 'FAQ', href: '/brand-design/blocks/faq', icon: MessageSquare },
  { label: 'Image Grid', href: '/brand-design/blocks/image-grid', icon: Grid3X3 },
  { label: 'Spotlight', href: '/brand-design/blocks/spotlight', icon: Star },
  { label: 'Story Group', href: '/brand-design/blocks/story-group', icon: BookOpen },
]

// Brand & Design - Learning
const brandDesignLearning = [
  { label: 'Courses', href: '/brand-design/learning/courses', icon: GraduationCap },
  { label: 'Video Tutorials', href: '/brand-design/learning/tutorials', icon: Box },
  { label: 'Training Sessions', href: '/brand-design/learning/training', icon: Users },
]

// Digital Content Guidelines
const contentGuidelinesItems = [
  { label: 'Fundamentals', href: '/content-guidelines/fundamentals', icon: BookOpen },
  { label: 'Content Guides', href: '/content-guidelines/guides', icon: FileText },
  { label: 'Visual Style', href: '/content-guidelines/visual-style', icon: ImageIcon },
  { label: 'Website Manual', href: '/content-guidelines/website', icon: Layout },
  { label: 'App Manual', href: '/content-guidelines/app', icon: Box },
]

interface NavItem {
  label: string
  href: string
  icon: typeof Home
}

interface NavSection {
  id: SectionId
  label: string
  icon: typeof BookOpen
  items: NavItem[]
  subsections?: { label: string; items: NavItem[] }[]
}

const sections: NavSection[] = [
  {
    id: 'brand-story',
    label: 'Brand Story',
    icon: BookOpen,
    items: brandStoryItems,
  },
  {
    id: 'brand-portal',
    label: 'Brand Portal',
    icon: Sparkles,
    items: brandPortalItems,
  },
  {
    id: 'brand-design',
    label: 'Brand & Design',
    icon: Code,
    items: [],
    subsections: [
      { label: 'Foundations', items: brandDesignFoundations },
      { label: 'Components', items: brandDesignComponents },
      { label: 'Building Blocks', items: brandDesignBlocks },
      { label: 'Learning', items: brandDesignLearning },
    ],
  },
  {
    id: 'content-guidelines',
    label: 'Digital Content Guidelines',
    icon: FileText,
    items: contentGuidelinesItems,
  },
]

export interface SidebarProps {
  onNavigate?: () => void
  isMobile?: boolean
}

export default function Sidebar({ onNavigate, isMobile }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useUser()
  const [collapsed, setCollapsed] = useState(false)
  
  // On mobile, always show expanded sidebar (no collapse)
  const isCollapsed = isMobile ? false : collapsed

  // Get section visibility for current role
  const sectionVisibility = useMemo(() => getSectionVisibility(user.role), [user.role])
  
  // Determine which section should be open based on current pathname (single open)
  const initialOpenSection = useMemo(() => {
    for (const section of sections) {
      if (!sectionVisibility[section.id]) continue
      
      // Check if any item in this section matches current path
      const hasActiveItem = section.items.some(item => {
        const normalizedPathname = pathname.replace(/\/$/, '') || '/'
        const normalizedHref = item.href.replace(/\/$/, '') || '/'
        return normalizedPathname === normalizedHref
      }) || section.subsections?.some(subsection => 
        subsection.items.some(item => {
          const normalizedPathname = pathname.replace(/\/$/, '') || '/'
          const normalizedHref = item.href.replace(/\/$/, '') || '/'
          return normalizedPathname === normalizedHref
        })
      )
      
      if (hasActiveItem) {
        return section.id
      }
    }
    // If no active item found, return undefined (nothing open by default)
    return undefined
  }, [pathname, sectionVisibility])

  const [openSection, setOpenSection] = useState<string | undefined>(initialOpenSection)
  
  // State for nested accordions (subsections) - one per parent section
  const [openSubsections, setOpenSubsections] = useState<Record<string, string | undefined>>({})

  // Update open section when pathname changes
  useEffect(() => {
    setOpenSection(initialOpenSection)
    
    // Also update nested accordion states based on current path
    const newOpenSubsections: Record<string, string | undefined> = {}
    sections.forEach((section) => {
      if (section.subsections) {
        const activeSubsection = section.subsections.find(subsection => 
          subsection.items.some(item => {
            const normalizedPathname = pathname.replace(/\/$/, '') || '/'
            const normalizedHref = item.href.replace(/\/$/, '') || '/'
            return normalizedPathname === normalizedHref
          })
        )
        if (activeSubsection) {
          newOpenSubsections[section.id] = activeSubsection.label
        }
      }
    })
    setOpenSubsections(newOpenSubsections)
  }, [initialOpenSection, pathname])

  const renderNavItem = (item: NavItem, isActive: boolean) => {
    const Icon = item.icon
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-[#0050A5]/10 text-[#0050A5]"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          isCollapsed && "justify-center px-2"
        )}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-[#0050A5]")} />
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    )
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r-gray-500/10  bg-card transition-all duration-300 sticky top-0",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-[#E30027]">
        <div className="flex items-center gap-2 flex-1">
          <div className="h-8 w-8 rounded-lg bg-[#BB0020] flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-lg text-white">Brenda</span>
          )}
        </div>
        {isMobile ? (
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetClose>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/10 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="px-2 space-y-1">
          {/* Main items */}
          {mainItems.map((item) => {
            const normalizedPathname = pathname.replace(/\/$/, '') || '/'
            const normalizedHref = item.href.replace(/\/$/, '') || '/'
            const isActive = normalizedPathname === normalizedHref
            return renderNavItem(item, isActive)
          })}

          {!isCollapsed && <Separator className="my-2" />}

          {/* Collapsible sections */}
          {!isCollapsed ? (
            <Accordion
              type="single"
              value={openSection}
              onValueChange={(value) => setOpenSection(value)}
              collapsible
              className="w-full"
            >
              {sections.map((section) => {
                // Only show section if visible for current role
                if (!sectionVisibility[section.id]) return null

                const SectionIcon = section.icon

                return (
                  <AccordionItem key={section.id} value={section.id} className="border-none">
                    <AccordionTrigger className="px-3 py-2 text-sm font-medium hover:no-underline">
                      <div className="flex items-center gap-2">
                        <SectionIcon className="h-4 w-4" />
                        <span>{section.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1">
                      <div className="space-y-1 pl-7">
                        {/* Direct items */}
                        {section.items.map((item) => {
                          const normalizedPathname = pathname.replace(/\/$/, '') || '/'
                          const normalizedHref = item.href.replace(/\/$/, '') || '/'
                          const isActive = normalizedPathname === normalizedHref
                          return renderNavItem(item, isActive)
                        })}
                        
                        {/* Subsections (for Brand & Design) - Nested Accordions */}
                        {section.subsections && section.subsections.length > 0 && (
                          <Accordion 
                            type="single"
                            collapsible
                            className="w-full mt-2"
                            value={openSubsections[section.id]}
                            onValueChange={(value) => setOpenSubsections(prev => ({ ...prev, [section.id]: value }))}
                          >
                            {section.subsections.map((subsection) => {
                              return (
                                <AccordionItem 
                                  key={subsection.label} 
                                  value={subsection.label}
                                  className="border-none"
                                >
                                  <AccordionTrigger className="px-3 py-1.5 text-xs font-medium hover:no-underline">
                                    {subsection.label}
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-1">
                                    <div className="space-y-1 pl-4">
                                      {subsection.items.map((item) => {
                                        const normalizedPathname = pathname.replace(/\/$/, '') || '/'
                                        const normalizedHref = item.href.replace(/\/$/, '') || '/'
                                        const isActive = normalizedPathname === normalizedHref
                                        return renderNavItem(item, isActive)
                                      })}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              )
                            })}
                          </Accordion>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          ) : (
            // Collapsed view - just show icons
            sections
              .filter(section => sectionVisibility[section.id])
              .map((section) => {
                const SectionIcon = section.icon
                return (
                  <div key={section.id} className="flex justify-center py-2" title={section.label}>
                    <SectionIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                )
              })
          )}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <Separator />
      <div className={cn(
        "p-4 flex items-center",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <ThemeToggle />
        {!isCollapsed && (
          <span className="text-xs text-muted-foreground">v1.0</span>
        )}
      </div>
    </aside>
  )
}
