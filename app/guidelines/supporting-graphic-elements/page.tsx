import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SupportingGraphicElementsPage() {
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
          <h1 className="text-3xl font-bold mb-2">Supporting Graphic Elements</h1>
          <p className="text-muted-foreground text-lg">
            Patterns, shapes, and visual elements that complement our brand identity.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Patterns */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Patterns</h2>
          <p className="text-muted-foreground mb-6">
            Our patterns add visual interest while maintaining brand consistency.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5" />
              <CardContent className="p-3">
                <p className="font-medium text-sm">Gradient Wash</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-32 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,hsl(var(--primary)/0.1)_10px,hsl(var(--primary)/0.1)_20px)]" />
              <CardContent className="p-3">
                <p className="font-medium text-sm">Diagonal Lines</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="h-32 bg-[radial-gradient(circle,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <CardContent className="p-3">
                <p className="font-medium text-sm">Dot Grid</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Shapes */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Shapes</h2>
          <p className="text-muted-foreground mb-6">
            Geometric shapes that can be used as decorative elements.
          </p>
          <div className="grid grid-cols-4 gap-4">
            <Card className="aspect-square flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/20" />
            </Card>
            <Card className="aspect-square flex items-center justify-center">
              <div className="h-16 w-16 rounded-lg bg-primary/20" />
            </Card>
            <Card className="aspect-square flex items-center justify-center">
              <div className="h-16 w-16 bg-primary/20" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
            </Card>
            <Card className="aspect-square flex items-center justify-center">
              <div className="h-16 w-16 bg-primary/20" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </Card>
          </div>
        </section>

        {/* Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Guidelines</CardTitle>
            <CardDescription>How to use supporting elements effectively</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium mb-1">Subtlety</p>
              <p className="text-sm text-muted-foreground">
                Supporting elements should enhance, not overpower. Keep them subtle and purposeful.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Consistency</p>
              <p className="text-sm text-muted-foreground">
                Use the same patterns and shapes across related materials for visual cohesion.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Spacing</p>
              <p className="text-sm text-muted-foreground">
                Allow enough white space around graphic elements to let them breathe.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
