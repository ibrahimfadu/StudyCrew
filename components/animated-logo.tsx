"use client"

import { useState, useEffect } from "react"

interface AnimatedLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export function AnimatedLogo({ size = 48, showText = true, className = "" }: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(true)
      setTimeout(() => setPulseAnimation(false), 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`transition-all duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          } ${pulseAnimation ? "animate-pulse" : ""}`}
        >
          {/* Outer ring with gradient */}
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="white"
            stroke="url(#ringGradient)"
            strokeWidth="4"
            filter={isHovered ? "url(#glow)" : "none"}
            className="transition-all duration-300"
          />

          {/* Graduation cap */}
          <g transform="translate(50, 30)">
            <path
              d="M-15,-8 L15,-8 L18,-5 L18,0 L15,3 L-15,3 L-18,0 L-18,-5 Z"
              fill="url(#capGradient)"
              className={`transition-all duration-700 ${isHovered ? "animate-bounce" : ""}`}
            />
            {/* Cap tassel */}
            <circle
              cx="12"
              cy="-3"
              r="2"
              fill="url(#capGradient)"
              className={`transition-all duration-500 ${isHovered ? "animate-spin" : ""}`}
            />
            <line
              x1="12"
              y1="-1"
              x2="12"
              y2="8"
              stroke="url(#capGradient)"
              strokeWidth="1"
              className={`transition-all duration-500 ${isHovered ? "animate-pulse" : ""}`}
            />
          </g>

          {/* Infinity symbol */}
          <g transform="translate(50, 65)">
            <path
              d="M-12,0 C-12,-6 -6,-6 0,0 C6,6 12,6 12,0 C12,6 6,6 0,0 C-6,-6 -12,-6 -12,0 Z"
              fill="none"
              stroke="url(#infinityGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              className={`transition-all duration-1000 ${isHovered ? "animate-spin" : ""}`}
              style={{
                animation: isHovered ? "spin 2s linear infinite" : "none",
              }}
            />
          </g>

          {/* Sparkle effects */}
          {isHovered && (
            <>
              <circle cx="20" cy="20" r="1" fill="#10B981" className="animate-ping" />
              <circle
                cx="80"
                cy="25"
                r="1"
                fill="#3B82F6"
                className="animate-ping"
                style={{ animationDelay: "0.5s" }}
              />
              <circle cx="75" cy="75" r="1" fill="#10B981" className="animate-ping" style={{ animationDelay: "1s" }} />
              <circle
                cx="25"
                cy="80"
                r="1"
                fill="#3B82F6"
                className="animate-ping"
                style={{ animationDelay: "1.5s" }}
              />
            </>
          )}
        </svg>

        {/* Floating particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-2 left-2 w-1 h-1 bg-green-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute top-4 right-3 w-1 h-1 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className="absolute bottom-3 left-4 w-1 h-1 bg-green-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.6s" }}
            />
            <div
              className="absolute bottom-2 right-2 w-1 h-1 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.9s" }}
            />
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <div
            className={`font-bold text-xl bg-gradient-to-r from-blue-600 via-green-500 to-blue-700 bg-clip-text text-transparent transition-all duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          >
            StudyCrew.AI
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            🚀 Smart Study • 🎯 Achieve Goals • 🤝 Connect
          </div>
        </div>
      )}
    </div>
  )
}
