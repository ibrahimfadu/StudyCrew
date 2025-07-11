"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Target, Calendar, Award } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
export default function ProgressPage() {
  const weeklyData = [
    { day: "Mon", hours: 4, completed: 3 },
    { day: "Tue", hours: 6, completed: 5 },
    { day: "Wed", hours: 3, completed: 2 },
    { day: "Thu", hours: 5, completed: 4 },
    { day: "Fri", hours: 7, completed: 6 },
    { day: "Sat", hours: 8, completed: 7 },
    { day: "Sun", hours: 4, completed: 3 },
  ]

  const subjectProgress = [
    { subject: "Mathematics", completed: 85, total: 100, streak: 12 },
    { subject: "Physics", completed: 72, total: 100, streak: 8 },
    { subject: "Chemistry", completed: 91, total: 100, streak: 15 },
    { subject: "Biology", completed: 68, total: 100, streak: 6 },
  ]

  const motivationalQuotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "The expert in anything was once a beginner.",
    "Education is the most powerful weapon which you can use to change the world.",
    "Learning never exhausts the mind.",
  ]

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Progress Tracker</h1>
          <p className="text-muted-foreground">Monitor your study progress and achievements</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">79%</div>
              <Progress value={79} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 Days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">37h</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Study Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Study Hours</CardTitle>
              <CardDescription>Your study time distribution this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Progress</CardTitle>
              <CardDescription>Completion percentage by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectProgress.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{subject.streak} day streak</Badge>
                        <span className="text-sm text-muted-foreground">{subject.completed}%</span>
                      </div>
                    </div>
                    <Progress value={subject.completed} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Motivation Section */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Motivation</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-lg italic text-center py-4">"{randomQuote}"</blockquote>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest milestones and badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <Award className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="font-medium">Study Streak Master</p>
                  <p className="text-sm text-muted-foreground">15 consecutive days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <Target className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-medium">Goal Crusher</p>
                  <p className="text-sm text-muted-foreground">Completed weekly target</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">Progress Champion</p>
                  <p className="text-sm text-muted-foreground">80% overall completion</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}
