"use client"

import { useEffect, useState } from "react"
import { Trophy, Target, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import TopicCard from "@/components/TopicCard"
import { topics } from "@/lib/topics"
import { getTopicProgress, getUserId } from "@/lib/supabaseStorage" // ✅ use supabase

export default function ProblemsPage() {
  const [solvedCount, setSolvedCount] = useState(0)
  const [topicsStarted, setTopicsStarted] = useState(0)

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.totalQuestions, 0)

  useEffect(() => {
    const fetchProgress = async () => {
      const userId = await getUserId()
      if (!userId) return

      let totalSolved = 0
      let started = 0

      for (const topic of topics) {
        const { solved } = await getTopicProgress(topic.slug)
        totalSolved += solved
        if (solved > 0) started += 1
      }

      setSolvedCount(totalSolved)
      setTopicsStarted(started)
    }

    fetchProgress()
  }, [])

  const percentage = Math.round((solvedCount / totalQuestions) * 100)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your DSA Journey
          </h1>
          <p className="text-gray-400 text-lg">Track your progress and master data structures & algorithms</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <SummaryCard icon={<Trophy className="w-8 h-8 text-yellow-500" />} label="Problems Solved" value={solvedCount} />
          <SummaryCard icon={<Target className="w-8 h-8 text-blue-500" />} label="Total Problems" value={totalQuestions} />
          <SummaryCard icon={<CheckCircle className="w-8 h-8 text-green-500" />} label="Completion" value={`${percentage}%`} />
          <SummaryCard icon={<Clock className="w-8 h-8 text-purple-500" />} label="Topics Started" value={topicsStarted} />
        </div>

        {/* Progress Bar */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Overall Progress</h3>
              <span className="text-lg font-medium text-blue-400">{percentage}% Complete</span>
            </div>
            <Progress value={percentage} className="h-3 bg-gray-700" />
            <p className="text-gray-400 mt-2">{solvedCount} of {totalQuestions} problems solved</p>
          </CardContent>
        </Card>

        {/* Topics Grid */}
        <h2 className="text-2xl font-bold mb-6">DSA Topics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {topics.map(topic => (
            <TopicCard key={topic.slug} {...topic} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          {icon}
          <span className="text-2xl font-bold">{value}</span>
        </div>
        <p className="text-gray-400">{label}</p>
      </CardContent>
    </Card>
  )
}
