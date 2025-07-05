export default function Stats() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <StatCard value="450+" label="Practice Problems" color="text-blue-500" />
          <StatCard value="15+" label="DSA Topics" color="text-green-500" />
          <StatCard value="10K+" label="Active Learners" color="text-purple-500" />
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div>
      <div className={`text-4xl font-bold ${color} mb-2`}>{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  )
}
