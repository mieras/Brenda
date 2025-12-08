/**
 * Extract CSS variables from tokens.css
 * This extracts only the :root CSS variables (lines 8341+)
 */

export function extractCSSVariables(cssContent: string): string {
  // Extract all CSS variable definitions from :root blocks
  const rootMatches = cssContent.match(/:root\s*\{([^}]+)\}/g)
  if (!rootMatches) return ''

  let variables = ''
  rootMatches.forEach(match => {
    // Extract variable definitions (--variable-name: value;)
    const varMatches = match.match(/--[a-z0-9-]+:\s*[^;]+;/g)
    if (varMatches) {
      variables += varMatches.join('\n') + '\n'
    }
  })

  return variables
}

