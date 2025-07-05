// lib/localStorage.ts

export const getLocalProblemStatus = (topic: string, problemId: number) => {
  const stored = localStorage.getItem("dsa-progress");
  if (!stored) return null;
  const data = JSON.parse(stored);
  return data?.[topic]?.[problemId] || null;
};

export const toggleProblemStatus = (topic: string, problemId: number) => {
  const stored = localStorage.getItem("dsa-progress");
  const data = stored ? JSON.parse(stored) : {};
  const currentStatus = data?.[topic]?.[problemId]?.status === "solved";

  if (!data[topic]) data[topic] = {};
  data[topic][problemId] = {
    ...data[topic][problemId],
    status: currentStatus ? "not-started" : "solved",
  };

  localStorage.setItem("dsa-progress", JSON.stringify(data));
};

export const toggleProblemStar = (topic: string, problemId: number) => {
  const stored = localStorage.getItem("dsa-progress");
  const data = stored ? JSON.parse(stored) : {};
  const starred = data?.[topic]?.[problemId]?.starred;

  if (!data[topic]) data[topic] = {};
  data[topic][problemId] = {
    ...data[topic][problemId],
    starred: !starred,
  };

  localStorage.setItem("dsa-progress", JSON.stringify(data));
};

export const getTopicProgress = (topic: string): { solved: number } => {
  const stored = localStorage.getItem("dsa-progress");
  if (!stored) return { solved: 0 };
  const data = JSON.parse(stored)?.[topic] || {};
  const solved = Object.values(data).filter((p: any) => p.status === "solved").length;
  return { solved };
};
