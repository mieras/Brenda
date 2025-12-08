export interface ScanReportItem {
  category: string
  finding: string
  status: 'needs-attention' | 'almost-there' | 'on-brand'
}

export function generateMockScanReport(file: File | string): string {
  const isFigma = typeof file === 'string'
  const fileName = typeof file === 'string' ? 'Figma design' : file.name

  const report: ScanReportItem[] = [
    {
      category: 'Logo Usage',
      finding: 'Logo placed on unapproved background color',
      status: 'needs-attention'
    },
    {
      category: 'Color',
      finding: 'Unapproved top banner color used',
      status: 'needs-attention'
    },
    {
      category: 'Spacings',
      finding: 'Too much space above and below logo in banner',
      status: 'almost-there'
    },
    {
      category: 'Typography styles',
      finding: 'It is recommended to avoid using italic text',
      status: 'almost-there'
    },
    {
      category: 'Emotional resonance',
      finding: 'Vibrant imagery with focus on value',
      status: 'on-brand'
    },
    {
      category: 'Imagery',
      finding: 'Welcoming image of our ambassador',
      status: 'on-brand'
    },
    {
      category: 'Copywriting',
      finding: 'Simple key message and active wording',
      status: 'on-brand'
    },
    {
      category: 'Brand asset usage',
      finding: 'Uses approved assets like confetti and check',
      status: 'on-brand'
    },
    {
      category: 'Accessibility',
      finding: 'Meets WCAG 2.3 requirements',
      status: 'on-brand'
    }
  ]

  const statusLabels = {
    'needs-attention': '⚠️ Needs attention',
    'almost-there': '🟡 Almost there',
    'on-brand': '✅ On-brand'
  }

  let reportText = `**Design Scan Report for ${fileName}**\n\n`
  
  report.forEach((item) => {
    reportText += `${statusLabels[item.status]} **${item.category}**: ${item.finding}\n\n`
  })

  reportText += '\nWould you like me to expand on any of these findings or help you fix the issues?'

  return reportText
}

