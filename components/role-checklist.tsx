'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, Circle, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { useUser } from '@/lib/user-context'
import { cn } from '@/lib/utils'

interface ChecklistItem {
  id: string
  label: string
  href: string
  description?: string
}

const roleChecklists: Record<string, ChecklistItem[]> = {
  designer: [
    {
      id: 'read-brand-story',
      label: 'Read Brand Story',
      href: '/brand-story/power-of-brenda',
      description: 'Understand our brand purpose and values',
    },
    {
      id: 'review-colour-palette',
      label: 'Review Colour Palette',
      href: '/guidelines/colour-palette',
      description: 'Learn about brand colors and usage',
    },
    {
      id: 'review-typography',
      label: 'Review Typography Guidelines',
      href: '/guidelines/typography',
      description: 'Understand type scale and font usage',
    },
    {
      id: 'download-design-kit',
      label: 'Download Design Kit',
      href: '/brand-design/foundations/design-kit',
      description: 'Get access to Figma design system',
    },
    {
      id: 'review-first-component',
      label: 'Review First Component',
      href: '/brand-design/components/buttons',
      description: 'Explore Button component design and usage',
    },
  ],
  developer: [
    {
      id: 'setup-storybook',
      label: 'Setup Storybook',
      href: '/brand-design/components/buttons',
      description: 'Access component documentation and code',
    },
    {
      id: 'review-design-tokens',
      label: 'Review Design Tokens',
      href: '/brand-design/foundations/spacing',
      description: 'Understand spacing, colors, and typography tokens',
    },
    {
      id: 'review-component-code',
      label: 'Review First Component Code',
      href: '/brand-design/components/buttons',
      description: 'Explore Button component implementation',
    },
    {
      id: 'setup-dev-environment',
      label: 'Setup Development Environment',
      href: '/brand-design/foundations/development',
      description: 'Configure your local development setup',
    },
  ],
  content: [
    {
      id: 'read-brand-story',
      label: 'Read Brand Story',
      href: '/brand-story/power-of-brenda',
      description: 'Understand our brand purpose and values',
    },
    {
      id: 'review-tone-of-voice',
      label: 'Review Tone of Voice',
      href: '/guidelines/tone-of-voice',
      description: 'Learn about our writing style and voice',
    },
    {
      id: 'read-content-fundamentals',
      label: 'Read Content Guidelines Fundamentals',
      href: '/content-guidelines/fundamentals',
      description: 'Understand core content principles',
    },
    {
      id: 'review-content-guides',
      label: 'Review Content Guides',
      href: '/content-guidelines/guides',
      description: 'Explore guides for different content types',
    },
  ],
  brand: [
    {
      id: 'read-brand-story',
      label: 'Review Brand Story',
      href: '/brand-story/power-of-brenda',
      description: 'Complete overview of brand foundations',
    },
    {
      id: 'review-all-guidelines',
      label: 'Review All Guidelines',
      href: '/guidelines/our-logos',
      description: 'Familiarize with all brand guidelines',
    },
    {
      id: 'review-design-system',
      label: 'Review Design System',
      href: '/brand-design/foundations/spacing',
      description: 'Understand design system structure',
    },
  ],
  agency: [
    {
      id: 'read-brand-story',
      label: 'Read Brand Story',
      href: '/brand-story/power-of-brenda',
      description: 'Understand our brand purpose and values',
    },
    {
      id: 'review-brand-portal',
      label: 'Review Brand Portal',
      href: '/guidelines/our-logos',
      description: 'Explore brand guidelines and assets',
    },
    {
      id: 'download-assets',
      label: 'Download Brand Assets',
      href: '/brand-design/foundations/assets',
      description: 'Access logos, icons, and other assets',
    },
  ],
}

export function RoleChecklist() {
  const { user } = useUser()
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())

  const checklist = roleChecklists[user.role] || roleChecklists.designer

  const handleToggle = (id: string) => {
    setCompletedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const progress = checklist.length > 0 
    ? Math.round((completedItems.size / checklist.length) * 100)
    : 0

  if (checklist.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Getting Started Checklist
        </CardTitle>
        <CardDescription>
          Complete these steps to get familiar with Brenda and our brand guidelines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completedItems.size} of {checklist.length} completed</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-2">
          {checklist.map((item) => {
            const isCompleted = completedItems.has(item.id)
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                  isCompleted 
                    ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900" 
                    : "bg-card hover:bg-muted/50"
                )}
              >
                <button
                  onClick={() => handleToggle(item.id)}
                  className="mt-0.5 shrink-0"
                  aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className={cn(
                        "font-medium text-sm hover:underline",
                        isCompleted && "line-through text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <Link href={item.href}>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

