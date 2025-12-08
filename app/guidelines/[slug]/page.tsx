import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const guidelines: Record<string, { title: string; description: string; content: string }> = {
  'colour-palette': {
    title: 'Colour Palette',
    description: 'Brand colors and usage guidelines',
    content: 'Our color palette has been carefully selected to represent our brand values. Always use approved brand colors from our design tokens.'
  },
  'typography': {
    title: 'Typography',
    description: 'Fonts and type scales',
    content: 'Typography plays a crucial role in communicating our brand voice. We use a systematic type scale that ensures consistency across all touchpoints.'
  },
  'supporting-graphic-elements': {
    title: 'Supporting Graphic Elements',
    description: 'Patterns, shapes, and decorative elements',
    content: 'Supporting graphic elements should complement, not compete with, our primary brand elements.'
  },
  'icons': {
    title: 'Icons',
    description: 'Icon library and usage',
    content: 'Icons should be consistent with our design system. Use approved icon sets and maintain consistent sizing and styling.'
  },
  'our-logos': {
    title: 'Our Logos',
    description: 'Logo usage guidelines and download assets',
    content: 'Our logo is the cornerstone of our brand identity. It should always be used consistently and with proper clear space.'
  },
  'cheques': {
    title: 'Cheques',
    description: 'Guidelines for cheque design and presentation',
    content: 'Cheques are an important part of our winner experience. Follow these guidelines for consistent presentation.'
  },
  'tickets': {
    title: 'Tickets',
    description: 'Ticket design specifications',
    content: 'Our tickets represent the lottery experience. Maintain brand consistency across all ticket designs.'
  },
  'plus-and-premium': {
    title: 'Plus and Premium',
    description: 'Premium product guidelines',
    content: 'Our premium products require elevated design treatment while maintaining brand recognition.'
  },
  'photography': {
    title: 'Photography',
    description: 'Photo style and usage guidelines',
    content: 'Photography should capture authentic moments of joy and community connection.'
  },
  'clothing': {
    title: 'Clothing',
    description: 'Branded clothing specifications',
    content: 'Branded clothing must maintain quality standards and proper logo placement.'
  },
  'vehicles': {
    title: 'Vehicles',
    description: 'Vehicle branding guidelines',
    content: 'Vehicle branding should be visible, professional, and weather-resistant.'
  },
  'prize-plan': {
    title: 'Prize Plan',
    description: 'Prize communication guidelines',
    content: 'Prize communication should be clear, exciting, and compliant with regulations.'
  },
  'creative-ladder': {
    title: 'Creative Ladder',
    description: 'Creative development framework',
    content: 'Use the creative ladder to evaluate and elevate your creative work.'
  },
  'brenda-group': {
    title: 'Brenda Group',
    description: 'Group brand architecture',
    content: 'Understanding how our brands work together within the group.'
  },
  'the-power-of-brenda': {
    title: 'The Power of Brenda',
    description: 'Brand strategy and positioning',
    content: 'Our brand is built on the power of positive change and community impact.'
  },
}

// Required for static export (GitHub Pages)
export function generateStaticParams() {
  return Object.keys(guidelines).map((slug) => ({
    slug,
  }))
}

export default function GuidelinePage({ params }: { params: { slug: string } }) {
  const guideline = guidelines[params.slug]

  if (!guideline) {
    notFound()
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </Button>

        <div className="mb-8">
          <Badge variant="secondary" className="mb-2">Guidelines</Badge>
          <h1 className="text-3xl font-bold mb-2">{guideline.title}</h1>
          <p className="text-muted-foreground text-lg">{guideline.description}</p>
        </div>

        <Separator className="mb-8" />

        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {guideline.content}
            </p>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Need help with this guideline? Click the chat button to ask Brenda!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
