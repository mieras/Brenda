import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Download, Check, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OurLogosPage() {
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
          <h1 className="text-3xl font-bold mb-2">Our Logos</h1>
          <p className="text-muted-foreground text-lg">
            Our logo is the foundation of our brand identity. Use it consistently and with care.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Primary Logo */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Primary Logo</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8 flex items-center justify-center bg-white dark:bg-zinc-900 min-h-[200px]">
                <div className="h-24 w-24 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-foreground">B</span>
                </div>
              </CardContent>
              <CardContent className="p-4 border-t">
                <p className="font-medium">Light Background</p>
                <p className="text-sm text-muted-foreground">Primary logo on light surfaces</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 flex items-center justify-center bg-zinc-900 dark:bg-zinc-800 min-h-[200px]">
                <div className="h-24 w-24 rounded-xl bg-white flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">B</span>
                </div>
              </CardContent>
              <CardContent className="p-4 border-t">
                <p className="font-medium">Dark Background</p>
                <p className="text-sm text-muted-foreground">Reversed logo on dark surfaces</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Clear Space */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Clear Space</h2>
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <div className="relative p-8 border-2 border-dashed border-primary/30 rounded-lg">
                  <div className="h-16 w-16 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">B</span>
                  </div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                    Minimum: 1x
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-6">
                Maintain clear space equal to the height of the 'B' around the logo.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Do's and Don'ts */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 dark:border-green-900">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="h-5 w-5" />
                  Do
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">✓ Use approved logo files</p>
                <p className="text-sm text-muted-foreground">✓ Maintain clear space</p>
                <p className="text-sm text-muted-foreground">✓ Use on approved backgrounds</p>
                <p className="text-sm text-muted-foreground">✓ Scale proportionally</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 dark:border-red-900">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <X className="h-5 w-5" />
                  Don't
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">✗ Stretch or distort</p>
                <p className="text-sm text-muted-foreground">✗ Change colors</p>
                <p className="text-sm text-muted-foreground">✗ Add effects or shadows</p>
                <p className="text-sm text-muted-foreground">✗ Use on busy backgrounds</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Downloads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Logo Assets
            </CardTitle>
            <CardDescription>Get the official logo files for your projects</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              SVG
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              PNG
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              EPS
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
