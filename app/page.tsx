
import Hero from "@/components/ui/landing/Hero"
import Features from "@/components/ui/landing/Features"
import Stats from "@/components/ui/landing/Stats"
import CTA from "@/components/ui/landing/CTA"
import Footer from "@/components/ui/Footer"
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
     
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  )
}
