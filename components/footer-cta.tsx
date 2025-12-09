'use client'

import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { useChat } from '@/lib/chat-context'

export function FooterCTA() {
  const { openChat } = useChat()

  return (
    <section className="bg-muted/50">
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-2">Ready to create on-brand magic?</h2>
        <p className="text-muted-foreground mb-6">
          Brenda is always here to help. Just click the chat button to get started.
        </p>
        <Button size="lg" className="gap-2" onClick={openChat}>
          <Sparkles className="h-4 w-4" />
          Start a conversation
        </Button>
      </div>
    </section>
  )
}


