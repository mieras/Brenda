'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useUser, roleLabels } from '@/lib/user-context'
import { ArrowLeft, User, Mail } from 'lucide-react'
import Link from 'next/link'

const roleOptions = [
  { id: 'designer', label: 'Designer', description: 'Digital product design, UI/UX' },
  { id: 'developer', label: 'Developer', description: 'Frontend development, components' },
  { id: 'content', label: 'Content Designer', description: 'Content strategy, copywriting' },
  { id: 'brand', label: 'Brand Guardian', description: 'Brand oversight, guidelines' },
  { id: 'agency', label: 'Agency Partner', description: 'External agency access' },
]

export default function AccountPage() {
  const { user, setRole } = useUser()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState(user.role)

  const handleSave = () => {
    setRole(selectedRole)
    router.push('/')
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Your Role</CardTitle>
              <CardDescription>
                Select your role to customize your experience. This will affect which sections and content are visible to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="space-y-3">
                {roleOptions.map((role) => (
                  <div key={role.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={role.id} id={role.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={role.id} className="font-medium cursor-pointer">
                        {role.label}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {role.description}
                      </p>
                    </div>
                    {selectedRole === role.id && (
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    )}
                  </div>
                ))}
              </RadioGroup>
              
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => router.push('/')}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={selectedRole === user.role}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
