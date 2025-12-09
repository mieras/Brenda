import { notFound } from 'next/navigation'
import { ArrowLeft, Code, FileText, Palette, ExternalLink, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ComponentTabs from './component-tabs'
import { TabsContent } from '@/components/ui/tabs'

// Component data structure
interface ComponentData {
  name: string
  description: string
  status: 'available' | 'in-progress' | 'planned'
  wcagStatus: 'compliant' | 'in-audit' | 'not-compliant'
  jiraLink?: string
  storybookLink?: string
  githubLink?: string
  figmaLink?: string
  previewImage?: string
  overview: {
    purpose: string[]
  }
  dosAndDonts: {
    dos: Array<{ title: string; description: string; image?: string }>
    donts: Array<{ title: string; description: string; image?: string }>
  }
  variants: Array<{
    name: string
    description: string
    image?: string
  }>
  states: Array<{
    name: string
    description: string
    image?: string
  }>
  nestedComponents?: Array<{
    name: string
    description: string
    link?: string
    image?: string
  }>
  codeExamples?: {
    installation?: string
    basic?: string
    advanced?: string[]
  }
  contentGuidelines?: {
    tone?: string
    labeling?: string
    accessibility?: string
    examples?: string[]
  }
}

const components: Record<string, ComponentData> = {
  buttons: {
    name: 'Button',
    description: 'A universal trigger for user actions, designed to make interaction immediate and accessible across the interface.',
    status: 'available',
    wcagStatus: 'compliant',
    jiraLink: 'https://novamedia.atlassian.net/browse/DK-29',
    storybookLink: 'https://designsystem.postcodelotterygroup.com/?path=/docs/components-button--docs',
    overview: {
      purpose: [
        'Call to action: Directs attention to the next best step and drives conversion.',
        'Visual hierarchy: Encodes priority (primary/secondary) so choices feel obvious.',
        'Error prevention: Debounces rapid clicks and blocks duplicate submissions.',
      ],
    },
    dosAndDonts: {
      dos: [
        {
          title: 'Action-driven label and icon',
          description: 'Use the button with an action-driven label and a meaningful icon when you want to make the action quickly scannable and reinforce its intent visually. The icon should support (not replace) the label.',
        },
        {
          title: 'Small size',
          description: 'Use the button in small size when space is constrained, such as in toolbars or dense layouts, and the action still needs to remain accessible.',
        },
        {
          title: 'Full width',
          description: 'Use the button in full width when designing for mobile to provide better tap targets, stronger visual presence, and consistent alignment across viewports.',
        },
      ],
      donts: [
        {
          title: 'Long label',
          description: 'Avoid using the button with long or wrapping labels when space is limited or layout consistency is important because it affects readability and disrupts alignment.',
        },
        {
          title: 'Meaningless icon',
          description: 'Avoid using the button with an icon that lacks clear meaning because it reduces clarity, confuses users, and weakens accessibility for assistive technologies.',
        },
        {
          title: 'Multiple primaries',
          description: 'Avoid using more than one primary button on a single page when guiding the user toward a clear action because it creates confusion about which step to take.',
        },
      ],
    },
    variants: [
      {
        name: 'Primary - Icon right',
        description: 'Use an icon on the right when the action indicates moving forward, such as "Next" or "Submit". Placing the icon on the right reinforces progression or the expected outcome.',
      },
      {
        name: 'Primary - Icon left',
        description: 'Use an icon on the left by default, as it helps users quickly recognize the action (e.g. "Add" or "Download"). Only place the icon on the right when using a directional icon, such as a forward arrow.',
      },
      {
        name: 'Primary - Icon only',
        description: 'Use when space is limited or the icon alone is universally understood (e.g. plus, close or menu). Always include an accessible label for screen readers.',
      },
      {
        name: 'Primary - Small - Icon right',
        description: 'A compact version of the main button for dense layouts. The right icon adds clarity while maintaining hierarchy and focus.',
      },
      {
        name: 'Primary - Small - Icon left',
        description: 'For space-constrained areas that still need a clear visual cue. The left icon quickly communicates the button\'s function.',
      },
      {
        name: 'Primary - Small - Icon only',
        description: 'The minimal primary action for toolbars or icon grids. Keep usage consistent and ensure it remains accessible.',
      },
      {
        name: 'Secondary - Icon right',
        description: 'Use for secondary or supporting actions. The right icon suggests progression or continuation without overpowering the primary button.',
      },
      {
        name: 'Secondary - Icon left',
        description: 'Ideal for secondary actions that benefit from a recognizable visual symbol. The icon supports comprehension while keeping focus on the text.',
      },
      {
        name: 'Secondary - Icon only',
        description: 'A lightweight option for less critical or repetitive actions. Maintain clear iconography and provide tooltip or aria-label support.',
      },
      {
        name: 'Secondary - Small - Icon right',
        description: 'A compact secondary action suitable for tight spaces. The right icon subtly emphasizes flow or next steps.',
      },
      {
        name: 'Secondary - Small - Icon left',
        description: 'For compact layouts where quick visual recognition is key. The left icon aids scanning while preserving visual balance.',
      },
      {
        name: 'Secondary - Small - Icon only',
        description: 'The smallest form of secondary interaction. Best for toolbars or inline actions where icons are clear and consistent.',
      },
    ],
    states: [
      {
        name: 'Default',
        description: 'The standard resting state, shown before any user interaction. Communicates readiness to perform an action.',
      },
      {
        name: 'Hover',
        description: 'Appears when the user\'s cursor moves over the button, signaling that it is interactive.',
      },
      {
        name: 'Down',
        description: 'Activated while the button is being pressed, providing tactile feedback that the action is in progress.',
      },
      {
        name: 'Loading',
        description: 'Replaces the label with an animated ribbon to show that an action is processing and to prevent repeated input.',
      },
      {
        name: 'Chosen',
        description: 'Indicates a selected or active state, used for toggleable buttons or persistent actions.',
      },
      {
        name: 'Disabled',
        description: 'Visually muted and non-interactive, used when an action is unavailable or conditions are unmet.',
      },
    ],
    nestedComponents: [
      {
        name: 'Icon Container',
        description: 'The Icon Container is used to enhance clarity and scannability by visually reinforcing the button\'s purpose. Used to indicate an action, status, or direction.',
        link: '/brand-design/components/icon-container',
      },
    ],
    codeExamples: {
      installation: 'npm install @postcode-lottery/button',
      basic: `import { Button } from '@postcode-lottery/button'

<Button variant="primary" icon="arrow-right">
  Next step
</Button>`,
      advanced: [
        `// With loading state
<Button 
  variant="primary" 
  loading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</Button>`,
        `// With icon positioning
<Button 
  variant="secondary" 
  icon="download"
  iconPosition="left"
>
  Download
</Button>`,
      ],
    },
    contentGuidelines: {
      tone: 'Button labels should be action-oriented and concise. Use verbs that clearly communicate what will happen when the button is clicked.',
      labeling: 'Keep labels short (1-3 words). Use sentence case. Avoid ending with punctuation unless it\'s a question mark.',
      accessibility: 'Always provide an accessible label, even for icon-only buttons. Use aria-label for icon-only buttons.',
      examples: [
        'Good: "Get started", "Download now", "Learn more"',
        'Avoid: "Click here to get started", "Download the file now please"',
      ],
    },
  },
  // Add more components here as needed
}

export function generateStaticParams() {
  return [
    { slug: 'buttons' },
    { slug: 'links' },
    { slug: 'input' },
    { slug: 'modal' },
    { slug: 'notification' },
    { slug: 'tabs' },
  ]
}

export default function ComponentPage({ params }: { params: { slug: string } }) {
  const component = components[params.slug]

  if (!component) {
    notFound()
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div className="flex-1 max-w-3xl">
              <h1 className="text-5xl font-bold mb-4 text-[#E30027]">{component.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{component.description}</p>
            </div>
            {component.previewImage && (
              <div className="w-full md:w-auto">
                <img 
                  src={component.previewImage} 
                  alt={`${component.name} preview`}
                  className="rounded-lg border border-border"
                />
              </div>
            )}
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap gap-3 items-center">
            {component.status === 'available' && component.storybookLink && (
              <Badge variant="outline" className="bg-[#E7FBE5] text-[#007900] border-[#007900]">
                <Code className="h-4 w-4 mr-2" />
                <a 
                  href={component.storybookLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Available in Design System
                </a>
              </Badge>
            )}
            {component.wcagStatus === 'compliant' && (
              <Badge variant="outline" className="bg-[#E7FBE5] text-[#007900] border-[#007900]">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                WCAG 2.2 AA compliant
              </Badge>
            )}
            {component.wcagStatus === 'not-compliant' && (
              <Badge variant="outline" className="bg-[#FFEBEF] text-[#BB0020] border-[#BB0020]">
                <XCircle className="h-4 w-4 mr-2" />
                Not yet compliant
              </Badge>
            )}
            {component.jiraLink && (
              <Badge variant="outline" className="bg-[#EAF7FF] text-[#0050A5] border-[#0050A5]">
                <ExternalLink className="h-4 w-4 mr-2" />
                <a 
                  href={component.jiraLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Jira: DK-29
                </a>
              </Badge>
            )}
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Tabs */}
        <ComponentTabs component={component}>
          <TabsContent value="design" className="space-y-12">
            {/* Overview */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Palette className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-bold text-[#E30027]">Overview</h2>
              </div>
              <div className="space-y-4">
                {component.overview.purpose.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="h-5 w-5 rounded-full bg-[#0050A5] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Do's and Don'ts */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Palette className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-bold text-[#E30027]">Do's and Don'ts</h2>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Do's and Don'ts</h3>
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Do's */}
                  <div className="space-y-6">
                    {component.dosAndDonts.dos.map((item, index) => (
                      <div key={index} className="space-y-4">
                        <div className="relative">
                          <div className="bg-[#F3F3F3] border border-border rounded-lg p-20 flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                              <p className="text-sm">Component preview</p>
                              <p className="text-xs mt-1">Swap with a (local) component</p>
                            </div>
                          </div>
                          <Badge className="absolute top-4 left-4 bg-[#008900] text-white">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Do
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Don'ts */}
                  <div className="space-y-6">
                    {component.dosAndDonts.donts.map((item, index) => (
                      <div key={index} className="space-y-4">
                        <div className="relative">
                          <div className="bg-[#F3F3F3] border border-border rounded-lg p-20 flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                              <p className="text-sm">Component preview</p>
                              <p className="text-xs mt-1">Swap with a (local) component</p>
                            </div>
                          </div>
                          <Badge className="absolute top-4 left-4 bg-[#E30027] text-white">
                            <XCircle className="h-4 w-4 mr-2" />
                            Don't
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Variants */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Palette className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-bold text-[#E30027]">Variants</h2>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-6">Variants</h3>
                <div className="grid md:grid-cols-3 gap-10">
                  {component.variants.map((variant, index) => (
                    <div key={index} className="space-y-4">
                      <div className="bg-gray-95 border border-border rounded-lg p-20 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <p className="text-sm">Component preview</p>
                          <p className="text-xs mt-1">Swap with a (local) component</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">{variant.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{variant.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Nested Components */}
            {component.nestedComponents && component.nestedComponents.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Palette className="h-5 w-5" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#E30027]">Nested Components</h2>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-6">Nested Components</h3>
                  <div className="grid md:grid-cols-2 gap-10">
                    {component.nestedComponents.map((nested, index) => (
                      <div key={index} className="space-y-4">
                        <div className="bg-gray-95 border border-border rounded-lg p-20 flex items-center justify-center">
                          <div className="text-center text-muted-foreground">
                            <p className="text-sm">Component preview</p>
                            <p className="text-xs mt-1">Swap with a (local) component</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">{nested.name}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{nested.description}</p>
                          {nested.link && (
                            <Link 
                              href={nested.link}
                              className="text-[#0050A5] font-semibold text-sm hover:underline inline-flex items-center gap-1"
                            >
                              Icon Container component
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* States */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Palette className="h-5 w-5" />
                </div>
                <h2 className="text-3xl font-bold text-[#E30027]">States</h2>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-6">States</h3>
                <div className="grid md:grid-cols-3 gap-10">
                  {component.states.map((state, index) => (
                    <div key={index} className="space-y-4">
                      <div className="bg-gray-95 border border-border rounded-lg p-20 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <p className="text-sm">Component preview</p>
                          <p className="text-xs mt-1">Swap with a (local) component</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">{state.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{state.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="code" className="space-y-8">
            {component.storybookLink && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Storybook Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      View the full component documentation, props, and interactive examples in Storybook.
                    </p>
                    <Button asChild>
                      <a 
                        href={component.storybookLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        Open in Storybook
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {component.codeExamples && (
              <>
                {component.codeExamples.installation && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Installation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                        {component.codeExamples.installation}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {component.codeExamples.basic && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                        {component.codeExamples.basic}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {component.codeExamples.advanced && component.codeExamples.advanced.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Examples</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {component.codeExamples.advanced.map((example, index) => (
                        <div key={index} className="bg-muted rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                          {example}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {component.githubLink && (
              <Card>
                <CardHeader>
                  <CardTitle>Source Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" asChild>
                    <a 
                      href={component.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      View on GitHub
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="content" className="space-y-8">
            {component.contentGuidelines ? (
              <>
                {component.contentGuidelines.tone && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tone of Voice</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {component.contentGuidelines.tone}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {component.contentGuidelines.labeling && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Labeling Conventions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {component.contentGuidelines.labeling}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {component.contentGuidelines.accessibility && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Accessibility Considerations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {component.contentGuidelines.accessibility}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {component.contentGuidelines.examples && component.contentGuidelines.examples.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Examples</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {component.contentGuidelines.examples.map((example, index) => (
                          <li key={index} className="text-muted-foreground leading-relaxed">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">
                    Content guidelines for this component are coming soon.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </ComponentTabs>
      </div>
    </div>
  )
}

