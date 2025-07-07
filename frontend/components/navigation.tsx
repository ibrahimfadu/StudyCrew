"use client"

import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 border-b z-50 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 hover-scale transition-transform duration-200">
          <Brain className="h-8 w-8 text-blue-600 animate-float" />
          <span className="font-bold text-xl">StudyCrew</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="hover-lift transition-all duration-200">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="hover-lift hover-glow transition-all duration-300">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
