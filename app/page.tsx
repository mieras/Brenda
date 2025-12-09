'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'
import { HeroButtons } from '@/components/hero-buttons'
import { FooterCTA } from '@/components/footer-cta'
import { RecentActivity } from '@/components/recent-activity'
import { RoleChecklist } from '@/components/role-checklist'
import { RoleSuggestions } from '@/components/role-suggestions'
import {
  Sparkles,
  MessageCircle,
  CheckCircle2,
  TrendingUp
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex-1 overflow-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Brand Assistant
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-4">
                Meet <span className="text-primary">Brenda</span>, your brand buddy
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-lg">
                Your virtual art director and trusted companion for all things brand. 
                Get instant guidance on design, voice & tone, and brand consistency.
              </p>
              <HeroButtons />
            </div>
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white dark:border-gray-800">
                <Image
                  src={getAssetPath('/images/brenda-avatar.png')}
                  alt="Brenda - Your AI Brand Assistant"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover object-top scale-110"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card border rounded-xl p-3 shadow-lg">
                <p className="text-sm font-medium">Always here to help! 👋</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started & Recommendations */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Role-based Checklist */}
          <RoleChecklist />

          {/* Role-based Suggestions */}
          <RoleSuggestions />
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Features & Activity */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* What Brenda Can Do */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                What Brenda can help with
              </CardTitle>
              <CardDescription>Your AI brand assistant capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium">Design Reviews</p>
                  <p className="text-sm text-muted-foreground">Upload designs for instant brand compliance feedback</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Brand Questions</p>
                  <p className="text-sm text-muted-foreground">Ask anything about guidelines, usage, or best practices</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Improvement Tips</p>
                  <p className="text-sm text-muted-foreground">Get actionable suggestions to elevate your work</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />
    </div>
  )
}
