'use client'

import { useReports } from '@/lib/report-context'
import { formatTimeAgo, getScoreColor } from '@/lib/reports'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Clock,
  FileImage,
  Figma,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function ActivityPage() {
  const { reports, openReport } = useReports()

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Link href="/" passHref>
          <Button variant="ghost" size="sm" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Button>
        </Link>

        <div className="mb-8">
          <Badge variant="secondary" className="mb-2">
            <Clock className="h-3 w-3 mr-1" />
            History
          </Badge>
          <h1 className="text-3xl font-bold mb-2">My Activity</h1>
          <p className="text-muted-foreground text-lg">
            View your past design reviews and continue conversations with Brenda.
          </p>
        </div>

        <Separator className="mb-8" />

        {reports.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileImage className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No reports yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload a design or paste a Figma link in the chat to get started.
              </p>
              <Button>Chat with Brenda</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <Card 
                key={report.id} 
                className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => openReport(report.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      {report.fileType === 'figma' ? (
                        <Figma className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <FileImage className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{report.fileName}</h3>
                        <Badge variant="outline" className="shrink-0">
                          {report.fileType === 'figma' ? 'Figma' : 'Image'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatTimeAgo(report.createdAt)}
                      </p>
                      
                      {/* Summary pills */}
                      <div className="flex items-center gap-3 mt-2">
                        {report.summary.failed > 0 && (
                          <div className="flex items-center gap-1 text-xs text-red-600">
                            <XCircle className="h-3 w-3" />
                            {report.summary.failed} issue{report.summary.failed !== 1 ? 's' : ''}
                          </div>
                        )}
                        {report.summary.warnings > 0 && (
                          <div className="flex items-center gap-1 text-xs text-yellow-600">
                            <AlertTriangle className="h-3 w-3" />
                            {report.summary.warnings} warning{report.summary.warnings !== 1 ? 's' : ''}
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle2 className="h-3 w-3" />
                          {report.summary.passed} passed
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right shrink-0">
                      <div className={cn(
                        "text-2xl font-bold",
                        getScoreColor(report.summary.score)
                      )}>
                        {report.summary.score}
                      </div>
                      <p className="text-xs text-muted-foreground">score</p>
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

