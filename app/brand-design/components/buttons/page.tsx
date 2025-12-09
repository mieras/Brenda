'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, ExternalLink, Code2, FileText, Palette } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ButtonComponentPage() {
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null)

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
          <Link href="/brand-design/components">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Components
          </Link>
        </Button>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#E30027]">Button</h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                A universal trigger for users to take action, designed to make interaction immediate and accessible across the interface.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/brand-design/components/buttons" className="text-sm text-primary hover:underline">
              Accessible to Design System
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/brand-design/components/buttons" className="text-sm text-primary hover:underline">
              WCAG 2.1 AA compliant
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/brand-design/components/buttons" className="text-sm text-primary hover:underline">
              Use this UI
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="design" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="design" className="gap-2">
              <Palette className="h-4 w-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2">
              <Code2 className="h-4 w-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText className="h-4 w-4" />
              Content Guidelines
            </TabsTrigger>
          </TabsList>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-12">
            {/* Main Example & Critical Uses */}
            <Card>
              <CardContent className="p-12">
                <div className="flex flex-col items-center justify-center min-h-[200px] mb-8">
                  <Button size="lg" className="gap-2">
                    Button title
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3 max-w-2xl mx-auto">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm">
                      <strong>Safety critical:</strong> We use this button for actions that are critical and irreversible.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm">
                      <strong>User ownership:</strong> We use this button for actions that give the user ownership of their data.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-sm">
                      <strong>Error prevention:</strong> We use this button for actions that prevent errors.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage Section - Do's and Don'ts */}
            <section>
              <h2 className="text-3xl font-bold mb-2 text-[#E30027]">Usage</h2>
              <p className="text-muted-foreground mb-8">Do's and don'ts</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Do's */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-600">Do</Badge>
                        <CardTitle className="text-lg">Action-driven label and icon</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                        <Button className="gap-2">
                          Next step
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use clear, unambiguous, and concise labels. Icons are optional and should support the action.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-600">Do</Badge>
                        <CardTitle className="text-lg">Small size</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                        <Button size="sm" className="gap-2">
                          Next step
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use clear, unambiguous, and concise labels. Icons are optional and should support the action.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-600">Do</Badge>
                        <CardTitle className="text-lg">Full width</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                        <Button className="w-full gap-2">
                          Button title
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use clear, unambiguous, and concise labels. Icons are optional and should support the action.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Don'ts */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive">Don't</Badge>
                        <CardTitle className="text-lg">Long label</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                        <Button variant="secondary" className="gap-2 max-w-xs">
                          This is a really long label that shouldn't be on a button.
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Avoid long or ambiguous labels. Consider other design patterns if you need more space for context.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive">Don't</Badge>
                        <CardTitle className="text-lg">Meaningless label</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                        <Button variant="secondary" size="sm">
                          Click here
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Avoid long or ambiguous labels. Consider other design patterns if you need more space for context.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive">Don't</Badge>
                        <CardTitle className="text-lg">Multiple primary actions</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                        <Card className="w-full max-w-sm">
                          <CardContent className="p-4 space-y-4">
                            <div className="h-12 w-12 rounded-lg bg-red-100 flex items-center justify-center">
                              <XCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <Button className="w-full">Click button</Button>
                            <div className="space-y-2">
                              <p className="font-medium">Free giveaway</p>
                              <ul className="space-y-1 text-sm">
                                <li className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  Win a holiday to the Caribbean
                                </li>
                              </ul>
                            </div>
                            <Button className="w-full">Find out more important</Button>
                          </CardContent>
                        </Card>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Avoid having too many primary actions on a single page. Consider other design patterns for complex interactions.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <Separator />

            {/* Properties Section - Variants */}
            <section>
              <h2 className="text-3xl font-bold mb-2 text-[#E30027]">Properties</h2>
              <p className="text-muted-foreground mb-8">Variants</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Primary Variants */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Primary</h3>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Icon right</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button className="gap-2">
                          Button title
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Icon left</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button className="gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          Button title
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Icon only</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Small - Icon right</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button size="sm" className="gap-2">
                          Button title
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Small - Icon left</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button size="sm" className="gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          Button title
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Small - Icon only</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button size="icon" className="h-8 w-8">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Secondary Variants */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Secondary</h3>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Icon right</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button variant="secondary" className="gap-2">
                          Button title
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Icon left</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button variant="secondary" className="gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          Button title
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Icon only</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button variant="secondary" size="icon">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Small - Icon right</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button variant="secondary" size="sm" className="gap-2">
                          Button title
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Small - Icon left</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button variant="secondary" size="sm" className="gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          Button title
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Small - Icon only</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                        <Button variant="secondary" size="icon" className="h-8 w-8">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <Separator />

            {/* Nested Components Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-[#E30027]">Nested components</h2>
              
              <Card>
                <CardContent className="p-16">
                  <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-3xl">+</span>
                    </div>
                    <p className="text-lg text-center max-w-2xl text-muted-foreground">
                      Button can be nested into other components to provide more complex interactions, or to provide more context.
                    </p>
                    <Link href="/brand-design/components/buttons/nested" className="text-primary hover:underline">
                      See Nested components
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Behavior Section - States */}
            <section>
              <h2 className="text-3xl font-bold mb-2 text-[#E30027]">Behavior</h2>
              <p className="text-muted-foreground mb-8">States</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Default</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                      <Button className="gap-2">
                        Button title
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Hover</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                      <Button className="gap-2 hover:bg-primary/90">
                        Button title
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                      <Button className="gap-2 ring-2 ring-[#0050A5] ring-offset-2">
                        Button title
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Loading</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                      <Button className="gap-2" disabled>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Button title
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Pressed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                      <Button className="gap-2 active:scale-95 transition-transform">
                        Button title
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Disabled</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                      <Button className="gap-2" disabled>
                        Button title
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Storybook Documentation</CardTitle>
                <CardDescription>
                  Interactive component documentation and code examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Code2 className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="font-medium mb-2">Storybook Integration</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your Storybook instance to view interactive component documentation
                      </p>
                      <Button variant="outline" asChild>
                        <Link href="https://storybook.example.com" target="_blank">
                          Open in Storybook
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>
                  React/TypeScript implementation examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Basic Usage</h3>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { Button } from '@/components/ui/button'

