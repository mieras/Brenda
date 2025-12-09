'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import BrendaSheet from '@/components/brenda-sheet'
import ReportViewer from '@/components/report-viewer'
import { UserMenu } from '@/components/user-menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { MessageCircle, Menu, Sparkles } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ChatProvider, useChat } from '@/lib/chat-context'
import { ReportProvider, useReports } from '@/lib/report-context'
import { UserProvider } from '@/lib/user-context'
import Link from 'next/link'

function AppShellContent({ children }: { children: React.ReactNode }) {
  const { openChat } = useChat()
  const { currentReport, isViewerOpen, closeReport } = useReports()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-end px-6 py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40 shrink-0">
          <UserMenu />
        </header>

        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b bg-card shrink-0">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar onNavigate={() => setMobileMenuOpen(false)} isMobile />
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[#BB0020] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Brenda</span>
          </Link>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={openChat}>
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Chat with Brenda</span>
            </Button>
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* Floating Brenda Button (desktop only) */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={openChat}
            size="lg"
            className="hidden md:flex fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50 bg-primary hover:bg-primary/90"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Chat with Brenda</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Chat with Brenda</p>
        </TooltipContent>
      </Tooltip>

      {/* Brenda Chat Sheet */}
      <BrendaSheet />

      {/* Report Viewer */}
      <ReportViewer report={currentReport} open={isViewerOpen} onClose={closeReport} />
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ChatProvider>
        <ReportProvider>
          <AppShellContent>{children}</AppShellContent>
        </ReportProvider>
      </ChatProvider>
    </UserProvider>
  )
}
