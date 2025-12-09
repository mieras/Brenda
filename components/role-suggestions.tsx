'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, Palette, Type, Code, FileText, BookOpen, Sparkles } from 'lucide-react'
import { useUser } from '@/lib/user-context'

interface Suggestion {
  title: string
  description: string
  href: string
  icon: typeof Palette
}

const roleSuggestions: Record<string, Suggestion[]> = {
  designer: [
    {
      title: 'Colour Palette',
      description: 'Brand colors and usage guidelines',
      href: '/guidelines/colour-palette',
      icon: Palette,
    },
    {
      title: 'Typography',
      description: 'Fonts, type scale, and text styles',
      href: '/guidelines/typography',
      icon: Type,
    },
    {
      title: 'Design Tokens',
      description: 'Spacing, colors, and design system tokens',
      href: '/brand-design/foundations/spacing',
      icon: Sparkles,
    },
    {
      title: 'Components',
      description: 'UI components with design specs',
      href: '/brand-design/components/buttons',
      icon: Code,
    },
  ],
  developer: [
    {
      title: 'Design Tokens',
      description: 'Spacing, colors, typography tokens',
      href: '/brand-design/foundations/spacing',
      icon: Sparkles,
    },
    {
      title: 'Components Code',
      description: 'Component implementations and Storybook',
      href: '/brand-design/components/buttons',
      icon: Code,
    },
    {
      title: 'Accessibility',
      description: 'WCAG guidelines and best practices',
      href: '/brand-design/foundations/accessibility',
      icon: BookOpen,
    },
  ],
  content: [
    {
      title: 'Tone of Voice',
      description: 'Writing style and brand voice guidelines',
      href: '/guidelines/tone-of-voice',
      icon: Type,
    },
    {
      title: 'Content Fundamentals',
      description: 'Core content principles and structure',
      href: '/content-guidelines/fundamentals',
      icon: BookOpen,
    },
    {
      title: 'Content Guides',
      description: 'Guides for different content types',
      href: '/content-guidelines/guides',
      icon: FileText,
    },
  ],
  brand: [
    {
      title: 'Brand Story',
      description: 'Complete brand overview and values',
      href: '/brand-story/power-of-brenda',
      icon: Sparkles,
    },
    {
      title: 'All Guidelines',
      description: 'Complete brand guidelines overview',
      href: '/guidelines/our-logos',
      icon: BookOpen,
    },
  ],
  agency: [
    {
      title: 'Brand Portal',
      description: 'Brand guidelines and assets',
      href: '/guidelines/our-logos',
      icon: Sparkles,
    },
    {
      title: 'Brand Assets',
      description: 'Logos, icons, and downloadable assets',
      href: '/brand-design/foundations/assets',
      icon: Palette,
    },
  ],
}

export function RoleSuggestions() {
  const { user } = useUser()
  const suggestions = roleSuggestions[user.role] || roleSuggestions.designer

  if (suggestions.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#0050A5] dark:text-[hsl(212,100%,60%)]" />
          Recommended for You
        </CardTitle>
        <CardDescription>
          Quick access to content most relevant to your role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon
            return (
              <Link
                key={suggestion.href}
                href={suggestion.href}
                className="group flex items-start gap-3 p-3 rounded-lg border border-[#0050A5]/20 dark:border-[hsl(212,100%,60%)]/30 hover:border-[#0050A5]/50 dark:hover:border-[hsl(212,100%,60%)]/50 hover:bg-[#0050A5]/5 dark:hover:bg-[hsl(212,100%,60%)]/10 transition-all"
              >
                <div className="h-10 w-10 rounded-lg bg-[#0050A5]/10 dark:bg-[hsl(212,100%,60%)]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0050A5]/20 dark:group-hover:bg-[hsl(212,100%,60%)]/30 transition-colors">
                  <Icon className="h-5 w-5 text-[#0050A5] dark:text-[hsl(212,100%,60%)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 group-hover:text-[#0050A5] dark:group-hover:text-[hsl(212,100%,70%)] transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#0050A5] dark:text-[hsl(212,100%,60%)] dark:group-hover:text-[hsl(212,100%,70%)] transition-colors shrink-0 mt-1" />
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

