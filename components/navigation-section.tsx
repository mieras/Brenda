'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon?: LucideIcon
}

interface NavigationSectionProps {
  title: string
  items: NavItem[]
  isCollapsed?: boolean
  onNavigate?: () => void
}

export function NavigationSection({ title, items, isCollapsed, onNavigate }: NavigationSectionProps) {
  const pathname = usePathname()

  if (isCollapsed) {
    return (
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const normalizedPathname = pathname.replace(/\/$/, '') || '/'
          const normalizedHref = item.href.replace(/\/$/, '') || '/'
          const isActive = normalizedPathname === normalizedHref

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center justify-center px-2 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#0050A5]/10 text-[#0050A5]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={item.label}
            >
              {Icon && <Icon className={cn("h-4 w-4", isActive && "text-[#0050A5]")} />}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon
        const normalizedPathname = pathname.replace(/\/$/, '') || '/'
        const normalizedHref = item.href.replace(/\/$/, '') || '/'
        const isActive = normalizedPathname === normalizedHref

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-[#0050A5]/10 text-[#0050A5]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {Icon && <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-[#0050A5]")} />}
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
