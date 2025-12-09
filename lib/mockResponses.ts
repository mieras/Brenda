import { generateMockScanReport } from './designAnalysis'

export function getWelcomeMessage(role: string | null): string {
  const roleGreeting = role 
    ? `Hi there! I'm Brenda, your AI Brand Quality Assistant. I see you're a ${role}. `
    : "Hi there! I'm Brenda, your AI Brand Quality Assistant. "
  
  return `${roleGreeting}I'm here to help you create consistent, on-brand designs. You can ask me questions about brand guidelines, upload a design for review, or paste a Figma link. How can I help you today?`
}

export function getResponse(
  input: string,
  role: string | null,
  file?: File | string
): string {
  const lowerInput = input.toLowerCase()

  // Design check responses
  if (file || lowerInput.includes('check') || lowerInput.includes('review') || lowerInput.includes('analyze')) {
    if (file) {
      const report = generateMockScanReport(file)
      return `I've analyzed your design! Here's what I found:\n\n${report}`
    }
    return "I'd be happy to review your design! Please upload an image (PNG, JPG) or paste a Figma URL, and I'll analyze it for brand compliance, design tokens, accessibility, and more."
  }

  // Guideline questions
  if (lowerInput.includes('logo')) {
    return "Our logo usage guidelines ensure consistent brand recognition. The logo should always be placed on approved background colors and maintain proper spacing. Would you like me to check a specific design for logo compliance?"
  }

  if (lowerInput.includes('color') || lowerInput.includes('colour')) {
    return "Our color palette is carefully curated to maintain brand consistency. Make sure to use approved brand colors from our design tokens. I can validate color usage in your designs - just upload or share a Figma link!"
  }

  if (lowerInput.includes('spacing')) {
    return "Consistent spacing is key to our brand identity. We use a systematic spacing scale based on design tokens. Would you like me to review the spacing in your design?"
  }

  if (lowerInput.includes('typography') || lowerInput.includes('font')) {
    return "Typography plays a crucial role in our brand voice. We have specific type scales and font weights that should be used consistently. I can help validate typography in your designs!"
  }

  if (lowerInput.includes('accessibility')) {
    return "Accessibility is a core principle. All designs should meet WCAG 2.1 AA standards, including proper contrast ratios and semantic structure. I can check your designs for accessibility compliance."
  }

  if (lowerInput.includes('tone') || lowerInput.includes('voice')) {
    return "Our brand voice is warm, friendly, and empowering. Copy should be simple, active, and focus on value. I can review your copywriting for tone consistency!"
  }

  // Default response
  return "I'm here to help with brand guidelines, design validation, and answering questions about our brand standards. You can ask me about logos, colors, typography, spacing, accessibility, or upload a design for review. What would you like to know?"
}


