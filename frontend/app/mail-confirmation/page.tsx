"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { CheckCircle, Mail, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/supabase-client"
import { useRouter } from "next/navigation"


export default function MailConfirmationPage() {
  const [isResending, setIsResending] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleResendEmail = async () => {
    setIsResending(true)

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: (await supabase.auth.getUser()).data.user?.email || '',
    })

    setIsResending(false)

    if (error) {
      toast({
        title: "Failed to resend email",
        description: error.message
      })
    } else {
      toast({
        title: "Email sent!",
        description: "Please check your inbox for the confirmation email",
      })
    }
  }

  // ✅ Poll every 3 seconds to check if email is verified
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error("Error fetching user:", error.message)
        return
      }

      const user = data?.user

      if (user?.email_confirmed_at) {
        clearInterval(interval)
        toast({
          title: "Email Verified",
          description: "Redirecting to dashboard..."
        })
        router.push("/dashboard")
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [router, toast])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Mail className="h-16 w-16 text-blue-600" />
              <CheckCircle className="h-6 w-6 text-green-600 absolute -top-1 -right-1 bg-background rounded-full" />
            </div>
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            We've sent a confirmation link to your email address. Please click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {"Didn't receive the email? Check your spam folder or "}
            <Button
              variant="link"
              className="p-0 h-auto text-blue-600"
              onClick={handleResendEmail}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                  Resending...
                </>
              ) : (
                "resend it"
              )}
            </Button>
          </div>

          <div className="pt-4">
            <Link href="/login">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
