import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Code, Trophy, Edit3, Github, Linkedin, Mail, Star } from "lucide-react"

export default function Component() {
  const userStats = {
    totalSolved: 127,
    rank: "Expert",
  }

  const recentActivity = [
    { problem: "Two Sum", topic: "Arrays", difficulty: "Easy", date: "2 hours ago", status: "solved" },
    { problem: "Valid Parentheses", topic: "Stacks", difficulty: "Easy", date: "5 hours ago", status: "solved" },
    {
      problem: "Merge Two Sorted Lists",
      topic: "Linked Lists",
      difficulty: "Easy",
      date: "1 day ago",
      status: "solved",
    },
    { problem: "Binary Tree Inorder", topic: "Trees", difficulty: "Medium", date: "1 day ago", status: "attempted" },
    { problem: "Longest Substring", topic: "Strings", difficulty: "Medium", date: "2 days ago", status: "solved" },
    { problem: "Maximum Subarray", topic: "Arrays", difficulty: "Easy", date: "3 days ago", status: "solved" },
    {
      problem: "Climbing Stairs",
      topic: "Dynamic Programming",
      difficulty: "Easy",
      date: "3 days ago",
      status: "solved",
    },
    { problem: "Best Time to Buy Stock", topic: "Arrays", difficulty: "Easy", date: "4 days ago", status: "solved" },
  ]

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="bg-blue-600 text-white text-xl">JD</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <Badge className="bg-purple-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    {userStats.rank}
                  </Badge>
                </div>
                <p className="text-gray-400 mb-3">
                  Full-stack developer passionate about algorithms and problem-solving. Currently preparing for FAANG
                  interviews.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>john.doe@email.com</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Github className="w-4 h-4" />
                    <span>@johndoe</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Linkedin className="w-4 h-4" />
                    <span>john-doe</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-lg font-bold text-yellow-500">{userStats.totalSolved}</span>
                  <span className="text-sm text-gray-400">problems solved</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${activity.status === "solved" ? "bg-green-500" : "bg-yellow-500"}`}
                      ></div>
                      <div>
                        <h4 className="font-medium text-white">{activity.problem}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            {activity.topic}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(activity.difficulty)}`}>
                            {activity.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{activity.date}</p>
                      <Badge
                        className={`text-xs mt-1 ${activity.status === "solved" ? "bg-green-600" : "bg-yellow-600"}`}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
