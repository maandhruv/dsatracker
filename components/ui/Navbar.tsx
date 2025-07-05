"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"
import Link from "next/link"
import { client as supabase } from "@/lib/supabaseClient"
import Image from "next/image"


export default function Navbar() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/" // reload to reset state
  }

  return (
    <nav className="border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">DSA Tracker</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Home
              </Button>
            </Link>

            <Link href="/roadmap">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Roadmap
              </Button>
            </Link>

            {user ? (
              <>
                <Image
                  src={user?.user_metadata?.avatar_url}
                  alt={user?.user_metadata?.name || 'User avatar'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent p-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
