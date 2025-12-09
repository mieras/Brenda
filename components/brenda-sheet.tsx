'use client'

import { useState, useRef, useEffect, useCallback, DragEvent, ReactNode } from 'react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Badge } from '@/components/ui/badge'
import { 
  Send, 
  Upload, 
  Palette, 
  Type, 
  Layout, 
  Accessibility,
  Wand2,
  MessageSquare,
  ImageIcon,
  X,
  ExternalLink,
  Figma,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight
} from 'lucide-react'
import { cn, getAssetPath } from '@/lib/utils'
import { useChat } from '@/lib/chat-context'
import { useReports } from '@/lib/report-context'
import { getResponse, getWelcomeMessage } from '@/lib/mockResponses'
import { Report, Finding } from '@/lib/reports'

// Parse markdown-style links and bold text in message content
function parseMessageContent(content: string, onLinkClick?: () => void): ReactNode[] {
  const parts: ReactNode[] = []
  // Match [text](url) pattern and **bold** pattern
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match
  let key = 0

  while ((match = regex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index))
    }

    if (match[1] && match[2]) {
      // It's a link [text](url)
      const isInternal = match[2].startsWith('/')
      if (isInternal) {
        parts.push(
          <Link 
            key={key++} 
            href={match[2]} 
            onClick={onLinkClick}
            className="text-primary hover:underline font-medium"
          >
            {match[1]}
          </Link>
        )
      } else {
        parts.push(
          <a 
            key={key++} 
            href={match[2]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            {match[1]}
          </a>
        )
      }
    } else if (match[3]) {
      // It's bold **text**
      parts.push(<strong key={key++}>{match[3]}</strong>)
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [content]
}

// Figma URL pattern
const FIGMA_URL_REGEX = /https?:\/\/(www\.)?figma\.com\/(file|design|proto)\/([a-zA-Z0-9]+)/

// Local parseFigmaUrl function as fallback (in case import fails)
function parseFigmaUrlLocal(url: string): { fileKey?: string; nodeId?: string } | null {
  try {
    const parsed = new URL(url)
    if (!parsed.hostname.includes('figma.com')) return null
    
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

interface Attachment {
  type: 'image' | 'figma'
  url: string
  name?: string
  preview?: string
  thumbnailUrl?: string // For Figma designs
  imageUrl?: string // Full size image for Figma
}

interface AnalysisResult {
  reportId: string
  score: number
  highlights: {
    status: 'pass' | 'warning' | 'fail'
    text: string
  }[]
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  attachment?: Attachment
  analysis?: AnalysisResult
  links?: GuidelineLink[]
  cta?: string
}

const roles = [
  { id: 'designer', label: 'Designer' },
  { id: 'developer', label: 'Developer' },
  { id: 'content', label: 'Content' },
  { id: 'brand', label: 'Brand' },
  { id: 'agency', label: 'Agency' },
]

interface GuidelineLink {
  title: string
  description: string
  href: string
  icon: typeof Layout
}

interface Starter {
  text: string
  icon: typeof Layout
  roles: string[]
  response: string
  links?: GuidelineLink[]
  cta?: string
}

const starters: Starter[] = [
  { 
    text: 'Check my spacing', 
    icon: Layout, 
    roles: ['designer', 'developer'],
    response: "I'd love to help check your spacing! Our spacing system is based on an 8px grid with tokens like --space-xs (4px), --space-s (8px), --space-m (16px), and --space-l (24px).",
    links: [
      { title: 'Typography & Spacing', description: 'Type scale & vertical rhythm', href: '/guidelines/typography', icon: Type },
      { title: 'Graphic Elements', description: 'Patterns & layout grids', href: '/guidelines/supporting-graphic-elements', icon: Layout },
    ],
    cta: "Do you have a design you'd like me to review? Upload an image or paste a Figma link!"
  },
  { 
    text: 'Validate colors', 
    icon: Palette, 
    roles: ['designer', 'developer'],
    response: "Great, let's make sure your colors are on-brand! Our primary palette includes Blue (#0050A5), Red (#BB0020), Green (#008900), and Yellow (#FFB800).",
    links: [
      { title: 'Colour Palette', description: 'Primary & secondary colors', href: '/guidelines/colour-palette', icon: Palette },
      { title: 'Accessibility', description: 'Contrast requirements', href: '/guidelines/typography', icon: Accessibility },
    ],
    cta: "Want me to analyze your design? Upload an image or paste your Figma link!"
  },
  { 
    text: 'Review accessibility', 
    icon: Accessibility, 
    roles: ['designer', 'developer', 'brand'],
    response: "Accessibility is crucial for inclusive design! I can check color contrast (WCAG AA/AAA), touch targets (44x44px minimum), text readability, and focus states.",
    links: [
      { title: 'Typography', description: 'Accessible type scale', href: '/guidelines/typography', icon: Type },
      { title: 'Colour Palette', description: 'Contrast guidelines', href: '/guidelines/colour-palette', icon: Palette },
      { title: 'Icons', description: 'Touch target sizes', href: '/guidelines/icons', icon: Accessibility },
    ],
    cta: "Share your design with me and I'll run a full accessibility review!"
  },
  { 
    text: 'Improve copy tone', 
    icon: Type, 
    roles: ['content', 'brand'],
    response: "I can help you nail our brand voice! Our tone is warm & friendly, clear & simple, optimistic & encouraging, and always human - never robotic.",
    links: [
      { title: 'Typography', description: 'Voice & tone guidelines', href: '/guidelines/typography', icon: Type },
      { title: 'The Power of Brenda', description: 'Brand personality', href: '/guidelines/the-power-of-brenda', icon: MessageSquare },
    ],
    cta: "Share your copy or design and I'll give you suggestions to make it more on-brand!"
  },
  { 
    text: 'Analyze design', 
    icon: Wand2, 
    roles: ['designer', 'content', 'agency'],
    response: "I'll give your design a full brand compliance check! I review logo usage, colors, spacing, typography, and accessibility.",
    links: [
      { title: 'Our Logos', description: 'Logo placement & clear space', href: '/guidelines/our-logos', icon: Layout },
      { title: 'Colour Palette', description: 'Brand color compliance', href: '/guidelines/colour-palette', icon: Palette },
      { title: 'Typography', description: 'Type scale & hierarchy', href: '/guidelines/typography', icon: Type },
    ],
    cta: "Ready when you are! Upload your design or paste a Figma link to get started."
  },
  { 
    text: 'Explain guideline', 
    icon: MessageSquare, 
    roles: ['designer', 'developer', 'content', 'brand', 'agency'],
    response: "I'm happy to explain any of our brand guidelines! Here are the most popular topics:",
    links: [
      { title: 'Our Logos', description: 'Usage rules & clear space', href: '/guidelines/our-logos', icon: Layout },
      { title: 'Colour Palette', description: 'Primary & secondary colors', href: '/guidelines/colour-palette', icon: Palette },
      { title: 'Typography', description: 'Fonts & type scale', href: '/guidelines/typography', icon: Type },
      { title: 'Icons', description: 'Icon library & usage', href: '/guidelines/icons', icon: Wand2 },
      { title: 'Graphic Elements', description: 'Patterns & shapes', href: '/guidelines/supporting-graphic-elements', icon: Layout },
    ],
    cta: "Just ask your question, or share a design scenario with me!"
  },
]

// Truncate Figma URL for display
function truncateFigmaUrl(url: string): string {
  const match = url.match(FIGMA_URL_REGEX)
  if (match) {
    const fileId = match[3]
    return `figma.com/${fileId.substring(0, 8)}...`
  }
  return url.length > 30 ? url.substring(0, 30) + '...' : url
}

// Check if text contains a Figma URL
function extractFigmaUrl(text: string): string | null {
  const match = text.match(FIGMA_URL_REGEX)
  return match ? match[0] : null
}

/**
 * Fetch Figma screenshot using MCP tools
 * This function will be called by the agent to get Figma design screenshots
 */
async function fetchFigmaScreenshotViaMCP(figmaUrl: string): Promise<{ imageUrl?: string; thumbnailUrl?: string } | null> {
  const parsed = parseFigmaUrlLocal(figmaUrl)
  if (!parsed || !parsed.fileKey) return null

  try {
    // This function will be called by the agent using MCP tools
    // The MCP tool mcp_Figma_PL_get_screenshot will be used here
    // For now, return null to indicate MCP integration is needed
    // In production, this would be:
    // const result = await mcp_Figma_PL_get_screenshot({
    //   fileKey: parsed.fileKey,
    //   nodeId: parsed.nodeId
    // })
    // return {
    //   imageUrl: result.imageUrl,
    //   thumbnailUrl: result.thumbnailUrl
    // }
    
    return null
  } catch (error) {
    console.error('Error fetching Figma screenshot via MCP:', error)
    return null
  }
}

// Generate a mock report from an attachment
function generateMockReport(attachment: Attachment): Report {
  const reportId = `report-${Date.now()}`
  const isFigma = attachment.type === 'figma'
  
  const findings: Finding[] = [
    {
      id: `${reportId}-f1`,
      category: 'Logo Usage',
      title: isFigma ? 'Logo placement correct' : 'Logo placement needs attention',
      description: isFigma 
        ? 'The logo is correctly positioned with proper clear space.'
        : 'The logo appears to be placed on an unapproved background color.',
      status: isFigma ? 'pass' : 'fail',
      suggestion: isFigma ? undefined : 'Move the logo to an approved background area.',
      guidelineLink: '/guidelines/our-logos'
    },
    {
      id: `${reportId}-f2`,
      category: 'Color',
      title: 'Brand colors in use',
      description: 'Primary brand colors are being used throughout the design.',
      status: 'pass'
    },
    {
      id: `${reportId}-f3`,
      category: 'Typography',
      title: 'Font weight variation',
      description: 'Consider using bolder weights for headings to improve hierarchy.',
      status: 'warning',
      suggestion: 'Use font-weight 600 or 700 for headings.',
      guidelineLink: '/guidelines/typography'
    },
    {
      id: `${reportId}-f4`,
      category: 'Spacing',
      title: 'Consistent spacing applied',
      description: 'Spacing follows our 8px grid system.',
      status: 'pass'
    },
    {
      id: `${reportId}-f5`,
      category: 'Accessibility',
      title: 'Contrast ratios adequate',
      description: 'Text contrast meets WCAG AA standards.',
      status: 'pass'
    }
  ]

  const passed = findings.filter(f => f.status === 'pass').length
  const warnings = findings.filter(f => f.status === 'warning').length
  const failed = findings.filter(f => f.status === 'fail').length
  const score = Math.round((passed / findings.length) * 100 - (failed * 10) - (warnings * 5))

  return {
    id: reportId,
    createdAt: new Date(),
    fileName: attachment.name || (isFigma ? 'Figma design' : 'Uploaded image'),
    fileType: attachment.type,
    fileUrl: attachment.preview || attachment.url, // Use preview if available (for uploaded images)
    figmaUrl: isFigma ? attachment.url : undefined,
    figmaImageUrl: isFigma ? attachment.imageUrl : undefined,
    figmaThumbnailUrl: isFigma ? attachment.thumbnailUrl : undefined,
    summary: {
      passed,
      warnings,
      failed,
      score: Math.max(0, Math.min(100, score))
    },
    findings,
    chatHistory: []
  }
}

export default function BrendaSheet() {
  const { isOpen: open, closeChat } = useChat()
  const { openReportData } = useReports()
  const onOpenChange = (newOpen: boolean) => {
    if (!newOpen) closeChat()
  }
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [pendingAttachment, setPendingAttachment] = useState<Attachment | null>(null)
  const [currentReport, setCurrentReport] = useState<Report | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: getWelcomeMessage(selectedRole || null)
      }])
    }
  }, [open])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when sheet opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  // Check for Figma URL in input
  useEffect(() => {
    const figmaUrl = extractFigmaUrl(input)
    if (figmaUrl && !pendingAttachment) {
      setPendingAttachment({
        type: 'figma',
        url: figmaUrl,
        name: truncateFigmaUrl(figmaUrl)
      })
    } else if (!figmaUrl && pendingAttachment?.type === 'figma') {
      setPendingAttachment(null)
    }
  }, [input, pendingAttachment])

  const handleViewFullReport = (reportId: string) => {
    if (currentReport && currentReport.id === reportId) {
      closeChat()
      openReportData(currentReport)
    }
  }

  const handleSend = async () => {
    if (!input.trim() && !pendingAttachment) return

    const userMessage = input.trim() || (pendingAttachment ? 'Check this design' : '')
    let attachment = pendingAttachment
    
    setInput('')
    setPendingAttachment(null)
    
    // If it's a Figma attachment, prepare for MCP screenshot fetch
    if (attachment?.type === 'figma') {
      const parsed = parseFigmaUrlLocal(attachment.url)
      if (parsed && parsed.fileKey) {
        // Structure attachment to support MCP screenshots
        // MCP tools will be called by the agent to populate imageUrl and thumbnailUrl
        attachment = {
          ...attachment,
          imageUrl: undefined, // Will be populated by MCP mcp_Figma_PL_get_screenshot
          thumbnailUrl: undefined // Will be populated by MCP
        }
      }
    }
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage, attachment: attachment || undefined }])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      if (attachment) {
        // Generate a report for the attachment
        const report = generateMockReport(attachment)
        setCurrentReport(report)

        // Create highlights from report findings
        const highlights = report.findings
          .filter(f => f.status !== 'pass')
          .slice(0, 3)
          .map(f => ({
            status: f.status,
            text: f.title
          }))

        // Add some passing items too
        const passItems = report.findings
          .filter(f => f.status === 'pass')
          .slice(0, 2)
          .map(f => ({
            status: f.status as 'pass' | 'warning' | 'fail',
            text: f.title
          }))

        const allHighlights = [...highlights, ...passItems]

        const analysis: AnalysisResult = {
          reportId: report.id,
          score: report.summary.score,
          highlights: allHighlights
        }

        const response = attachment.type === 'figma' 
          ? "I've analyzed your Figma design. Here are the key findings:"
          : "I've analyzed your uploaded design. Here are the key findings:"

        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response,
          analysis
        }])
      } else {
        const response = getResponse(userMessage, selectedRole || null)
        setMessages(prev => [...prev, { role: 'assistant', content: response }])
      }
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleStarterClick = (starter: Starter) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: starter.text }])
    setIsTyping(true)
    
    // Simulate typing delay then add Brenda's response with links
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: starter.response,
        links: starter.links,
        cta: starter.cta
      }])
      setIsTyping(false)
    }, 800 + Math.random() * 400)
  }

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      return // Only accept images
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      setPendingAttachment({
        type: 'image',
        url: e.target?.result as string,
        name: file.name,
        preview: e.target?.result as string
      })
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [handleFileSelect])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile()
          if (file) {
            handleFileSelect(file)
            e.preventDefault()
            return
          }
        }
      }
    }
  }, [handleFileSelect])

  const filteredStarters = selectedRole
    ? starters.filter(s => s.roles.includes(selectedRole))
    : starters

  const StatusIcon = ({ status }: { status: 'pass' | 'warning' | 'fail' }) => {
    switch (status) {
      case 'pass': return <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
      case 'warning': return <AlertTriangle className="h-3.5 w-3.5 text-yellow-600" />
      case 'fail': return <XCircle className="h-3.5 w-3.5 text-red-600" />
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className="h-full flex flex-col p-0 sm:rounded-l-xl sm:max-w-lg"
        style={{ maxHeight: '100dvh' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drop overlay */}
        {isDragging && (
          <div className="absolute inset-0 z-50 bg-primary/10 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-primary rounded-xl m-2">
            <div className="text-center">
              <Upload className="h-12 w-12 mx-auto text-primary mb-2" />
              <p className="text-lg font-medium text-primary">Drop your image here</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, GIF supported</p>
            </div>
          </div>
        )}

        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-amber-200 dark:border-amber-800">
              <AvatarImage src={getAssetPath('/images/brenda-avatar.png')} alt="Brenda" className="object-cover object-top" />
              <AvatarFallback className="bg-amber-100 text-amber-800">B</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-left">Chat with Brenda</SheetTitle>
              <SheetDescription className="text-left">
                Your AI brand buddy & art director
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Role Filter */}
        <div className="px-6 py-3 border-b bg-muted/30">
          <p className="text-xs text-muted-foreground mb-2">I&apos;m a...</p>
          <ToggleGroup
            type="single"
            value={selectedRole}
            onValueChange={setSelectedRole}
            className="flex flex-wrap gap-1"
          >
            {roles.map((role) => (
              <ToggleGroupItem
                key={role.id}
                value={role.id}
                size="sm"
                className="text-xs px-3 py-1 h-7 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {role.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 min-w-0" ref={scrollRef}>
          <div className="py-4 space-y-4 min-w-0">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3 animate-in slide-in-from-bottom-2",
                  message.role === 'user' ? "flex-row-reverse" : ""
                )}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  {message.role === 'assistant' ? (
                    <>
                      <AvatarImage src={getAssetPath('/images/brenda-avatar.png')} alt="Brenda" className="object-cover object-top" />
                      <AvatarFallback className="bg-amber-100 text-amber-800">B</AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  {/* Attachment */}
                  {message.attachment && (
                    <div className={cn(
                      "rounded-xl overflow-hidden w-full",
                      message.role === 'user' ? "bg-primary/90" : "bg-muted"
                    )}>
                      {message.attachment.type === 'image' ? (
                        <img 
                          src={message.attachment.preview || message.attachment.url} 
                          alt="Uploaded" 
                          className="w-full max-h-48 object-cover"
                        />
                      ) : message.attachment.type === 'figma' ? (
                        <div className="relative group w-full">
                          {message.attachment.thumbnailUrl ? (
                            <>
                              <img 
                                src={message.attachment.thumbnailUrl}
                                alt="Figma Design"
                                className="w-full max-h-48 object-cover"
                              />
                              <a
                                href={message.attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <div className="flex items-center gap-2 px-3 py-2 bg-black/70 rounded-lg text-white text-sm">
                                  <ExternalLink className="h-4 w-4" />
                                  <span>Open in Figma</span>
                                </div>
                              </a>
                            </>
                          ) : (
                            <a 
                              href={message.attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm hover:opacity-80 transition-opacity",
                                message.role === 'user' ? "text-primary-foreground" : "text-foreground"
                              )}
                            >
                              <Figma className="h-4 w-4 shrink-0" />
                              <span className="truncate">{message.attachment.name}</span>
                              <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                            </a>
                          )}
                        </div>
                      ) : null}
                    </div>
                  )}
                  {/* Message content */}
                  {message.content && (
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere",
                        message.role === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {message.content}
                    </div>
                  )}
                  {/* Link Cards */}
                  {message.links && message.links.length > 0 && (
                    <div className="w-full">
                      <div className="flex flex-wrap gap-2">
                        {message.links.map((link, linkIdx) => {
                          const LinkIcon = link.icon
                          return (
                            <Link
                              key={linkIdx}
                              href={link.href}
                              onClick={closeChat}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group w-full sm:w-auto sm:min-w-[160px]"
                            >
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                <LinkIcon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{link.title}</p>
                                <p className="text-xs text-muted-foreground truncate">{link.description}</p>
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-auto" />
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {/* CTA */}
                  {message.cta && (
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl px-4 py-3 border border-primary/20">
                      <p className="text-sm text-muted-foreground">{message.cta}</p>
                    </div>
                  )}
                  {/* Analysis Results */}
                  {message.analysis && (
                    <div className="bg-card border rounded-xl p-3 space-y-3">
                      {/* Score */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Brand Score</span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "font-bold",
                            message.analysis.score >= 80 ? "border-green-500 text-green-600" :
                            message.analysis.score >= 60 ? "border-yellow-500 text-yellow-600" :
                            "border-red-500 text-red-600"
                          )}
                        >
                          {message.analysis.score}/100
                        </Badge>
                      </div>
                      
                      {/* Highlights */}
                      <div className="space-y-1.5">
                        {message.analysis.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <StatusIcon status={h.status} />
                            <span className="text-muted-foreground">{h.text}</span>
                          </div>
                        ))}
                      </div>

                      {/* View Full Report Button */}
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="w-full gap-2"
                        onClick={() => handleViewFullReport(message.analysis!.reportId)}
                      >
                        View full report
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 animate-in slide-in-from-bottom-2">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={getAssetPath('/images/brenda-avatar.png')} alt="Brenda" className="object-cover object-top" />
                  <AvatarFallback className="bg-amber-100 text-amber-800">B</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Conversation Starters */}
        <div className="px-6 py-3 border-t bg-muted/30 min-w-0">
          <div className="flex flex-wrap gap-2">
            {filteredStarters.slice(0, 4).map((starter) => {
              const Icon = starter.icon
              return (
                <button
                  key={starter.text}
                  onClick={() => handleStarterClick(starter)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full border border-[#0050A5] text-[#0050A5] bg-white dark:bg-background dark:border-[#0050A5] dark:text-[#0050A5] hover:bg-[#0050A5]/5 dark:hover:bg-[#0050A5]/10 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{starter.text}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Pending Attachment Preview */}
        {pendingAttachment && (
          <div className="px-6 py-2 border-t bg-muted/50 min-w-0">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-background border min-w-0">
              {pendingAttachment.type === 'image' ? (
                <>
                  <img 
                    src={pendingAttachment.preview} 
                    alt="Preview" 
                    className="h-12 w-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{pendingAttachment.name}</p>
                    <p className="text-xs text-muted-foreground">Ready to send</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                    <Figma className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{pendingAttachment.name}</p>
                    <p className="text-xs text-muted-foreground">Figma design detected</p>
                  </div>
                </>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 shrink-0"
                onClick={() => setPendingAttachment(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-6 py-4 border-t min-w-0">
          <div className="flex gap-2 min-w-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileSelect(file)
                e.target.value = ''
              }}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              onPaste={handlePaste}
              placeholder="Ask Brenda anything... or paste a Figma URL"
              className="flex-1 min-w-0"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() && !pendingAttachment}
              size="icon"
              className="h-10 w-10 shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
