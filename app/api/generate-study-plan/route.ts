import { type NextRequest, NextResponse } from "next/server"

// Simulate the ML model prediction function
function predictStudyTime(numSubjects: number, hoursPerDay: number, numTopics: number, numDays: number) {
  // This is a simplified version of the ML model logic
  // In production, you would load the actual joblib model

  const maxPossibleMinutes = hoursPerDay * numDays * 60
  const baseTargetMinutes = numTopics * 35 + numSubjects * 75
  const recommendedMinutes = Math.min(maxPossibleMinutes * 0.9, Math.max(numTopics * 10, baseTargetMinutes))

  const totalMinutes = Math.max(0, Math.round(recommendedMinutes))
  const averageTimePerTopic = numTopics > 0 ? totalMinutes / numTopics : 0

  return {
    totalMinutes,
    averageTimePerTopic,
    dailyMinutes: totalMinutes / numDays,
    totalHours: totalMinutes / 60,
  }
}

function generateStudySchedule(
  subjects: string[],
  hoursPerDay: number,
  numTopics: number,
  numDays: number,
  prediction: any,
) {
  const schedule = []
  const dailyMinutes = prediction.dailyMinutes
  const minutesPerSubject = dailyMinutes / subjects.length

  for (let day = 1; day <= Math.min(numDays, 7); day++) {
    const daySchedule = {
      day: `Day ${day}`,
      sessions: subjects.map((subject, index) => ({
        subject,
        startTime: `${8 + index * 2}:00`,
        endTime: `${8 + index * 2 + Math.floor(minutesPerSubject / 60)}:${String(Math.round(minutesPerSubject % 60)).padStart(2, "0")}`,
        duration: Math.round(minutesPerSubject),
        topics: Math.ceil(numTopics / subjects.length / numDays),
      })),
    }
    schedule.push(daySchedule)
  }

  return schedule
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subjects, hoursPerDay, numTopics, numDays, preferences } = body

    // Validate input
    if (!subjects || subjects.length === 0) {
      return NextResponse.json({ error: "At least one subject is required" }, { status: 400 })
    }

    if (!hoursPerDay || !numTopics || !numDays) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Use ML model to predict study time
    const prediction = predictStudyTime(subjects.length, hoursPerDay, numTopics, numDays)

    // Generate study schedule
    const schedule = generateStudySchedule(subjects, hoursPerDay, numTopics, numDays, prediction)

    const studyPlan = {
      id: `plan_${Date.now()}`,
      subjects,
      totalTopics: numTopics,
      studyPeriodDays: numDays,
      dailyHours: hoursPerDay,
      prediction: {
        totalStudyMinutes: prediction.totalMinutes,
        totalStudyHours: Math.round(prediction.totalHours * 100) / 100,
        dailyStudyMinutes: Math.round(prediction.dailyMinutes),
        averageTimePerTopic: Math.round(prediction.averageTimePerTopic * 100) / 100,
      },
      schedule,
      preferences,
      createdAt: new Date().toISOString(),
      recommendations: [
        `Based on ${subjects.length} subjects and ${numTopics} topics, you'll need approximately ${Math.round(prediction.totalHours)} hours of study time.`,
        `Plan to study ${Math.round(prediction.dailyMinutes)} minutes per day on average.`,
        `Each topic will require approximately ${Math.round(prediction.averageTimePerTopic)} minutes of focused study time.`,
        "Remember to take regular breaks every 25-30 minutes to maintain focus.",
        "Review previously covered topics weekly to improve retention.",
      ],
    }

    return NextResponse.json({ success: true, studyPlan })
  } catch (error) {
    console.error("Error generating study plan:", error)
    return NextResponse.json({ error: "Failed to generate study plan" }, { status: 500 })
  }
}
