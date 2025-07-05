// app/login/page.tsx
"use client"
import { client } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Github } from "lucide-react"

export default function LoginPage() {
  const signIn = async () => {
    await client.auth.signInWithOAuth({ provider: 'github' }) // or use 'email'
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="w-12 h-12 text-blue-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              DSA Tracker
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Sign in to track your progress</p>
        </div>

        {/* Login Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-8">
            <div className="space-y-6">
              <Button
                onClick={signIn}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 py-3 text-base font-medium"
                size="lg"
              >
                <Github className="w-5 h-5 mr-3" />
                Continue with GitHub
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            New to DSA Tracker? <span className="text-gray-400">Just sign in with GitHub to get started!</span>
          </p>
        </div>
      </div>
    </div>
  )
}
