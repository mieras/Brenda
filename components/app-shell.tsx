'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import BrendaSheet from '@/components/brenda-sheet'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MessageCircle, Menu, Sparkles } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ChatProvider, useChat } from '@/lib/chat-context'

function AppShellContent({ children }: { children: React.ReactNode }) {
  const { openChat } = useChat()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b bg-card">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Brenda</span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={openChat}>
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Chat with Brenda</span>
          </Button>
        </header>

        <main className="flex-1 overflow-hidden">
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
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ChatProvider>
      <AppShellContent>{children}</AppShellContent>
    </ChatProvider>
  )
}

