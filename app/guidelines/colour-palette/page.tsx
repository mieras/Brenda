import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Copy } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const primaryColors = [
  { name: 'Primary Blue', hex: '#0050A5', hsl: 'hsl(212, 100%, 32%)', usage: 'Primary actions, links' },
  { name: 'Brand Red', hex: '#E30027', hsl: 'hsl(349, 100%, 45%)', usage: 'Accents, CTAs' },
  { name: 'Sunshine Yellow', hex: '#FFD014', hsl: 'hsl(48, 100%, 54%)', usage: 'Highlights, winners' },
  { name: 'Success Green', hex: '#009900', hsl: 'hsl(120, 100%, 30%)', usage: 'Success states' },
]

const neutralColors = [
  { name: 'Gray 7', hex: '#111111', usage: 'Primary text' },
  { name: 'Gray 43', hex: '#6D6D6D', usage: 'Secondary text' },
  { name: 'Gray 78', hex: '#C8C8C8', usage: 'Borders' },
  { name: 'Gray 95', hex: '#F3F3F3', usage: 'Backgrounds' },
  { name: 'White', hex: '#FFFFFF', usage: 'Cards, surfaces' },
]

export default function ColourPalettePage() {
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
          <h1 className="text-3xl font-bold mb-2">Colour Palette</h1>
          <p className="text-muted-foreground text-lg">
            Our color palette creates a vibrant, trustworthy, and recognizable brand presence.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Primary Colors */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Primary Colors</h2>
          <p className="text-muted-foreground mb-6">
            These are the core colors that define our brand identity. Use them consistently across all touchpoints.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {primaryColors.map((color) => (
              <Card key={color.name} className="overflow-hidden">
                <div 
                  className="h-24 w-full" 
                  style={{ backgroundColor: color.hex }}
                />
                <CardContent className="p-4">
                  <p className="font-medium">{color.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                  <p className="text-xs text-muted-foreground mt-1">{color.usage}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Neutral Colors */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Neutral Colors</h2>
          <p className="text-muted-foreground mb-6">
            Neutrals provide balance and ensure readability. Use them for text, backgrounds, and borders.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {neutralColors.map((color) => (
              <Card key={color.name} className="overflow-hidden">
                <div 
                  className="h-16 w-full border-b" 
                  style={{ backgroundColor: color.hex }}
                />
                <CardContent className="p-3">
                  <p className="font-medium text-sm">{color.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Guidelines</CardTitle>
            <CardDescription>Best practices for color usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
              <div>
                <p className="font-medium">Do</p>
                <p className="text-sm text-muted-foreground">
                  Use primary blue for interactive elements and CTAs. Ensure sufficient contrast for accessibility.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-2 w-2 rounded-full bg-red-500 mt-2 shrink-0" />
              <div>
                <p className="font-medium">Don't</p>
                <p className="text-sm text-muted-foreground">
                  Don't use brand red for error states - it's reserved for brand emphasis. Use a darker red for errors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
