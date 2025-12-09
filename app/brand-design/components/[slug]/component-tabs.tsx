'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code2, FileText, Palette } from 'lucide-react'
import { ReactNode } from 'react'

interface ComponentTabsProps {
  component: {
    name: string
    description?: string
  }
  children: ReactNode
}

export default function ComponentTabs({ component, children }: ComponentTabsProps) {
  return (
    <Tabs defaultValue="design" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="design" className="gap-2">
          <Palette className="h-4 w-4" />
          Design
        </TabsTrigger>
        <TabsTrigger value="code" className="gap-2">
          <Code2 className="h-4 w-4" />
          Code
        </TabsTrigger>
        <TabsTrigger value="content" className="gap-2">
          <FileText className="h-4 w-4" />
          Content Guidelines
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

