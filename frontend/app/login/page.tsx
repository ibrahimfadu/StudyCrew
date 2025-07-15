"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Brain, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/supabase-client"

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

    const {error} = await supabase.auth.signInWithPassword({email,password})

    if (error){
      console.log(error.message)
      setIsLoading(false)
      setEmail("") 
      setPassword("")

      toast({
        title:"Login failed",
        description:"Invalid Email/Password or Your account don't exist,Sign up first"
      })
    }
    else{
      router.push("/dashboard")
      toast({
        title:"Login Success!",
        description:"Welcome back to your StudyCrew account."
      })
    }

  }

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Google authentication would be implemented here",
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your StudyCrew account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
              Forgot your password?
            </Link>
          </div>

          <Separator />

          <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleLogin}>
            <Mail className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="text-center text-sm">
            {"Don't have an account? "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
