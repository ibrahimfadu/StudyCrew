"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { AnimatedLogo } from "@/components/animated-logo"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "🎉 Welcome back!",
        description: "Successfully logged into StudyCrew.AI",
      })
      router.push("/dashboard")
    }, 1000)
  }

  const handleGoogleLogin = () => {
    toast({
      title: "🚀 Google Login",
      description: "Google authentication would be implemented here",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20 px-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AnimatedLogo size={64} showText={false} />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            🎓 Welcome Back!
          </CardTitle>
          <CardDescription>Sign in to continue your study journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">📧 Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">🔒 Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-blue-200 focus:border-blue-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              disabled={isLoading}
            >
              {isLoading ? "🔄 Signing in..." : "🚀 Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
              🤔 Forgot your password?
            </Link>
          </div>

          <Separator />

          <Button
            variant="outline"
            className="w-full bg-transparent border-blue-200 hover:bg-blue-50"
            onClick={handleGoogleLogin}
          >
            <Mail className="mr-2 h-4 w-4" />🌟 Continue with Google
          </Button>

          <div className="text-center text-sm">
            {"Don't have an account? "}
            <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
              🎯 Sign up free
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
