'use client';

import { useEffect, useState } from "react";
import { questionsData } from "@/lib/questions";
import TopicProblemTable from "@/components/TopicProblemTable";
import { useRouter, useParams } from "next/navigation";
import { client as supabase } from "@/lib/supabaseClient";

export default function TopicPage() {
  const router = useRouter();
  const params = useParams(); // ✅ fix: use hook instead of Server Component prop
  const topicParam = params.topic as string;
  const topicKey = topicParam as keyof typeof questionsData;

  const [problems, setProblems] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [topicData, setTopicData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = questionsData[topicKey];
      if (!data) {
        router.replace("/404");
        return;
      }
      setTopicData(data);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }

      setUserId(user.id);

      const { data: progressData, error } = await supabase
        .from("problem_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("topic_slug", topicKey);

      if (error) {
        console.error("Error fetching progress:", error.message);
      }

      const merged = data.problems.map((problem) => {
        const progress = progressData?.find((p) => p.problem_id === problem.id);
        return {
          ...problem,
          difficulty: problem.difficulty as "Easy" | "Medium" | "Hard",
          status: progress?.status ?? "not-started",
          starred: progress?.starred ?? false,
        };
      });

      setProblems(merged);
    };

    loadData();
  }, [topicKey, router]);

  if (!topicData || !userId) return <div className="p-4">Loading...</div>;

  return (
    <TopicProblemTable
      topicName={topicData.name}
      topicIcon={topicData.icon}
      problems={problems}
      userId={userId}
      topicSlug={topicKey}
    />
  );
}
