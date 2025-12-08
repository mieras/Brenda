'use client'

import { useState, useEffect } from 'react'
import { useReports } from '@/lib/report-context'
import { useChat } from '@/lib/chat-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function RecentActivity() {
  const { reports, openReport } = useReports()
  const { openChat } = useChat()
  const [mounted, setMounted] = useState(false)

  // Only compute time strings on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Combine reports with mock chat activity
  const activities = [
    ...reports.slice(0, 2).map(r => ({
      id: r.id,
      type: 'scan' as const,
      title: r.fileName,
      time: mounted ? formatTimeAgo(r.createdAt) : '...',
      status: r.summary.failed > 0 ? 'warning' : 'success',
      reportId: r.id
    })),
    {
      id: 'chat-1',
      type: 'chat' as const,
      title: 'Logo clear space question',
      time: 'Yesterday',
      status: 'success',
      reportId: null
    }
  ].slice(0, 3)

  const handleActivityClick = (activity: typeof activities[0]) => {
    if (activity.type === 'scan' && activity.reportId) {
      openReport(activity.reportId)
    } else {
      openChat()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest interactions with Brenda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => handleActivityClick(activity)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left group"
            >
              <div className={cn(
                "h-2 w-2 rounded-full shrink-0",
                activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
              )} />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate group-hover:text-primary transition-colors">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="outline" className="shrink-0">
                {activity.type === 'scan' ? 'Scan' : 'Chat'}
              </Badge>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </button>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4" asChild>
          <Link href="/activity">View all activity</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString()
}

