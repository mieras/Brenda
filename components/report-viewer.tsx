'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Send,
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Figma,
  ImageIcon,
  ArrowRight
} from 'lucide-react'
import { cn, getAssetPath } from '@/lib/utils'
import { Report, Finding, getStatusColor, getScoreColor, formatTimeAgo } from '@/lib/reports'
import Link from 'next/link'

interface ReportViewerProps {
  report: Report | null
  open: boolean
  onClose: () => void
}

export default function ReportViewer({ report, open, onClose }: ReportViewerProps) {
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [isTyping, setIsTyping] = useState(false)
  const chatScrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize chat with report history
  useEffect(() => {
    if (report && open) {
      setChatMessages(report.chatHistory.map(m => ({ role: m.role, content: m.content })))
    }
  }, [report, open])

  // Scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [chatMessages])

  const handleSendChat = () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    // Simulate AI response about the report
    setTimeout(() => {
      let response = "I can help you understand this report better. "
      if (userMessage.toLowerCase().includes('logo')) {
        response = "The logo issue is about placement on unapproved backgrounds. According to our guidelines, the logo should only appear on white, black, or our primary brand colors to maintain visibility and brand integrity."
      } else if (userMessage.toLowerCase().includes('color')) {
        response = "The color warning indicates a slight deviation from our exact brand blue. Using #0050A5 instead of similar shades ensures consistency across all touchpoints."
      } else if (userMessage.toLowerCase().includes('fix') || userMessage.toLowerCase().includes('how')) {
        response = "To fix the issues: 1) Move the logo to a white or dark background area, 2) Update the banner to use our exact brand blue #0050A5, and 3) Replace italic text with bold styling for emphasis."
      } else {
        response += "What would you like to know more about? I can explain any finding in detail or suggest how to fix specific issues."
      }
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1000)
  }

  if (!report) return null

  const StatusIcon = ({ status }: { status: Finding['status'] }) => {
    switch (status) {
      case 'pass': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'fail': return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 gap-0 flex flex-col">
        {/* Main layout: 2 columns for left side, 1 for chat */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr_1fr] overflow-hidden">
          {/* Left side: Preview + Findings */}
          <div className="flex flex-col overflow-hidden">
            {/* Header over 2 columns */}
            <DialogHeader className="px-6 py-4 border-b shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    {report.fileType === 'figma' ? (
                      <Figma className="h-5 w-5" />
                    ) : (
                      <ImageIcon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <DialogTitle className="text-left">{report.fileName}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{formatTimeAgo(report.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Brand Score</p>
                    <p className={cn("text-2xl font-bold", getScoreColor(report.summary.score))}>
                      {report.summary.score}/100
                    </p>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Two column layout for Preview and Findings */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
              {/* Column 1: Preview */}
              <div className="border-r bg-muted/30 p-6 overflow-auto hidden lg:block">
            <h3 className="font-semibold mb-4">Design Preview</h3>
            {report.fileType === 'figma' ? (
              <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center gap-3">
                <Figma className="h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Figma Design</p>
                <a
                  href={report.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Open in Figma <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}

            {/* Summary stats */}
            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-sm">Summary</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">{report.summary.passed}</p>
                  <p className="text-xs text-green-600 dark:text-green-500">Passed</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{report.summary.warnings}</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">Warnings</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-700 dark:text-red-400">{report.summary.failed}</p>
                  <p className="text-xs text-red-600 dark:text-red-500">Failed</p>
                </div>
              </div>
              <Progress value={report.summary.score} className="h-2" />
            </div>
              </div>

              {/* Column 2: Findings */}
              <div className="border-r overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b bg-card shrink-0">
              <h3 className="font-semibold">Findings ({report.findings.length})</h3>
            </div>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-3">
                {report.findings.map((finding) => (
                  <Card key={finding.id} className="overflow-hidden">
                    <CardHeader className="py-3 px-4">
                      <div className="flex items-start gap-3">
                        <StatusIcon status={finding.status} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{finding.category}</Badge>
                            <Badge className={cn("text-xs", getStatusColor(finding.status))}>
                              {finding.status === 'pass' ? 'Pass' : finding.status === 'warning' ? 'Warning' : 'Fail'}
                            </Badge>
                          </div>
                          <CardTitle className="text-sm">{finding.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-3 px-4 pt-0">
                      <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                      {finding.suggestion && (
                        <p className="text-sm bg-muted p-2 rounded">
                          <span className="font-medium">Suggestion:</span> {finding.suggestion}
                        </p>
                      )}
                      {finding.guidelineLink && (
                        <Link
                          href={finding.guidelineLink}
                          onClick={onClose}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                        >
                          View guideline <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
              </div>
            </div>
          </div>

          {/* Column 3: Chat - Full height */}
          <div className="flex flex-col overflow-hidden border-l">
            {/* Chat header - starts from top */}
            <div className="px-6 py-4 border-b bg-card shrink-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={getAssetPath('/images/brenda-avatar.png')} alt="Brenda" className="object-cover object-top" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm">Ask Brenda</h3>
                  <p className="text-xs text-muted-foreground">Get help understanding this report</p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 px-4" ref={chatScrollRef}>
              <div className="py-4 space-y-3">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex gap-2",
                      message.role === 'user' ? "flex-row-reverse" : ""
                    )}
                  >
                    <Avatar className="h-6 w-6 shrink-0">
                      {message.role === 'assistant' ? (
                        <>
                          <AvatarImage src={getAssetPath('/images/brenda-avatar.png')} alt="Brenda" className="object-cover object-top" />
                          <AvatarFallback className="text-xs">B</AvatarFallback>
                        </>
                      ) : (
                        <AvatarFallback className="text-xs bg-secondary">U</AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className={cn(
                        "rounded-xl px-3 py-2 max-w-[85%] text-sm",
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
                  <div className="flex gap-2">
                    <Avatar className="h-6 w-6 shrink-0">
                      <AvatarImage src={getAssetPath('/images/brenda-avatar.png')} alt="Brenda" className="object-cover object-top" />
                      <AvatarFallback className="text-xs">B</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-xl px-3 py-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="px-4 py-3 border-t shrink-0">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Ask about this report..."
                  className="flex-1 text-sm"
                />
                <Button size="icon" onClick={handleSendChat} disabled={!chatInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

