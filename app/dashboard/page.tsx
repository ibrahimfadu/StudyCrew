"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, BookOpen, Target, Plus, Brain } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { FadeInSection } from "@/components/fade-in-section"
import { AnimatedCounter } from "@/components/animated-counter"

export default function DashboardPage() {
  const [userStudyPlan, setUserStudyPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch user's study plan from Flask backend
  useEffect(() => {
    const fetchUserStudyPlan = async () => {
      try {
        const response = await fetch("/api/user-study-plan", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUserStudyPlan(data.studyPlan)
        } else {
          setUserStudyPlan(null)
        }
      } catch (error) {
        console.error("Error fetching study plan:", error)
        setUserStudyPlan(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUserStudyPlan()
  }, [])

  // Sample data for when user has a study plan
  const todaysTasks = userStudyPlan
    ? [
        { subject: "Mathematics", topic: "Calculus - Derivatives", time: "9:00 AM - 10:30 AM", completed: false },
        { subject: "Physics", topic: "Quantum Mechanics", time: "11:00 AM - 12:00 PM", completed: true },
        { subject: "Chemistry", topic: "Organic Chemistry", time: "2:00 PM - 3:30 PM", completed: false },
        { subject: "Biology", topic: "Cell Biology", time: "4:00 PM - 5:00 PM", completed: false },
      ]
    : []

  const weeklyGoals = userStudyPlan
    ? [
        { subject: "Mathematics", progress: 75, total: 20, completed: 15 },
        { subject: "Physics", progress: 60, total: 15, completed: 9 },
        { subject: "Chemistry", progress: 40, total: 18, completed: 7 },
        { subject: "Biology", progress: 85, total: 12, completed: 10 },
      ]
    : []

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 page-transition">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Brain className="h-12 w-12 text-blue-600 mx-auto animate-pulse mb-4" />
              <p className="text-muted-foreground">
                Loading your dashboard<span className="loading-dots"></span>
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // If user has no study plan, show suggestion to create one
  if (!userStudyPlan) {
    return (
      <DashboardLayout>
        <div className="space-y-6 page-transition">
          {/* Header */}
          <FadeInSection>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to StudyCrew! Let's get you started.</p>
              </div>
            </div>
          </FadeInSection>

          {/* No Study Plan - Suggestion Card */}
          <FadeInSection delay={200} direction="scale">
            <Card className="border-dashed border-2 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 hover-lift transition-all duration-500">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Brain className="h-16 w-16 text-blue-600 mx-auto animate-float" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Create Your First AI Study Plan</h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      You don't have any study plans yet. Let our AI create a personalized study schedule based on your
                      subjects, available time, and learning goals.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/create-plan">
                      <Button size="lg" className="w-full sm:w-auto hover-lift hover-glow transition-all duration-300">
                        <Plus className="mr-2 h-5 w-5" />
                        Create AI Study Plan
                      </Button>
                    </Link>
                    <Link href="/connect">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto bg-transparent hover-lift transition-all duration-300"
                      >
                        <Target className="mr-2 h-5 w-5" />
                        Find Study Partners
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Getting Started Guide */}
          <FadeInSection delay={400}>
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <CardTitle>Getting Started with StudyCrew</CardTitle>
                <CardDescription>Follow these steps to maximize your study efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[
                    {
                      step: 1,
                      title: "Create Your Study Plan",
                      description: "Add your subjects, available study time, and let AI optimize your schedule",
                      color: "blue",
                      delay: 100,
                    },
                    {
                      step: 2,
                      title: "Connect with Study Partners",
                      description: "Find students with similar subjects and study schedules",
                      color: "purple",
                      delay: 200,
                    },
                    {
                      step: 3,
                      title: "Track Your Progress",
                      description: "Monitor your study streaks and achievement milestones",
                      color: "green",
                      delay: 300,
                    },
                  ].map((item, index) => (
                    <FadeInSection key={index} delay={item.delay} direction="left">
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50 hover-lift transition-all duration-300">
                        <div
                          className={`w-8 h-8 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-full flex items-center justify-center flex-shrink-0 hover-scale transition-transform duration-300`}
                        >
                          <span className={`text-sm font-bold text-${item.color}-600 animate-bounce-in`}>
                            {item.step}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </DashboardLayout>
    )
  }

  // If user has a study plan, show the regular dashboard
  return (
    <DashboardLayout>
      <div className="space-y-6 page-transition">
        {/* Header */}
        <FadeInSection>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your study overview for today.</p>
            </div>
            <Link href="/create-plan">
              <Button className="hover-lift hover-glow transition-all duration-300">
                <Plus className="mr-2 h-4 w-4" />
                Create New Plan
              </Button>
            </Link>
          </div>
        </FadeInSection>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Today's Tasks",
              value: todaysTasks.length,
              subtitle: `${todaysTasks.filter((task) => task.completed).length} completed`,
              icon: BookOpen,
              delay: 100,
            },
            { title: "Study Hours", value: "6.5h", subtitle: "Planned for today", icon: Clock, delay: 200 },
            { title: "Weekly Progress", value: "65%", subtitle: "On track", icon: Target, delay: 300 },
            { title: "Study Streak", value: 12, subtitle: "Days", icon: Calendar, delay: 400 },
          ].map((stat, index) => (
            <FadeInSection key={index} delay={stat.delay} direction="scale">
              <Card className="hover-lift hover-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof stat.value === "number" ? <AnimatedCounter end={stat.value} /> : stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <FadeInSection delay={500} direction="left">
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your planned study sessions for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysTasks.map((task, index) => (
                    <FadeInSection key={index} delay={600 + index * 100} direction="up">
                      <div
                        className={`flex items-center space-x-4 p-3 rounded-lg border transition-all duration-300 hover-lift ${
                          task.completed
                            ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                            : "bg-muted/50 hover:bg-muted/70"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            task.completed ? "bg-green-500 animate-pulse" : "bg-muted-foreground"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{task.subject}</p>
                          <p className="text-sm text-muted-foreground">{task.topic}</p>
                          <p className="text-xs text-muted-foreground">{task.time}</p>
                        </div>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Weekly Goals */}
          <FadeInSection delay={600} direction="right">
            <Card className="hover-lift transition-all duration-300">
              <CardHeader>
                <CardTitle>Weekly Goals</CardTitle>
                <CardDescription>Your progress towards this week's targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <FadeInSection key={index} delay={700 + index * 100} direction="up">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{goal.subject}</span>
                          <span className="text-muted-foreground">
                            {goal.completed}/{goal.total} topics
                          </span>
                        </div>
                        <div className="relative">
                          <Progress
                            value={goal.progress}
                            className="h-2 transition-all duration-1000 ease-out"
                            style={{ "--progress-width": `${goal.progress}%` } as React.CSSProperties}
                          />
                        </div>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </div>
    </DashboardLayout>
  )
}
