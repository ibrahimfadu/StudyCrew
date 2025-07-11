"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Palette, Clock, Shield, HelpCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  })

  const [preferences, setPreferences] = useState({
    dailyStudyTime: "4-6",
    darkMode: true,
    notifications: true,
    emailUpdates: false,
    studyReminders: true,
  })

  const { toast } = useToast()

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleSavePreferences = () => {
    toast({
      title: "Preferences updated",
      description: "Your study preferences have been saved successfully.",
    })
  }

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and study preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>

                <Button onClick={handleSaveProfile}>Save Profile</Button>
              </CardContent>
            </Card>

            {/* Study Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Study Preferences
                </CardTitle>
                <CardDescription>Customize your study schedule and learning preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Daily Study Time Preference</Label>
                  <Select
                    value={preferences.dailyStudyTime}
                    onValueChange={(value) => setPreferences({ ...preferences, dailyStudyTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 hours</SelectItem>
                      <SelectItem value="2-4">2-4 hours</SelectItem>
                      <SelectItem value="4-6">4-6 hours</SelectItem>
                      <SelectItem value="6-8">6-8 hours</SelectItem>
                      <SelectItem value="8+">8+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSavePreferences}>Save Preferences</Button>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel of your StudyCrew experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme for better studying at night</p>
                  </div>
                  <Switch
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Get notified about study reminders</p>
                  </div>
                  <Switch
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, notifications: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Updates</Label>
                    <p className="text-xs text-muted-foreground">Receive weekly progress reports</p>
                  </div>
                  <Switch
                    checked={preferences.emailUpdates}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, emailUpdates: checked })}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Study Reminders</Label>
                    <p className="text-xs text-muted-foreground">Get reminded about scheduled sessions</p>
                  </div>
                  <Switch
                    checked={preferences.studyReminders}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, studyReminders: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Privacy Settings
                </Button>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Help Center
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Report a Bug
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>  
    </DashboardLayout>
    </ProtectedRoute>
  );
}
