"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Star, ExternalLink, Video, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import {
  getProblemStatus,
  toggleProblemStatus,
  toggleProblemStar,
} from "@/lib/supabaseStorage" // NOW USING SUPABASE

type Problem = {
  id: number
  name: string
  difficulty: "Easy" | "Medium" | "Hard"
  hasVideo: boolean
  link: string
  status: string
  starred: boolean
}

type Props = {
  topicName: string
  topicIcon: string
  problems: Problem[]
  userId: string
  topicSlug: string
}


export default function TopicProblemTable({ topicName, topicIcon, problems }: Props) {
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [localData, setLocalData] = useState<Record<number, { status: string; starred: boolean }>>({})

  const slug = topicName.toLowerCase().replace(/\s+/g, "-")

  useEffect(() => {
    const fetchStatus = async () => {
      const map: Record<number, { status: string; starred: boolean }> = {}
      for (const p of problems) {
        const status = await getProblemStatus(slug, p.id)
        map[p.id] = {
          status: status?.status || "not-started",
          starred: status?.starred || false,
        }
      }
      setLocalData(map)
    }
    fetchStatus()
  }, [topicName, problems])

  const handleToggleStatus = async (id: number) => {
    await toggleProblemStatus(slug, id)
    setLocalData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        status: prev[id]?.status === "solved" ? "not-started" : "solved",
      },
    }))
  }

  const handleToggleStar = async (id: number) => {
    await toggleProblemStar(slug, id)
    setLocalData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        starred: !prev[id]?.starred,
      },
    }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-400"
      case "Medium": return "text-yellow-400"
      case "Hard": return "text-red-400"
      default: return "text-gray-400"
    }
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const enhancedProblems = problems.map((p) => ({
    ...p,
    status: localData[p.id]?.status || "not-started",
    starred: localData[p.id]?.starred || false,
  }))

  const sortedProblems = [...enhancedProblems].sort((a, b) => {
    const valA = a[sortField as keyof Problem] as string
    const valB = b[sortField as keyof Problem] as string
    if (!valA || !valB) return 0
    return sortDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA)
  })

  const total = problems.length
  const solved = enhancedProblems.filter((p) => p.status === "solved").length
  const progressPercentage = Math.round((solved / total) * 100)

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 text-white">
      <div className="flex items-center mb-6">
        <Link href="/roadmap">
          <Button variant="outline" size="sm" className="mr-4 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-1" />
            ESC
          </Button>
        </Link>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="text-4xl">{topicIcon}</span>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {topicName}
          </h1>
        </div>
        <p className="text-xl text-gray-400 mb-4">({solved} / {total})</p>
        <div className="max-w-md mx-auto">
          <Progress value={progressPercentage} className="h-3 bg-gray-700" />
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 bg-gray-750">
            <div className="col-span-1 text-sm font-medium text-gray-300">Status</div>
            <div className="col-span-1 text-sm font-medium text-gray-300">Star</div>
            <div className="col-span-6">
              <button onClick={() => handleSort("name")} className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white">
                <span>Problem</span>
                {sortField === "name" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
            </div>
            <div className="col-span-3">
              <button onClick={() => handleSort("difficulty")} className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white">
                <span>Difficulty</span>
                {sortField === "difficulty" && (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
            </div>
            <div className="col-span-1 text-sm font-medium text-gray-300">Solution</div>
          </div>

          <div className="divide-y divide-gray-700">
            {sortedProblems.map((problem) => (
              <div key={problem.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-750 transition-colors">
                <div className="col-span-1 flex items-center">
                  <Checkbox
                    checked={problem.status === "solved"}
                    onCheckedChange={() => handleToggleStatus(problem.id)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                </div>
                <div className="col-span-1 flex items-center">
                  <button onClick={() => handleToggleStar(problem.id)} className="text-gray-400 hover:text-yellow-400">
                    <Star className={`w-5 h-5 ${problem.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </button>
                </div>
                <div className="col-span-6 flex items-center">
                  <a href={problem.link} className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
                    <span className="font-medium">{problem.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="col-span-3 flex items-center">
                  <Badge className={`${getDifficultyColor(problem.difficulty)} bg-transparent border-0 font-medium`}>
                    {problem.difficulty}
                  </Badge>
                </div>
                <div className="col-span-1 flex items-center">
                  {problem.hasVideo && <Video className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-gray-400">
        <p>{solved} problems completed • {total - solved} remaining</p>
      </div>
    </div>
  )
}
