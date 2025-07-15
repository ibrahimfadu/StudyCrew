"use client";

import type React from "react";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Brain,
  Clock,
  BookOpen,
  Calendar,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabase-client";
import ProtectedRoute from "@/components/ProtectedRoute";

interface StudyPlan {
  id: string;
  subjects: string[];
  totalTopics: number;
  studyPeriodDays: number;
  dailyHours: number;
  prediction: {
    totalStudyMinutes: number;
    totalStudyHours: number;
    dailyStudyMinutes: number;
    averageTimePerTopic: number;
  };
  schedule: any[];
  recommendations: string[];
}

export default function CreatePlanPage() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [currentSubject, setCurrentSubject] = useState("");
  const [title,setTitle] = useState("")
  const [hoursPerDay, setHoursPerDay] = useState("");
  const [numTopics, setNumTopics] = useState("");
  const [numDays, setNumDays] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);
  const [progress, setProgress] = useState(0);
  const [Predicted_hours, setPredicted_hours] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const addSubject = () => {
    if (currentSubject && !subjects.includes(currentSubject)) {
      setSubjects([...subjects, currentSubject]);
      setCurrentSubject("");
    }
  };

  const removeSubject = (subject: string) => {
    setSubjects(subjects.filter((s) => s !== subject));
  };

  function formatTime(minutes: number): string {
    if (minutes >= 60) {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins === 0 ? `${hrs} hr` : `${hrs} hr ${mins} min`;
    }
    return `${minutes} min`;
  }

  // Handle Submiting form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (subjects.length === 0 || !hoursPerDay || !numTopics || !numDays) {
      toast({
        title: "Error",
        description:
          "Please fill in all required fields and at least one subject.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjects,
          hoursPerDay: Number.parseInt(hoursPerDay),
          numTopics: Number.parseInt(numTopics),
          numDays: Number.parseInt(numDays),
        }),
      });

      const data: { predicted_hours: number } = await response.json();
      const total_minutes = Math.round(data.predict_hours * 60);
      const daily_minutes = Math.round(total_minutes / Number(numDays));
      const time_per_topic = Math.round(total_minutes / Number(numTopics));

      const prediction = {
        totalStudyMinutes: total_minutes,
        totalStudyHours: data.predict_hours,
        dailyStudyMinutes: daily_minutes,
        averageTimePerTopic: time_per_topic,
      };

      const generatedPlanData: StudyPlan = {
        id: crypto.randomUUID(),
        subjects,
        totalTopics: Number(numTopics),
        studyPeriodDays: Number(numDays),
        dailyHours: Number(hoursPerDay),
        prediction,
        schedule: [], // You can implement your scheduler here
        recommendations: [
          "Focus more on tough topics first.",
          "Use the Pomodoro technique: 25 min focus + 5 min break.",
          "Do revision every Sunday.",
        ],
      };

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        setGeneratedPlan(generatedPlanData);
        setIsGenerating(false);
        toast({
          title: "Study plan created!",
          description: `Your personalized study plan is ready.`,
        });
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setProgress(0);
      toast({
        title: "Error",
        description: "Failed to generate study plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  //Saving plan
  const savePlan = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user || !generatedPlan) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to save your plan.",
        variant: "destructive",
      });
      return;
    }

    const { prediction } = generatedPlan;

    const { error: insertError } = await supabase.from("study_plans").insert([
      {
    user_id: user.id,
    title: title,  // ✅ you forgot to add this
    subject: subjects,  // ✅ convert array to string
    hours_per_day: parseInt(hoursPerDay),
    total_topics: parseInt(numTopics),
    study_days: parseInt(numDays),
    predict_hours: prediction.totalStudyHours,  // ✅ prediction is in hours
  },
    ]);

    if (insertError) {
      console.log("Insert error:", insertError.message);
    } else {
      toast({
        title: "Saved!",
        description: "Your plan was saved successfully.",
      });
      router.push("/dashboard");
    }
  };

  if (generatedPlan) {
    return (
      <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Your AI-Generated Study Plan</h1>
            <p className="text-muted-foreground">
              Personalized schedule based on machine learning predictions
            </p>
          </div>

          {/* Plan Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {generatedPlan.subjects.length}
                </div>
                <p className="text-sm text-muted-foreground">Subjects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {generatedPlan.totalTopics}
                </div>
                <p className="text-sm text-muted-foreground">Topics</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {generatedPlan.dailyHours}h
                </div>
                <p className="text-sm text-muted-foreground">
                  Total Study time available
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {generatedPlan.studyPeriodDays}
                </div>
                <p className="text-sm text-muted-foreground">Days</p>
              </CardContent>
            </Card>
          </div>

          {/* ML Predictions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Predictions & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total Study Time</Label>
                  <div className="text-2xl font-bold">
                    {formatTime(generatedPlan.prediction.totalStudyMinutes)}{" "}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Total Time To Complete Study
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Daily Study Time </Label>
                  <div className="text-2xl font-bold">
                    {formatTime(generatedPlan.prediction.dailyStudyMinutes)}{" "}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommended daily study duration
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Time Per Topic</Label>
                  <div className="text-2xl font-bold">
                    {formatTime(generatedPlan.prediction.averageTimePerTopic)}{" "}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Average time needed per topic
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>AI Recommendations</Label>
                <ul className="space-y-1">
                  {generatedPlan.recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-blue-600 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={savePlan} className="flex-1">
              Save Study Plan
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                router.push("/create-plan");
              }}
              className="flex-1 bg-transparent"
            >
              Create New Plan
            </Button>
          </div>
        </div>
      </DashboardLayout>
      </ProtectedRoute>
    );
  }
  return (
    <ProtectedRoute>
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create AI Study Plan</h1>
          <p className="text-muted-foreground">
            Let our machine learning model create a personalized study schedule
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Study Plan Parameters
            </CardTitle>
            <CardDescription>
              Provide your study details for our AI model to generate an
              optimized plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
   <div className="space-y-3">
                <Label>Name your Plan </Label>
                <div className="flex gap-2"></div>
    <Input
        id="title"
        type="text"
        placeholder="Name your study plan(study-1,eg.)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /></div>


              {/* Subjects */}
              <div className="space-y-3">
                <Label>Subjects to Study</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a subject (e.g., Mathematics)"
                    value={currentSubject}
                    onChange={(e) => setCurrentSubject(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSubject())
                    }
                  />
                  <Button type="button" onClick={addSubject} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {subject}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSubject(subject)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Hours Per Day */}
              <div className="space-y-2">
                <Label htmlFor="hours">Hours Available Per Day</Label>
                <Select onValueChange={setHoursPerDay} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select daily study hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="5">5 hours</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="7">7 hours</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="9">9 hours</SelectItem>
                    <SelectItem value="10">10 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Topics */}
              <div className="space-y-2">
                <Label htmlFor="topics">Total Number of Topics</Label>
                <Input
                  id="topics"
                  type="number"
                  placeholder="Enter total topics to cover (e.g., 25)"
                  value={numTopics}
                  onChange={(e) => setNumTopics(e.target.value)}
                  min="1"
                  max="100"
                  required
                />
              </div>

              {/* Number of Days */}
              <div className="space-y-2">
                <Label htmlFor="days">Study Period (Days)</Label>
                <Input
                  id="days"
                  type="number"
                  placeholder="Enter number of days (e.g., 30)"
                  value={numDays}
                  onChange={(e) => setNumDays(e.target.value)}
                  min="1"
                  max="365"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  subjects.length === 0 ||
                  !hoursPerDay ||
                  !numTopics ||
                  !numDays ||
                  isGenerating
                }
              >
                {isGenerating ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Generating AI Study Plan...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate AI Study Plan
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isGenerating && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Brain className="h-12 w-12 text-blue-600 mx-auto animate-pulse" />
                <div>
                  <h3 className="font-semibold">
                    AI is analyzing your study parameters...
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Using machine learning to optimize your study schedule
                  </p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {progress}% complete
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
}
