'use client'

import { useState, useEffect } from 'react'
import { parseFigmaUrl } from './utils'

export interface FigmaScreenshot {
  imageUrl?: string
  thumbnailUrl?: string
  loading: boolean
  error?: string
}

/**
 * Hook to fetch Figma design screenshots
 * Note: This would ideally call MCP tools, but since MCP is only available
 * in agent context, we'll use a placeholder that can be replaced with
 * actual MCP integration when available
 */
export function useFigmaScreenshot(figmaUrl: string | null): FigmaScreenshot {
  const [screenshot, setScreenshot] = useState<FigmaScreenshot>({
    loading: false
  })

  useEffect(() => {
    if (!figmaUrl) {
      setScreenshot({ loading: false })
      return
    }

    const parsed = parseFigmaUrl(figmaUrl)
    if (!parsed || !parsed.fileKey) {
      setScreenshot({ loading: false, error: 'Invalid Figma URL' })
      return
    }

    // Set loading state
    setScreenshot({ loading: true })

    // TODO: Replace with actual MCP call
    // In production, this would call:
    // const result = await mcp_Figma_get_screenshot({
    //   fileKey: parsed.fileKey,
    //   nodeId: parsed.nodeId
    // })
    
    // For now, return placeholder
    // The actual MCP integration would happen in the component that uses this hook
    setScreenshot({
      loading: false,
      imageUrl: undefined, // Will be set by MCP
      thumbnailUrl: undefined // Will be set by MCP
    })
  }, [figmaUrl])

  return screenshot
}

