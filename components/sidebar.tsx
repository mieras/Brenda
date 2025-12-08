'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
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
  Clock
} from 'lucide-react'

const mainItems = [
  { label: 'Homepage', href: '/', icon: Home },
  { label: 'My Activity', href: '/activity', icon: Clock },
]

const menuItems = [
  { label: 'Our Logos', slug: 'our-logos', icon: Circle },
  { label: 'Colour Palette', slug: 'colour-palette', icon: Palette },
  { label: 'Typography', slug: 'typography', icon: Type },
  { label: 'Graphic Elements', slug: 'supporting-graphic-elements', icon: Shapes },
  { label: 'Icons', slug: 'icons', icon: Grid3X3 },
  { label: 'Cheques', slug: 'cheques', icon: CheckCircle },
  { label: 'Tickets', slug: 'tickets', icon: Ticket },
  { label: 'Plus and Premium', slug: 'plus-and-premium', icon: Star },
  { label: 'Photography', slug: 'photography', icon: Camera },
  { label: 'Clothing', slug: 'clothing', icon: Shirt },
  { label: 'Vehicles', slug: 'vehicles', icon: Car },
  { label: 'Prize Plan', slug: 'prize-plan', icon: Gift },
  { label: 'Creative Ladder', slug: 'creative-ladder', icon: BarChart3 },
  { label: 'Brenda Group', slug: 'brenda-group', icon: Users },
  { label: 'The Power of Brenda', slug: 'the-power-of-brenda', icon: Zap },
]

export interface SidebarProps {
  onNavigate?: () => void
  isMobile?: boolean
}

export default function Sidebar({ onNavigate, isMobile }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  
  // On mobile, always show expanded sidebar (no collapse)
  const isCollapsed = isMobile ? false : collapsed

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r bg-card transition-all duration-300 sticky top-0",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#BB0020] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">Brenda</span>
          </div>
        )}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
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
          })}

          {/* Guidelines section */}
          {!isCollapsed && (
            <p className="text-xs font-medium text-muted-foreground px-3 pt-4 pb-2">Guidelines</p>
          )}
          {isCollapsed && <Separator className="my-2" />}

          {menuItems.map((item) => {
            const href = `/guidelines/${item.slug}`
            const normalizedPathname = pathname.replace(/\/$/, '') || '/'
            const normalizedHref = href.replace(/\/$/, '') || '/'
            const isActive = normalizedPathname === normalizedHref
            const Icon = item.icon

            return (
              <Link
                key={item.slug}
                href={href}
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
          })}
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
