import { NextRequest, NextResponse } from 'next/server'
import { parseFigmaUrl } from '@/lib/utils'

/**
 * API route to fetch Figma design screenshots via MCP
 * This route can be called from client components to get Figma images
 */
export async function POST(request: NextRequest) {
  try {
    const { figmaUrl } = await request.json()
    
    if (!figmaUrl) {
      return NextResponse.json(
        { error: 'Figma URL is required' },
        { status: 400 }
      )
    }

    const parsed = parseFigmaUrl(figmaUrl)
    if (!parsed || !parsed.fileKey) {
      return NextResponse.json(
        { error: 'Invalid Figma URL' },
        { status: 400 }
      )
    }

    // Extract nodeId from URL if present
    const nodeId = parsed.nodeId || undefined

    // Note: MCP tools need to be called from the agent context
    // For now, return a structure that indicates MCP integration is needed
    // In production, this would call the Figma MCP server
    
    return NextResponse.json({
      success: true,
      data: {
        fileKey: parsed.fileKey,
        nodeId: nodeId,
        // These would be populated by MCP get_screenshot calls
        // For now, return placeholder structure
        imageUrl: null,
        thumbnailUrl: null,
        name: 'Figma Design'
      },
      message: 'MCP integration pending - use MCP tools to fetch screenshots'
    })
  } catch (error) {
    console.error('Error in Figma API route:', error)
    return NextResponse.json(
      { error: 'Failed to process Figma URL' },
      { status: 500 }
    )
  }
}

