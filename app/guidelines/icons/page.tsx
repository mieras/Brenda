import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Home, User, Settings, Bell, Search, Heart, Star, Check, X, Plus, Minus, ChevronRight, ChevronDown, Mail, Phone, MapPin, Calendar, Clock, Download, Upload, Share2, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const iconCategories = [
  {
    name: 'Navigation',
    icons: [
      { icon: Home, name: 'Home' },
      { icon: Search, name: 'Search' },
      { icon: ChevronRight, name: 'Chevron Right' },
      { icon: ChevronDown, name: 'Chevron Down' },
    ]
  },
  {
    name: 'Actions',
    icons: [
      { icon: Plus, name: 'Add' },
      { icon: Minus, name: 'Remove' },
      { icon: Edit, name: 'Edit' },
      { icon: Trash2, name: 'Delete' },
      { icon: Download, name: 'Download' },
      { icon: Upload, name: 'Upload' },
      { icon: Share2, name: 'Share' },
    ]
  },
  {
    name: 'Status',
    icons: [
      { icon: Check, name: 'Success' },
      { icon: X, name: 'Error' },
      { icon: Bell, name: 'Notification' },
      { icon: Eye, name: 'Visible' },
      { icon: EyeOff, name: 'Hidden' },
    ]
  },
  {
    name: 'Social',
    icons: [
      { icon: Heart, name: 'Like' },
      { icon: Star, name: 'Favorite' },
      { icon: User, name: 'Profile' },
      { icon: Settings, name: 'Settings' },
    ]
  },
  {
    name: 'Contact',
    icons: [
      { icon: Mail, name: 'Email' },
      { icon: Phone, name: 'Phone' },
      { icon: MapPin, name: 'Location' },
      { icon: Calendar, name: 'Date' },
      { icon: Clock, name: 'Time' },
    ]
  },
]

export default function IconsPage() {
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
          <h1 className="text-3xl font-bold mb-2">Icons</h1>
          <p className="text-muted-foreground text-lg">
            Our icon system uses Lucide icons for consistent, accessible visual communication.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Icon Library */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Icon Library</h2>
          <p className="text-muted-foreground mb-6">
            We use Lucide React icons for their clean design and accessibility features.
          </p>

          <div className="space-y-8">
            {iconCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-lg font-medium mb-4">{category.name}</h3>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {category.icons.map(({ icon: Icon, name }) => (
                    <Card key={name} className="group hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex flex-col items-center gap-2">
                        <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs text-muted-foreground text-center">{name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Guidelines</CardTitle>
            <CardDescription>Best practices for icon usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium mb-1">Size</p>
              <p className="text-sm text-muted-foreground">
                Use 16px for inline icons, 20px for buttons, and 24px for standalone icons.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Stroke Width</p>
              <p className="text-sm text-muted-foreground">
                Maintain consistent stroke width (1.5-2px) across all icons.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Accessibility</p>
              <p className="text-sm text-muted-foreground">
                Always provide screen reader text for icons that convey meaning.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
