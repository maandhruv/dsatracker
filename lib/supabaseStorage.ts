import { client as supabase } from '@/lib/supabaseClient'

export const getUserId = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id
}

// Fetch specific problem status
export const getProblemStatus = async (topic: string, problemId: number) => {
  const user_id = await getUserId()
  const { data, error } = await supabase
    .from('problem_progress')
    .select('status, starred')
    .eq('user_id', user_id)
    .eq('topic_slug', topic)
    .eq('problem_id', problemId)
    .single()
  return error ? null : data
}

// Toggle status (solved <-> not-started)
export const toggleProblemStatus = async (topic: string, problemId: number) => {
  const user_id = await getUserId()
  const { data: existing } = await supabase
    .from('problem_progress')
    .select('status')
    .eq('user_id', user_id)
    .eq('topic_slug', topic) 
    .eq('problem_id', problemId)
    .single()

  const newStatus = existing?.status === 'solved' ? 'not-started' : 'solved'

  const { error } = await supabase
    .from('problem_progress')
    .upsert({
      user_id,
      topic_slug: topic,     // ✅ FIXED
      problem_id: problemId,
      status: newStatus,
    }, { onConflict: 'user_id,topic_slug,problem_id' }) // ✅ FIXED

  if (error) console.error(error)
}

// Toggle star
export const toggleProblemStar = async (topic: string, problemId: number) => {
  const user_id = await getUserId()
  const { data: existing } = await supabase
    .from('problem_progress')
    .select('starred')
    .eq('user_id', user_id)
    .eq('topic_slug', topic) // ✅ FIXED
    .eq('problem_id', problemId)
    .single()

  const newStar = !existing?.starred

  const { error } = await supabase
    .from('problem_progress')
    .upsert({
      user_id,
      topic_slug: topic,     
      problem_id: problemId,
      starred: newStar,
    }, { onConflict: 'user_id,topic_slug,problem_id' }) // ✅ FIXED

  if (error) console.error(error)
}

// Get total solved problems for a topic
export const getTopicProgress = async (topic: string): Promise<{ solved: number }> => {
  const user_id = await getUserId()
  const { data, error } = await supabase
    .from('problem_progress')
    .select('*')
    .eq('user_id', user_id)
    .eq('topic_slug', topic) 
    .eq('status', 'solved')

  return { solved: data?.length || 0 }
}
