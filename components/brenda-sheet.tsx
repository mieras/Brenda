'use client'

import { useState, useRef, useEffect } from 'react'
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
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Separator } from '@/components/ui/separator'
import { 
  Send, 
  Sparkles, 
  Upload, 
  Link2, 
  Palette, 
  Type, 
  Layout, 
  Accessibility,
  Wand2,
  MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getResponse, getWelcomeMessage } from '@/lib/mockResponses'

interface Message {
  role: 'user' | 'assistant'
  content: string
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

interface BrendaSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BrendaSheet({ open, onOpenChange }: BrendaSheetProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = getResponse(userMessage, selectedRole || null)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleStarterClick = (text: string) => {
    setInput(text)
    inputRef.current?.focus()
  }

  const filteredStarters = selectedRole
    ? starters.filter(s => s.roles.includes(selectedRole))
    : starters

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
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
          <p className="text-xs text-muted-foreground mb-2">I'm a...</p>
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
                <Avatar className={cn(
                  "h-8 w-8 shrink-0",
                  message.role === 'user' ? "bg-secondary" : "bg-primary"
                )}>
                  <AvatarFallback className={cn(
                    message.role === 'user' 
                      ? "bg-secondary text-secondary-foreground" 
                      : "bg-primary text-primary-foreground"
                  )}>
                    {message.role === 'user' ? 'U' : 'B'}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 max-w-[80%] text-sm",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 animate-in slide-in-from-bottom-2">
                <Avatar className="h-8 w-8 shrink-0 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground">B</AvatarFallback>
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

        {/* Input */}
        <div className="px-6 py-4 border-t">
          <div className="flex gap-2">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
                <Upload className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
                <Link2 className="h-4 w-4" />
              </Button>
            </div>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask Brenda anything..."
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim()}
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

