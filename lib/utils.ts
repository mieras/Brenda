import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get the correct asset path for static exports (GitHub Pages)
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${basePath}${path}`
}

export function isValidFigmaUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.hostname.includes('figma.com') &&
           (parsed.pathname.includes('/design/') || parsed.pathname.includes('/file/'))
  } catch {
    return false
  }
}

export function parseFigmaUrl(url: string): { fileKey?: string; nodeId?: string } | null {
  if (!isValidFigmaUrl(url)) return null

  try {
    const parsed = new URL(url)
    const pathParts = parsed.pathname.split('/')
    const fileKeyIndex = pathParts.findIndex(part => part === 'design' || part === 'file')

    if (fileKeyIndex === -1) return null

    const fileKey = pathParts[fileKeyIndex + 1]
    const nodeId = parsed.searchParams.get('node-id')?.replace(/-/g, ':')

    return { fileKey, nodeId: nodeId || undefined }
  } catch {
    return null
  }
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
  return validTypes.includes(file.type)
}

export function isValidPdfFile(file: File): boolean {
  return file.type === 'application/pdf'
}

export function getCurrentPageContext(): string {
  if (typeof window === 'undefined') return ''

  const path = window.location.pathname
  if (path.startsWith('/guidelines/')) {
    return path.replace('/guidelines/', '').replace(/-/g, ' ')
  }
  return 'homepage'
}
