import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Clock, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function ComingSoon() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-[#E30027]/10 flex items-center justify-center">
                <Clock className="h-8 w-8 text-[#E30027]" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold mb-2">Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              This page is currently under development. We're working hard to bring you the best experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/activity">
                  View My Activity
                </Link>
              </Button>
            </div>
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Need help? Click the chat button to ask Brenda about this page or explore other available content.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

