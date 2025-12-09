'use client'

import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useUser, roleLabels } from '@/lib/user-context'
import {
  Clock,
  Star,
  Settings,
  LogOut,
  ChevronDown,
  Palette,
  Type
} from 'lucide-react'
import Link from 'next/link'


const favoriteIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '/guidelines/colour-palette': Palette,
  '/guidelines/typography': Type,
}

export function UserMenu() {
  const { user } = useUser()
  const router = useRouter()

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getPageName = (path: string) => {
    const slug = path.replace('/guidelines/', '')
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-2 text-white hover:bg-white/10 hover:text-white">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs bg-white/20 text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm font-medium text-white">{user.name.split(' ')[0]}</span>
          <ChevronDown className="h-3 w-3 text-white/80" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <Badge variant="secondary" className="w-fit mt-1 text-xs">
              {roleLabels[user.role] || user.role}
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/activity')}>
            <Clock className="mr-2 h-4 w-4" />
            My Activity
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/account')}>
            <Settings className="mr-2 h-4 w-4" />
            Account Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Current Role
        </DropdownMenuLabel>
        <DropdownMenuItem disabled className="text-sm">
          <Badge variant="secondary" className="w-full justify-start">
            {roleLabels[user.role] || user.role}
          </Badge>
        </DropdownMenuItem>

        {user.favoritePages.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground flex items-center gap-1">
              <Star className="h-3 w-3" />
              Favorites
            </DropdownMenuLabel>
            {user.favoritePages.map((page) => {
              const Icon = favoriteIcons[page] || Star
              return (
                <DropdownMenuItem key={page} asChild>
                  <Link href={page}>
                    <Icon className="mr-2 h-4 w-4" />
                    {getPageName(page)}
                  </Link>
                </DropdownMenuItem>
              )
            })}
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

