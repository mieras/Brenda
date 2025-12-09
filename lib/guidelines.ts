export interface Guideline {
  slug: string
  title: string
  content: string
}

export const guidelines: Guideline[] = [
  {
    slug: 'our-logos',
    title: 'Our Logos',
    content: 'Our logo is the cornerstone of our brand identity. It should always be used with approved background colors and maintain proper spacing. Never distort, rotate, or modify the logo in any way.'
  },
  {
    slug: 'colour-palette',
    title: 'Colour Palette',
    content: 'Our color palette has been carefully selected to represent our brand values. Always use approved brand colors from our design tokens. Unapproved colors can dilute our brand recognition.'
  },
  {
    slug: 'typography',
    title: 'Typography',
    content: 'Typography plays a crucial role in communicating our brand voice. We use a systematic type scale that ensures consistency across all touchpoints. Avoid using italic text for emphasis.'
  },
  {
    slug: 'supporting-graphic-elements',
    title: 'Supporting Graphic Elements',
    content: 'Supporting graphic elements like patterns, shapes, and decorative elements should complement, not compete with, our primary brand elements.'
  },
  {
    slug: 'icons',
    title: 'Icons',
    content: 'Icons should be consistent with our design system. Use approved icon sets and maintain consistent sizing and styling.'
  },
  {
    slug: 'photography',
    title: 'Photography',
    content: 'Photography should feel welcoming and authentic. Use images that align with our brand values and maintain consistent visual style.'
  },
  {
    slug: 'the-power-of-brenda',
    title: 'The Power of Brenda',
    content: 'Brenda represents our commitment to helping people. Our messaging should always be warm, friendly, and empowering.'
  }
]

export function getGuidelineBySlug(slug: string): Guideline | undefined {
  return guidelines.find(g => g.slug === slug)
}


