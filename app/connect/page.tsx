"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, UserPlus, Clock, CheckCircle, X } from "lucide-react"
import { useState } from "react"

export default function ConnectPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("")

  const suggestedBuddies = [
    {
      id: 1,
      name: "Alice Johnson",
      subject: "Mathematics",
      status: "online",
      studyHours: "4-6 hours/day",
      avatar: "/placeholder.svg?height=40&width=40",
      compatibility: 95,
    },
    {
      id: 2,
      name: "Bob Smith",
      subject: "Physics",
      status: "offline",
      studyHours: "2-4 hours/day",
      avatar: "/placeholder.svg?height=40&width=40",
      compatibility: 88,
    },
    {
      id: 3,
      name: "Carol Davis",
      subject: "Chemistry",
      status: "online",
      studyHours: "6-8 hours/day",
      avatar: "/placeholder.svg?height=40&width=40",
      compatibility: 92,
    },
    {
      id: 4,
      name: "David Wilson",
      subject: "Biology",
      status: "studying",
      studyHours: "3-5 hours/day",
      avatar: "/placeholder.svg?height=40&width=40",
      compatibility: 85,
    },
  ]

  const incomingRequests = [
    {
      id: 1,
      name: "Emma Brown",
      subject: "Mathematics",
      message: "Hi! I saw we have similar study schedules. Would you like to be study partners?",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "2 hours ago",
    },
    {
      id: 2,
      name: "Frank Miller",
      subject: "Physics",
      message: "Looking for someone to practice problem-solving with!",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "1 day ago",
    },
  ]

  const sentRequests = [
    {
      id: 1,
      name: "Grace Lee",
      subject: "Chemistry",
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
      sentTime: "3 hours ago",
    },
    {
      id: 2,
      name: "Henry Taylor",
      subject: "Biology",
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
      sentTime: "1 day ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "studying":
        return "bg-blue-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online"
      case "studying":
        return "Studying"
      case "offline":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <DashboardLayout>
      {/* Main content container with proper spacing */}
      <div className="w-full max-w-7xl mx-auto space-y-6 relative">
        <div>
          <h1 className="text-3xl font-bold">Connect With Students</h1>
          <p className="text-muted-foreground">Find study partners and build your learning community</p>
        </div>

        {/* Search and Filters - Fixed positioning */}
        <Card className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search students by name or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs container with proper z-index */}
        <div className="relative z-0">
          <Tabs defaultValue="suggested" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="suggested">Suggested Buddies</TabsTrigger>
              <TabsTrigger value="incoming" className="relative">
                Incoming Requests
                {incomingRequests.length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {incomingRequests.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="sent">Sent Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="suggested" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {suggestedBuddies.map((buddy) => (
                  <Card key={buddy.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={buddy.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {buddy.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(buddy.status)}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{buddy.name}</h3>
                            <p className="text-sm text-muted-foreground">{buddy.subject}</p>
                            <p className="text-xs text-muted-foreground">{buddy.studyHours}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            {buddy.compatibility}% match
                          </Badge>
                          <p className="text-xs text-muted-foreground">{getStatusText(buddy.status)}</p>
                        </div>
                      </div>
                      <Button className="w-full" size="sm">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Send Request
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="incoming" className="space-y-4 mt-6">
              <div className="space-y-4">
                {incomingRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={request.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {request.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg truncate">{request.name}</h3>
                            <div className="flex items-center text-xs text-muted-foreground ml-2">
                              <Clock className="mr-1 h-3 w-3" />
                              {request.time}
                            </div>
                          </div>
                          <Badge variant="outline" className="mb-3">
                            {request.subject}
                          </Badge>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{request.message}</p>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Accept
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <X className="mr-2 h-4 w-4" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sent" className="space-y-4 mt-6">
              <div className="space-y-4">
                {sentRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={request.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {request.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{request.name}</h3>
                            <Badge variant="outline">{request.subject}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            Pending
                          </Badge>
                          <p className="text-xs text-muted-foreground">Sent {request.sentTime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
