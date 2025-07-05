import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="text-xl text-gray-400 mb-8">
          Join thousands of developers who have improved their coding skills with DSA Tracker.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg">
          Get Started for Free
          <ArrowRight className="ml-2 w-6 h-6" />
        </Button>
      </div>
    </section>
  )
}
