"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Master Data Structures & Algorithms
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Track your progress, solve problems systematically, and ace your coding interviews with our comprehensive
          DSA practice platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/roadmap">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Learning
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
         
        </div>
      </div>
    </section>
  )
}
