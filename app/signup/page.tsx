"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { AnimatedLogo } from "@/components/animated-logo"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "🎉 Account created successfully!",
        description: "Welcome to StudyCrew.AI! Check your email for confirmation",
      })
      router.push("/mail-confirmation")
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20 px-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AnimatedLogo size={64} showText={false} />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            🚀 Join StudyCrew.AI
          </CardTitle>
          <CardDescription>Start your journey to academic success - it's free! 🎓</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">👤 Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">📧 Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">📱 Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">⚧ Gender</Label>
              <Select onValueChange={(value) => handleInputChange("gender", value)} required>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              disabled={isLoading}
            >
              {isLoading ? "🔄 Creating Account..." : "🎯 Create Free Account"}
            </Button>
          </form>

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-semibold">
              🚀 Sign in
            </Link>
          </div>

          <div className="text-center text-xs text-muted-foreground mt-4">
            🔒 By signing up, you agree to our Terms & Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
