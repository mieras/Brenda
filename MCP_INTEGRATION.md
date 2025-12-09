# Figma MCP Integration Guide

## Overzicht

De code is nu klaar om Figma designs via MCP te tonen. Wanneer een gebruiker een Figma URL invoert, kunnen MCP tools worden gebruikt om screenshots op te halen die worden getoond in:
- **Chat**: Thumbnail preview
- **Report**: Full size image

## Huidige Status

✅ **Geïmplementeerd:**
- Report interface ondersteunt `figmaImageUrl` en `figmaThumbnailUrl`
- Attachment interface ondersteunt `thumbnailUrl` en `imageUrl`
- Chat rendering toont Figma thumbnails met hover effect
- Report viewer toont full size Figma images
- Code structuur klaar voor MCP integratie

⏳ **Nog te doen:**
- MCP tools direct aanroepen in `handleSend` functie
- Error handling voor mislukte MCP calls
- Loading states tijdens screenshot ophalen

## Hoe MCP Tools Gebruiken

### Stap 1: Detecteer Figma URL

Wanneer een gebruiker een Figma URL invoert, wordt deze automatisch gedetecteerd:

```typescript
const figmaUrl = extractFigmaUrl(input)
if (figmaUrl) {
  const parsed = parseFigmaUrl(figmaUrl)
  // parsed.fileKey en parsed.nodeId zijn nu beschikbaar
}
```

### Stap 2: Roep MCP Tool Aan

Gebruik de MCP tool om screenshot op te halen:

```typescript
// In agent context (niet in client code)
const screenshot = await mcp_Figma_PL_get_screenshot({
  fileKey: parsed.fileKey,
  nodeId: parsed.nodeId,
  clientLanguages: 'typescript',
  clientFrameworks: 'react'
})
```

### Stap 3: Update Attachment

Voeg de screenshot URLs toe aan de attachment:

```typescript
attachment = {
  ...attachment,
  imageUrl: screenshot.imageUrl, // Full size voor report
  thumbnailUrl: screenshot.thumbnailUrl || screenshot.imageUrl // Thumbnail voor chat
}
```

### Stap 4: Update Message

De attachment wordt automatisch getoond in de chat en report met de screenshots.

## Implementatie Voorbeeld

Hier is een complete implementatie voorbeeld voor de `handleSend` functie:

```typescript
const handleSend = async () => {
  // ... existing code ...
  
  if (attachment?.type === 'figma') {
    const parsed = parseFigmaUrl(attachment.url)
    if (parsed && parsed.fileKey) {
      try {
        // Roep MCP tool aan (alleen beschikbaar in agent context)
        const screenshot = await mcp_Figma_PL_get_screenshot({
          fileKey: parsed.fileKey,
          nodeId: parsed.nodeId,
          clientLanguages: 'typescript',
          clientFrameworks: 'react'
        })
        
        if (screenshot) {
          // Update attachment met screenshot URLs
          attachment = {
            ...attachment,
            imageUrl: screenshot.imageUrl,
            thumbnailUrl: screenshot.thumbnailUrl || screenshot.imageUrl
          }
        }
      } catch (error) {
        console.error('Error fetching Figma screenshot:', error)
        // Continue zonder screenshot
      }
    }
  }
  
  // ... rest of code ...
}
```

## MCP Tools Beschikbaar

De volgende MCP tools kunnen worden gebruikt:

- `mcp_Figma_PL_get_screenshot` - Haalt screenshot op met fileKey en nodeId
- `mcp_Figma_get_screenshot` - Haalt screenshot op (andere API)
- `mcp_Figma_get_design_context` - Haalt design context op

## Error Handling

Voeg error handling toe voor:
- Ongeldige Figma URLs
- Mislukte MCP calls
- Ontbrekende screenshots
- Network errors

## Loading States

Voeg loading states toe:
- Toon "Loading screenshot..." tijdens MCP call
- Update attachment wanneer screenshot beschikbaar is
- Fallback naar placeholder als screenshot niet beschikbaar is

## Volgende Stappen

1. ✅ Code structuur klaar
2. ⏳ MCP calls toevoegen in `handleSend`
3. ⏳ Error handling implementeren
4. ⏳ Loading states toevoegen
5. ⏳ Testen met echte Figma URLs

