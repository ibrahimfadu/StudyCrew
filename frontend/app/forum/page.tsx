"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MessageSquare, ThumbsUp, CheckCircle2, Clock } from "lucide-react"
import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Topics", count: 156 },
    { id: "mathematics", name: "Mathematics", count: 45 },
    { id: "physics", name: "Physics", count: 32 },
    { id: "chemistry", name: "Chemistry", count: 28 },
    { id: "biology", name: "Biology", count: 24 },
    { id: "tips", name: "Study Tips", count: 18 },
    { id: "exam-prep", name: "Exam Prep", count: 9 },
  ]

  const forumPosts = [
    {
      id: 1,
      title: "How to solve complex calculus derivatives?",
      author: "Sarah M.",
      avatar: "/placeholder.svg?height=32&width=32",
      category: "Mathematics",
      tags: ["calculus", "derivatives", "help"],
      content:
        "I'm struggling with finding derivatives of complex functions. Can someone explain the chain rule in simple terms?",
      upvotes: 15,
      replies: 8,
      solved: false,
      timeAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "Best study techniques for memorizing formulas",
      author: "Mike T.",
      avatar: "/placeholder.svg?height=32&width=32",
      category: "Study Tips",
      tags: ["memory", "formulas", "techniques"],
      content:
        "What are your go-to methods for memorizing physics and chemistry formulas? I keep forgetting them during exams.",
      upvotes: 23,
      replies: 12,
      solved: true,
      timeAgo: "5 hours ago",
    },
    {
      id: 3,
      title: "Quantum mechanics - wave-particle duality explanation",
      author: "Emma L.",
      avatar: "/placeholder.svg?height=32&width=32",
      category: "Physics",
      tags: ["quantum", "physics", "theory"],
      content: "Can someone help me understand wave-particle duality? I'm preparing for my quantum physics exam.",
      upvotes: 18,
      replies: 6,
      solved: false,
      timeAgo: "1 day ago",
    },
    {
      id: 4,
      title: "Organic chemistry reaction mechanisms",
      author: "David W.",
      avatar: "/placeholder.svg?height=32&width=32",
      category: "Chemistry",
      tags: ["organic", "reactions", "mechanisms"],
      content: "Having trouble understanding SN1 vs SN2 reaction mechanisms. Any tips or resources?",
      upvotes: 12,
      replies: 4,
      solved: false,
      timeAgo: "2 days ago",
    },
  ]

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || post.category.toLowerCase().replace(" ", "-") === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Discussion Forum</h1>
            <p className="text-muted-foreground">Ask questions, share knowledge, and help fellow students</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Ask Question
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions and discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select onValueChange={setSelectedCategory} defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="unsolved">Unsolved</TabsTrigger>
            <TabsTrigger value="my-posts">My Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                          {post.title}
                          {post.solved && <CheckCircle2 className="inline ml-2 h-4 w-4 text-green-600" />}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.timeAgo}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-1 mb-2">
                        <span className="text-sm text-muted-foreground">by {post.author}</span>
                        <Badge variant="outline">{post.category}</Badge>
                        {post.solved && (
                          <Badge variant="default" className="bg-green-600">
                            Solved
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-3">{post.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {post.upvotes}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {post.replies} replies
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="popular" className="space-y-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Popular Posts</h3>
                <p className="text-muted-foreground">Most upvoted and discussed topics will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unsolved" className="space-y-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Unsolved Questions</h3>
                <p className="text-muted-foreground">Questions that still need answers will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-posts" className="space-y-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Your Posts</h3>
                <p className="text-muted-foreground">Your questions and contributions will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
      </ProtectedRoute>
  );
}
