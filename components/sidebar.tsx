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
  Sparkles
} from 'lucide-react'

const menuItems = [
  { label: 'Homepage', slug: '', icon: Home },
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
  isMobile?: boolean
  onNavigate?: () => void
}

export default function Sidebar({ onNavigate, isMobile }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r bg-card transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Brenda</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-2">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const href = item.slug ? `/guidelines/${item.slug}` : '/'
            const isActive = pathname === href
            const Icon = item.icon

            return (
              <Link
                key={item.slug || 'home'}
                href={href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <Separator />
      <div className={cn(
        "p-4 flex items-center",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <ThemeToggle />
        {!collapsed && (
          <span className="text-xs text-muted-foreground">v1.0</span>
        )}
      </div>
    </aside>
  )
}
