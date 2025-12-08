import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const typeScale = [
  { name: 'Display', size: '3rem', weight: '700', usage: 'Hero headlines' },
  { name: 'H1', size: '2.25rem', weight: '700', usage: 'Page titles' },
  { name: 'H2', size: '1.875rem', weight: '600', usage: 'Section headers' },
  { name: 'H3', size: '1.5rem', weight: '600', usage: 'Card titles' },
  { name: 'Body Large', size: '1.125rem', weight: '400', usage: 'Introductions' },
  { name: 'Body', size: '1rem', weight: '400', usage: 'Default text' },
  { name: 'Small', size: '0.875rem', weight: '400', usage: 'Captions, metadata' },
]

export default function TypographyPage() {
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
          <h1 className="text-3xl font-bold mb-2">Typography</h1>
          <p className="text-muted-foreground text-lg">
            Our typography system ensures clear communication and consistent brand expression.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Font Family */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Font Family</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-4xl font-bold">Inter</span>
                <Badge variant="outline">Primary Font</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Inter is our primary typeface. It's modern, highly legible, and works well across all screen sizes.
              </p>
              <div className="p-4 bg-muted rounded-lg font-mono text-sm">
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Type Scale */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Type Scale</h2>
          <p className="text-muted-foreground mb-6">
            Our type scale creates visual hierarchy and improves readability.
          </p>
          <div className="space-y-4">
            {typeScale.map((type) => (
              <Card key={type.name}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <span 
                      style={{ 
                        fontSize: type.size, 
                        fontWeight: parseInt(type.weight),
                        lineHeight: 1.2
                      }}
                    >
                      {type.name}
                    </span>
                    <span className="text-sm text-muted-foreground">{type.usage}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">{type.size}</p>
                    <p className="text-xs text-muted-foreground">weight: {type.weight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
            <CardDescription>Typography guidelines for consistent communication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium mb-1">Line Height</p>
              <p className="text-sm text-muted-foreground">
                Use 1.5 for body text and 1.2 for headings to ensure optimal readability.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Line Length</p>
              <p className="text-sm text-muted-foreground">
                Keep body text between 50-75 characters per line for comfortable reading.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Hierarchy</p>
              <p className="text-sm text-muted-foreground">
                Use no more than 3-4 font sizes on a single page to maintain clear hierarchy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