<Button>Click me</Button>`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">With Icon</h3>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

<Button className="gap-2">
  Next step
  <ArrowRight className="h-4 w-4" />
</Button>`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Variants</h3>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Props</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Prop</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Default</th>
                        <th className="text-left p-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-mono">variant</td>
                        <td className="p-2 font-mono">'default' | 'secondary' | 'outline' | 'ghost'</td>
                        <td className="p-2 font-mono">'default'</td>
                        <td className="p-2">Button style variant</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">size</td>
                        <td className="p-2 font-mono">'default' | 'sm' | 'lg' | 'icon'</td>
                        <td className="p-2 font-mono">'default'</td>
                        <td className="p-2">Button size</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-mono">disabled</td>
                        <td className="p-2 font-mono">boolean</td>
                        <td className="p-2 font-mono">false</td>
                        <td className="p-2">Disable button interaction</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Guidelines Tab */}
          <TabsContent value="content" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Tone of Voice</CardTitle>
                <CardDescription>
                  Writing guidelines for button labels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Do's</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Use action verbs: "Submit", "Continue", "Save"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Be clear and specific about what will happen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Keep labels concise (1-3 words ideal)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Don'ts</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Avoid generic labels like "Click here" or "Submit"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Don't use long sentences or explanations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <span>Avoid question format unless it's a confirmation</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Labeling Conventions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Examples</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Primary Actions</p>
                      <p className="text-xs text-muted-foreground">"Start playing", "Continue", "Confirm order"</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Secondary Actions</p>
                      <p className="text-xs text-muted-foreground">"Learn more", "View details", "Cancel"</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Destructive Actions</p>
                      <p className="text-xs text-muted-foreground">"Delete account", "Remove item", "Cancel subscription"</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Button labels must be descriptive and indicate the action</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Use aria-label for icon-only buttons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Ensure sufficient color contrast (WCAG AA minimum)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Provide clear focus states for keyboard navigation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

