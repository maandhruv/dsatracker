import { Card, CardContent } from "@/components/ui/card"
import { Target, TrendingUp, Users } from "lucide-react"

export default function Features() {
  return (
    <section className="py-16 px-6 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose DSA Tracker?</h2>
          <p className="text-gray-400 text-lg">Everything you need to excel in your coding journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />}
            title="Structured Learning"
            description="Follow a carefully curated path through essential DSA topics, from basics to advanced concepts."
          />
          <FeatureCard
            icon={<TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />}
            title="Progress Tracking"
            description="Monitor your learning journey with detailed analytics and visual progress indicators."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />}
            title="Community Driven"
            description="Join thousands of developers preparing for interviews and improving their skills."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
      <CardContent className="p-6 text-center">
        {icon}
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}
