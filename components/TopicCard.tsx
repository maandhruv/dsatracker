"use client"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getTopicProgress } from "@/lib/supabaseStorage"
import { client as supabase } from '@/lib/supabaseClient'

type Props = {
  name: string
  slug: string
  icon: string
  totalQuestions: number
  difficulty: string
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-400 bg-green-400/10"
    case "Medium":
      return "text-yellow-400 bg-yellow-400/10"
    case "Hard":
      return "text-red-400 bg-red-400/10"
    default:
      return "text-gray-400 bg-gray-400/10"
  }
}

export default function TopicCard({
  name,
  slug,
  icon,
  totalQuestions,
  difficulty,
}: Props) {
  const [solved, setSolved] = useState(0)

  useEffect(() => {
    const fetchProgress = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) return

      const { solved } = await getTopicProgress(slug)
      setSolved(solved)
    }

    fetchProgress()
  }, [slug])


  const progress = Math.round((solved / totalQuestions) * 100)
  const status = solved > 0 ? (solved === totalQuestions ? "completed" : "in-progress") : "not-started"

  return (
    <Link href={`/roadmap/${slug}`} className="block h-full">
      <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105">
        <CardContent className="p-6 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <h3 className="font-semibold text-white">{name}</h3>
                <Badge className={`text-xs ${getDifficultyColor(difficulty)}`}>
                  {difficulty}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-gray-300">
                  {solved}/{totalQuestions}
                </span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" />
              <span className="text-xs text-gray-400">{progress}% Complete</span>
            </div>
          </div>
          <div className="mt-4">
            <Button
              size="sm"
              className={status === "in-progress" ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"}
              variant={status === "in-progress" ? "default" : "outline"}
            >
              {status === "in-progress" ? "Continue" : "Start"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
