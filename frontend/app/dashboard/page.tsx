"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/supabase-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard-layout"
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  Plus, 
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3,
  Users,
  Award,
  Zap,
  Brain,
  Timer,
  BookMarked,
  Sparkles,
  GraduationCap
} from "lucide-react"

interface StudyPlan {
  id: string
  subject: string[]
  hours_per_day: number
  total_topics: number
  study_days: number
  predict_hours: number
  created_at: string
  // Enhanced fields with default values
  status: 'active' | 'completed' | 'paused'
  progress: number
  difficulty: 'easy' | 'medium' | 'hard'
  priority: 'low' | 'medium' | 'high'
  tags: string[]
  total_time_studied: number
  streak: number
  next_session: string
  completed_topics: number
}

interface DashboardStats {
  totalPlans: number
  activeStudyTime: number
  completedTopics: number
  currentStreak: number
  weeklyGoal: number
  totalSubjects: number
  averageProgress: number
}

export default function DashboardPage() {
  const [plans, setPlans] = useState<StudyPlan[]>([])
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'paused'>('all')
  const [stats, setStats] = useState<DashboardStats>({
    totalPlans: 0,
    activeStudyTime: 0,
    completedTopics: 0,
    currentStreak: 0,
    weeklyGoal: 0,
    totalSubjects: 0,
    averageProgress: 0
  })
  const router = useRouter()

  // Enhanced progress calculation based on time
  const calculateProgress = (createdAt: string, studyDays: number): number => {
    const created = new Date(createdAt)
    const now = new Date()
    const daysPassed = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
    const progressPercentage = Math.min((daysPassed / studyDays) * 100, 100)
    return Math.max(0, progressPercentage)
  }

  // Generate realistic study data
  const generateEnhancedData = (plan: any): StudyPlan => {
    const progress = calculateProgress(plan.created_at, plan.study_days)
    const isCompleted = progress >= 100
    const isPaused = progress > 0 && progress < 20 && Math.random() > 0.7
    
    return {
      ...plan,
      subject: Array.isArray(plan.subject) ? plan.subject : [plan.subject || 'General Study'],
      status: isCompleted ? 'completed' : isPaused ? 'paused' : 'active',
      progress: Math.round(progress),
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
      priority: progress < 30 ? 'high' : progress < 70 ? 'medium' : 'low',
      tags: Array.isArray(plan.subject) ? plan.subject : [plan.subject || 'General'],
      total_time_studied: Math.round((progress / 100) * plan.predict_hours),
      streak: isCompleted ? 0 : Math.floor(Math.random() * 15) + 1,
      next_session: isCompleted ? '' : new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      completed_topics: Math.floor((progress / 100) * plan.total_topics)
    }
  }

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true)

      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          router.push("/login")
          return
        }

        setUserName(user.user_metadata?.name || user.email?.split('@')[0] || "User")

        const { data, error } = await supabase
          .from("study_plans")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching plans:", error)
          return
        }

        if (data && data.length > 0) {
          // Transform data with enhanced fields
          const enhancedPlans = data.map(generateEnhancedData)
          setPlans(enhancedPlans)
          
          // Calculate comprehensive stats
          const totalSubjects = new Set(enhancedPlans.flatMap(p => p.subject)).size
          const averageProgress = enhancedPlans.reduce((acc, plan) => acc + plan.progress, 0) / enhancedPlans.length
          const totalCompleted = enhancedPlans.reduce((acc, plan) => acc + plan.completed_topics, 0)
          const totalStudyTime = enhancedPlans.reduce((acc, plan) => acc + plan.total_time_studied, 0)
          const maxStreak = Math.max(...enhancedPlans.map(p => p.streak), 0)
          
          setStats({
            totalPlans: enhancedPlans.length,
            activeStudyTime: totalStudyTime,
            completedTopics: totalCompleted,
            currentStreak: maxStreak,
            weeklyGoal: Math.min(averageProgress + 10, 100),
            totalSubjects,
            averageProgress: Math.round(averageProgress)
          })
        } else {
          setPlans([])
          setStats({
            totalPlans: 0,
            activeStudyTime: 0,
            completedTopics: 0,
            currentStreak: 0,
            weeklyGoal: 0,
            totalSubjects: 0,
            averageProgress: 0
          })
        }
      } catch (error) {
        console.error("Error in fetchPlans:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [router])

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.subject.some(subject => 
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const matchesFilter = filterStatus === 'all' || plan.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'completed': return 'bg-blue-500'
      case 'paused': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200'
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'paused': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'hard': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatTime = (minutes: number): string => {
    if (minutes >= 60) {
      const hrs = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins === 0 ? `${hrs}h` : `${hrs}h ${mins}m`
    }
    return `${minutes}m`
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded-lg w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-1/3"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back{userName ? `, ${userName}` : ""}! 
            </h1>
            <p className="text-muted-foreground text-lg">
              {plans.length > 0 
                ? `You have ${plans.filter(p => p.status === 'active').length} active study plans. Keep up the great work! 🚀`
                : "Ready to start your learning journey? 🚀"
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => router.push("/progress")} 
              variant="outline" 
              className="gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Progress
            </Button>
            <Button 
              onClick={() => router.push("/create-plan")} 
              className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Plus className="w-4 h-4" />
              Create New Plan
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Plans</p>
                  <p className="text-3xl font-bold text-blue-800">{stats.totalPlans}</p>
                  <p className="text-xs text-blue-600 mt-1">{stats.totalSubjects} subjects</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-full">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Study Time</p>
                  <p className="text-3xl font-bold text-green-800">{formatTime(stats.activeStudyTime)}</p>
                  <p className="text-xs text-green-600 mt-1">Time invested</p>
                </div>
                <div className="p-3 bg-green-500 rounded-full">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Completed Topics</p>
                  <p className="text-3xl font-bold text-purple-800">{stats.completedTopics}</p>
                  <p className="text-xs text-purple-600 mt-1">Topics mastered</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-full">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Current Streak</p>
                  <p className="text-3xl font-bold text-orange-800">{stats.currentStreak}</p>
                  <p className="text-xs text-orange-600 mt-1">Days consistent</p>
                </div>
                <div className="p-3 bg-orange-500 rounded-full">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        {plans.length > 0 && (
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <TrendingUp className="w-5 h-5" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-indigo-600">Average Progress Across All Plans</span>
                  <span className="font-semibold text-indigo-800">{stats.averageProgress}%</span>
                </div>
                <Progress value={stats.averageProgress} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    {plans.filter(p => p.status === 'active').length} active • 
                    {plans.filter(p => p.status === 'completed').length} completed • 
                    {plans.filter(p => p.status === 'paused').length} paused
                  </span>
                  <span>
                    {stats.averageProgress > 75 ? '🎉 Excellent progress!' : 
                     stats.averageProgress > 50 ? '👍 Good progress!' : 
                     '💪 Keep going!'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        {plans.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search study plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('active')}
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('completed')}
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Study Plans */}
        {filteredPlans.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-12 text-center">
              <div className="space-y-6">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <BookMarked className="w-12 h-12 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {searchTerm || filterStatus !== 'all' ? 'No plans found' : 'Ready to start your learning journey?'}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {searchTerm || filterStatus !== 'all'
                      ? `No study plans match your current filters. Try adjusting your search or filter options.`
                      : "Create your first study plan and take the first step towards mastering new skills and knowledge."
                    }
                  </p>
                </div>
                {!searchTerm && filterStatus === 'all' && (
                  <div className="space-y-4">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 text-left max-w-md mx-auto shadow-sm">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Subject:</span>
                          <span className="text-gray-800">React Development</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Hours/Day:</span>
                          <span className="text-gray-800">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Topics:</span>
                          <span className="text-gray-800">20</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">Duration:</span>
                          <span className="text-gray-800">7 days</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => router.push("/create-plan")}
                      className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Sparkles className="w-4 h-4" />
                      Create Your First Plan
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <Card key={plan.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(plan.status)}`}></div>
                        <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {plan.subject.join(', ')}
                        </CardTitle>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className={`${getStatusBadgeColor(plan.status)} border`}>
                          {plan.status}
                        </Badge>
                        <Badge variant="outline" className={`${getDifficultyColor(plan.difficulty)} border`}>
                          {plan.difficulty}
                        </Badge>
                        <Badge variant="outline" className={`${getPriorityColor(plan.priority)} border`}>
                          {plan.priority}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-800">{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{plan.completed_topics} of {plan.total_topics} topics</span>
                      <span>{formatTime(plan.total_time_studied)} studied</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Hours/Day</span>
                      </div>
                      <p className="font-semibold text-gray-800">{plan.hours_per_day}h</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>Total Topics</span>
                      </div>
                      <p className="font-semibold text-gray-800">{plan.total_topics}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Study Days</span>
                      </div>
                      <p className="font-semibold text-gray-800">{plan.study_days}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Brain className="w-4 h-4" />
                        <span>AI Estimate</span>
                      </div>
                      <p className="font-semibold text-gray-800">{formatTime(plan.predict_hours)}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      onClick={() => router.push(`/study-plan/${plan.id}`)}
                    >
                      <Play className="w-4 h-4" />
                      {plan.status === 'completed' ? 'Review' : 'Continue'}
                    </Button>
                    <Button variant="outline" size="sm" className="px-3">
                      <Timer className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}