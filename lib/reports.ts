// Report types and mock data

export type FindingStatus = 'pass' | 'warning' | 'fail'

export interface Finding {
  id: string
  category: string
  title: string
  description: string
  status: FindingStatus
  suggestion?: string
  guidelineLink?: string
}

export interface Report {
  id: string
  createdAt: Date
  fileName: string
  fileType: 'image' | 'figma'
  fileUrl: string
  thumbnailUrl?: string
  figmaUrl?: string
  summary: {
    passed: number
    warnings: number
    failed: number
    score: number
  }
  findings: Finding[]
  chatHistory: Array<{
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>
}

// Use fixed dates for mock data to avoid hydration mismatches
const TWO_HOURS_AGO = new Date('2024-01-15T10:00:00Z')
const YESTERDAY = new Date('2024-01-14T12:00:00Z')
const THREE_DAYS_AGO = new Date('2024-01-12T09:00:00Z')

// Mock reports data
export const mockReports: Report[] = [
  {
    id: 'report-1',
    createdAt: TWO_HOURS_AGO,
    fileName: 'Homepage banner v2.png',
    fileType: 'image',
    fileUrl: '/images/mock-design-1.png',
    summary: {
      passed: 6,
      warnings: 2,
      failed: 1,
      score: 78
    },
    findings: [
      {
        id: 'f1',
        category: 'Logo Usage',
        title: 'Logo placement needs attention',
        description: 'The logo is placed on an unapproved background color. Our logo should only appear on white, black, or brand primary colors.',
        status: 'fail',
        suggestion: 'Move the logo to an approved background area or adjust the background color.',
        guidelineLink: '/guidelines/our-logos'
      },
      {
        id: 'f2',
        category: 'Color',
        title: 'Banner color slightly off-brand',
        description: 'The top banner uses #0055AA instead of our brand blue #0050A5.',
        status: 'warning',
        suggestion: 'Update the banner color to use the exact brand blue from our color tokens.',
        guidelineLink: '/guidelines/colour-palette'
      },
      {
        id: 'f3',
        category: 'Typography',
        title: 'Avoid italic text for emphasis',
        description: 'Italic text is used in the body copy. We recommend using bold or color for emphasis instead.',
        status: 'warning',
        suggestion: 'Replace italic styling with bold (font-weight: 600) for emphasis.',
        guidelineLink: '/guidelines/typography'
      },
      {
        id: 'f4',
        category: 'Spacing',
        title: 'Consistent spacing applied',
        description: 'All spacing follows our 8px grid system correctly.',
        status: 'pass'
      },
      {
        id: 'f5',
        category: 'Imagery',
        title: 'High-quality imagery used',
        description: 'The hero image is high resolution and follows our photography guidelines.',
        status: 'pass'
      },
      {
        id: 'f6',
        category: 'Accessibility',
        title: 'Contrast ratios meet WCAG AA',
        description: 'All text-background combinations meet the minimum 4.5:1 contrast ratio.',
        status: 'pass'
      },
      {
        id: 'f7',
        category: 'Copywriting',
        title: 'Clear and active voice',
        description: 'The copy uses active voice and maintains our friendly tone.',
        status: 'pass'
      },
      {
        id: 'f8',
        category: 'Brand Assets',
        title: 'Approved assets used',
        description: 'All graphic elements are from our approved asset library.',
        status: 'pass'
      },
      {
        id: 'f9',
        category: 'Emotional Resonance',
        title: 'Positive brand feeling',
        description: 'The overall design conveys warmth and approachability.',
        status: 'pass'
      }
    ],
    chatHistory: [
      { role: 'user', content: 'Check this homepage banner design', timestamp: TWO_HOURS_AGO },
      { role: 'assistant', content: 'I\'ve analyzed your design. Found 1 issue and 2 suggestions. The main concern is the logo placement on an unapproved background.', timestamp: TWO_HOURS_AGO }
    ]
  },
  {
    id: 'report-2',
    createdAt: YESTERDAY,
    fileName: 'Mobile app onboarding',
    fileType: 'figma',
    fileUrl: '',
    figmaUrl: 'https://figma.com/design/abc123/Mobile-App',
    summary: {
      passed: 8,
      warnings: 1,
      failed: 0,
      score: 94
    },
    findings: [
      {
        id: 'f10',
        category: 'Color',
        title: 'All brand colors correct',
        description: 'Color usage is consistent with our brand palette.',
        status: 'pass'
      },
      {
        id: 'f11',
        category: 'Typography',
        title: 'Type scale followed',
        description: 'All text sizes follow our defined type scale.',
        status: 'pass'
      },
      {
        id: 'f12',
        category: 'Spacing',
        title: 'Minor spacing inconsistency',
        description: 'The spacing between cards varies slightly (16px vs 12px).',
        status: 'warning',
        suggestion: 'Standardize card spacing to 16px using --space-m token.'
      },
      {
        id: 'f13',
        category: 'Accessibility',
        title: 'Touch targets adequate',
        description: 'All interactive elements meet the 44x44px minimum touch target.',
        status: 'pass'
      }
    ],
    chatHistory: [
      { role: 'user', content: 'Review my mobile app onboarding screens', timestamp: YESTERDAY },
      { role: 'assistant', content: 'Great work! Your onboarding screens score 94/100. Just one minor spacing suggestion.', timestamp: YESTERDAY }
    ]
  },
  {
    id: 'report-3',
    createdAt: THREE_DAYS_AGO,
    fileName: 'Email newsletter template.png',
    fileType: 'image',
    fileUrl: '/images/mock-design-3.png',
    summary: {
      passed: 5,
      warnings: 3,
      failed: 2,
      score: 62
    },
    findings: [
      {
        id: 'f14',
        category: 'Logo Usage',
        title: 'Logo too small',
        description: 'The logo is below our minimum size requirement of 48px.',
        status: 'fail',
        suggestion: 'Increase logo size to at least 48px width.',
        guidelineLink: '/guidelines/our-logos'
      },
      {
        id: 'f15',
        category: 'Color',
        title: 'Unapproved accent color',
        description: 'A purple accent (#8B5CF6) is used which is not in our brand palette.',
        status: 'fail',
        suggestion: 'Replace with our brand blue or approved secondary colors.',
        guidelineLink: '/guidelines/colour-palette'
      }
    ],
    chatHistory: [
      { role: 'user', content: 'Check this email template', timestamp: THREE_DAYS_AGO },
      { role: 'assistant', content: 'I found some issues with this template. The logo is too small and there\'s an unapproved color being used.', timestamp: THREE_DAYS_AGO }
    ]
  }
]

export function getReportById(id: string): Report | undefined {
  return mockReports.find(r => r.id === id)
}

export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600'
  if (score >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

export function getStatusColor(status: FindingStatus): string {
  switch (status) {
    case 'pass': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'fail': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }
}

export function getStatusIcon(status: FindingStatus): string {
  switch (status) {
    case 'pass': return '✓'
    case 'warning': return '!'
    case 'fail': return '✕'
  }
}

