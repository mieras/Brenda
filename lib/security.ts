/**
 * Security utilities for file handling
 */

/**
 * Basic SVG sanitization check
 * In Fase B, use a proper SVG sanitizer library
 */
export function isSVGSafe(svgContent: string): boolean {
  // Block common attack vectors
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /<iframe/i,
    /<embed/i,
    /<object/i
  ]

  return !dangerousPatterns.some(pattern => pattern.test(svgContent))
}

/**
 * Basic PDF validation
 * In Fase B, use proper PDF parsing library
 */
export function isPDFSafe(file: File): Promise<boolean> {
  // For prototype, just check MIME type
  // In Fase B, parse PDF structure and check for malicious content
  return Promise.resolve(file.type === 'application/pdf')
}

