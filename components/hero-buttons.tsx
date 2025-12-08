'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle, Upload } from 'lucide-react'
import { useChat } from '@/lib/chat-context'

export function HeroButtons() {
  const { openChat } = useChat()

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
      <Button size="lg" className="gap-2" onClick={openChat}>
        <MessageCircle className="h-4 w-4" />
        Chat with Brenda
      </Button>
      <Button size="lg" variant="outline" className="gap-2" onClick={openChat}>
        <Upload className="h-4 w-4" />
        Upload Design
      </Button>
    </div>
  )
}

