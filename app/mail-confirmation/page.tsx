"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function MailConfirmationPage() {
  const [isResending, setIsResending] = useState(false)
  const { toast } = useToast()

  const handleResendEmail = () => {
    setIsResending(true)
    setTimeout(() => {
      setIsResending(false)
      toast({
        title: "Email sent!",
        description: "Please check your inbox for the confirmation email",
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Image src="/logo.png" alt="StudyCrew.AI" width={64} height={64} className="rounded-full" />
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
