'use client'

import { useState, useRef, useEffect, useCallback, DragEvent } from 'react'
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
  Figma
} from 'lucide-react'
import { cn, getAssetPath } from '@/lib/utils'
import { useChat } from '@/lib/chat-context'
import { getResponse, getWelcomeMessage } from '@/lib/mockResponses'

// Figma URL pattern
const FIGMA_URL_REGEX = /https?:\/\/(www\.)?figma\.com\/(file|design|proto)\/([a-zA-Z0-9]+)/

interface Attachment {
  type: 'image' | 'figma'
  url: string
  name?: string
  preview?: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  attachment?: Attachment
}

const roles = [
  { id: 'designer', label: 'Designer' },
  { id: 'developer', label: 'Developer' },
  { id: 'content', label: 'Content' },
  { id: 'brand', label: 'Brand' },
  { id: 'agency', label: 'Agency' },
]

const starters = [
  { text: 'Check my spacing', icon: Layout, roles: ['designer', 'developer'] },
  { text: 'Validate colors', icon: Palette, roles: ['designer', 'developer'] },
  { text: 'Review accessibility', icon: Accessibility, roles: ['designer', 'developer', 'brand'] },
  { text: 'Improve copy tone', icon: Type, roles: ['content', 'brand'] },
  { text: 'Analyze design', icon: Wand2, roles: ['designer', 'content', 'agency'] },
  { text: 'Explain guideline', icon: MessageSquare, roles: ['designer', 'developer', 'content', 'brand', 'agency'] },
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

export default function BrendaSheet() {
  const { isOpen: open, closeChat } = useChat()
  const onOpenChange = (newOpen: boolean) => {
    if (!newOpen) closeChat()
  }
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [pendingAttachment, setPendingAttachment] = useState<Attachment | null>(null)
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

  const handleSend = async () => {
    if (!input.trim() && !pendingAttachment) return

    const userMessage = input.trim() || (pendingAttachment ? 'Check this design' : '')
    const attachment = pendingAttachment
    
    setInput('')
    setPendingAttachment(null)
    setMessages(prev => [...prev, { role: 'user', content: userMessage, attachment: attachment || undefined }])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = getResponse(userMessage, selectedRole || null)
      if (attachment) {
        response = attachment.type === 'figma' 
          ? "I've analyzed your Figma design. Here's what I found:\n\n✅ Color usage looks consistent with brand guidelines\n⚠️ Some spacing issues detected in the header area\n✅ Typography follows the type scale\n\nWould you like me to go into more detail on any of these points?"
          : "I've analyzed your uploaded image. Here's my feedback:\n\n✅ Overall composition is well-balanced\n⚠️ The contrast ratio on the CTA button might not meet accessibility standards\n✅ Brand colors are used correctly\n\nWant me to elaborate on any specific aspect?"
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleStarterClick = (text: string) => {
    setInput(text)
    inputRef.current?.focus()
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className="w-full h-full sm:h-auto sm:max-w-lg flex flex-col p-0 sm:rounded-l-xl"
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
        <ScrollArea className="flex-1 px-6" ref={scrollRef}>
          <div className="py-4 space-y-4">
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
                <div className="flex flex-col gap-2 max-w-[80%]">
                  {/* Attachment */}
                  {message.attachment && (
                    <div className={cn(
                      "rounded-xl overflow-hidden",
                      message.role === 'user' ? "bg-primary/90" : "bg-muted"
                    )}>
                      {message.attachment.type === 'image' ? (
                        <img 
                          src={message.attachment.preview || message.attachment.url} 
                          alt="Uploaded" 
                          className="max-w-full max-h-48 object-cover"
                        />
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
                  )}
                  {/* Message content */}
                  {message.content && (
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                        message.role === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {message.content}
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
        <div className="px-6 py-3 border-t bg-muted/30">
          <div className="flex flex-wrap gap-2">
            {filteredStarters.slice(0, 4).map((starter) => {
              const Icon = starter.icon
              return (
                <Button
                  key={starter.text}
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 rounded-full"
                  onClick={() => handleStarterClick(starter.text)}
                >
                  <Icon className="h-3 w-3 mr-1.5" />
                  {starter.text}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Pending Attachment Preview */}
        {pendingAttachment && (
          <div className="px-6 py-2 border-t bg-muted/50">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-background border">
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
        <div className="px-6 py-4 border-t">
          <div className="flex gap-2">
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
              className="flex-1"
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
