import { Code } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Code className="w-6 h-6 text-blue-500" />
            <span className="font-semibold">DSA Tracker</span>
          </div>
          <div className="flex items-center space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; 2024 DSA Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
