// src/services/geminiService.ts
import type { AnalysisReport, Language } from "../types";

// Backend URL 
const BACKEND_URL =
  "https://aeo-labs-production.up.railway.app";

export const analyzeWebsite = async (
  url: string,
  language: Language
): Promise<AnalysisReport> => {
  console.log("BACKEND_URL =", BACKEND_URL); // ⬅️ add this for now

  const res = await fetch(`${BACKEND_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, language }),
  });

  if (!res.ok) {
    console.error("Backend error:", res.status, await res.text());
    throw new Error("Failed to generate report from backend");
  }

  const data = (await res.json()) as AnalysisReport;
  return data;
};
