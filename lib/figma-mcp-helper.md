# Figma MCP Integration Helper

Dit document beschrijft hoe je Figma designs via MCP kunt ophalen en weergeven.

## MCP Tools Beschikbaar

De volgende MCP tools zijn beschikbaar voor Figma integratie:

- `mcp_Figma_get_screenshot` - Haalt een screenshot op van een Figma node
- `mcp_Figma_get_design_context` - Haalt design context op (inclusief code)
- `mcp_Figma_PL_get_screenshot` - Haalt screenshot op met fileKey parameter

## Gebruik

Wanneer een Figma URL wordt gedetecteerd in de chat of bij het analyseren van een design:

1. Parse de Figma URL om `fileKey` en `nodeId` te extraheren
2. Roep de MCP tool aan om screenshots op te halen
3. Sla de image URLs op in de attachment/report data

## Voorbeeld Implementatie

```typescript
// In een server action of API route
import { parseFigmaUrl } from '@/lib/utils'

async function fetchFigmaScreenshots(figmaUrl: string) {
  const parsed = parseFigmaUrl(figmaUrl)
  if (!parsed || !parsed.fileKey) return null

  // Gebruik MCP tool om screenshot op te halen
  // Dit moet worden aangeroepen vanuit de agent context
  const screenshot = await mcp_Figma_get_screenshot({
    fileKey: parsed.fileKey,
    nodeId: parsed.nodeId
  })

  return {
    imageUrl: screenshot.imageUrl, // Full size
    thumbnailUrl: screenshot.thumbnailUrl // Thumbnail voor chat
  }
}
```

## Integratie in Componenten

De volgende componenten ondersteunen nu Figma image URLs:

- `components/brenda-sheet.tsx` - Toont thumbnails in chat
- `components/report-viewer.tsx` - Toont full size images in reports
- `lib/reports.ts` - Report interface ondersteunt `figmaImageUrl` en `figmaThumbnailUrl`

## Volgende Stappen

1. Implementeer MCP calls in `app/actions/analyzeFigma.ts`
2. Update attachment handling in `components/brenda-sheet.tsx` om MCP aan te roepen
3. Voeg error handling toe voor mislukte MCP calls
4. Voeg loading states toe tijdens het ophalen van screenshots


