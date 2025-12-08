'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import BrendaSheet from '@/components/brenda-sheet'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
      
      {/* Floating Brenda Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setChatOpen(true)}
            size="lg"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50 bg-primary hover:bg-primary/90"
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
      <BrendaSheet open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  )
}

