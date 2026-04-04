"use client";

import { useEffect, useState } from "react";
import { PaperRequirements } from "@/lib/types";
import { CheckCircle, Loader2 } from "lucide-react";

interface GenerationProgressProps {
  requirements: PaperRequirements;
}

interface ProgressStep {
  id: string;
  label: string;
  detail: string;
  durationMs: number;
}

const STAGES: ProgressStep[] = [
  {
    id: "init",
    label: "Reviewing your request details",
    detail: "Checking your topic, format, and key instructions…",
    durationMs: 800,
  },
  {
    id: "outline",
    label: "Preparing writing outline",
    detail: "Planning IEEE section flow for manual drafting…",
    durationMs: 1000,
  },
  {
    id: "abstract",
    label: "Drafting abstract & keywords",
    detail: "Drafting a clear summary and key terms…",
    durationMs: 1200,
  },
  {
    id: "intro",
    label: "Writing introduction",
    detail: "Building motivation, context, and contributions…",
    durationMs: 1400,
  },
  {
    id: "litreview",
    label: "Writing literature review",
    detail: "Covering related works and research gaps…",
    durationMs: 1600,
  },
  {
    id: "methodology",
    label: "Writing methodology",
    detail: "Describing approach, setup, and implementation…",
    durationMs: 1500,
  },
  {
    id: "results",
    label: "Drafting results",
    detail: "Structuring findings and comparative analysis…",
    durationMs: 1300,
  },
  {
    id: "discussion",
    label: "Writing discussion & conclusion",
    detail: "Finalizing insights, limitations, and future work…",
    durationMs: 1200,
  },
  {
    id: "refs",
    label: "Formatting IEEE references",
    detail: "Formatting references in IEEE style…",
    durationMs: 900,
  },
  {
    id: "qa",
    label: "Quality review",
    detail: "Cross-checking instructions and consistency…",
    durationMs: 1100,
  },
  {
    id: "finalize",
    label: "Preparing final draft",
    detail: "Preparing your preview and delivery files…",
    durationMs: 800,
  },
];

export default function GenerationProgress({
  requirements,
}: GenerationProgressProps) {
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    let cumulativeDelay = 0;
    const totalDuration = STAGES.reduce((s, st) => s + st.durationMs, 0);
    let elapsed = 0;

    const timers: ReturnType<typeof setTimeout>[] = [];

    STAGES.forEach((stage, idx) => {
      const t = setTimeout(() => {
        setCurrentStageIndex(idx);
        elapsed += stage.durationMs;
        setOverallProgress(Math.min(98, Math.round((elapsed / totalDuration) * 100)));
        if (idx > 0) {
          setCompletedStages((prev) => [...prev, STAGES[idx - 1].id]);
        }
      }, cumulativeDelay);

      timers.push(t);
      cumulativeDelay += stage.durationMs;
    });

    // Complete the last stage
    const finalTimer = setTimeout(() => {
      setCompletedStages(STAGES.map((s) => s.id));
      setCurrentStageIndex(STAGES.length);
      setOverallProgress(100);
    }, cumulativeDelay);
    timers.push(finalTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="relative inline-flex mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              {overallProgress < 100 ? (
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              ) : (
                <CheckCircle className="w-10 h-10 text-green-500" />
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {overallProgress < 100
              ? "Preparing Your Paper"
              : "Draft Ready!"}
          </h2>
          <p className="text-slate-500 text-sm">
            {overallProgress < 100
              ? `Working on "${requirements.title || "your research paper"}" in IEEE format…`
              : "Your paper draft is ready for preview and delivery."}
          </p>
        </div>

        {/* Overall progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Overall progress</span>
            <span className="font-semibold text-blue-600">{overallProgress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Stage list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {STAGES.map((stage, idx) => {
            const isDone = completedStages.includes(stage.id);
            const isActive =
              currentStageIndex === idx && overallProgress < 100;
            const isPending = !isDone && !isActive;

            return (
              <div
                key={stage.id}
                className={`flex items-center gap-4 px-5 py-3.5 border-b last:border-0 border-slate-50 transition-colors ${
                  isActive ? "bg-blue-50" : isDone ? "bg-white" : "bg-white"
                }`}
              >
                {/* Status icon */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      isDone
                        ? "text-slate-500 line-through decoration-1"
                        : isActive
                        ? "text-blue-700"
                        : isPending
                        ? "text-slate-400"
                        : "text-slate-600"
                    }`}
                  >
                    {stage.label}
                  </p>
                  {isActive && (
                    <p className="text-xs text-blue-500 mt-0.5 truncate">
                      {stage.detail}
                    </p>
                  )}
                </div>

                {/* Stage number */}
                <span className="flex-shrink-0 text-xs text-slate-300">
                  {idx + 1}/{STAGES.length}
                </span>
              </div>
            );
          })}
        </div>

        {overallProgress === 100 && (
          <p className="text-center text-sm text-green-600 font-medium mt-6 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Draft preparation completed
          </p>
        )}
      </div>
    </div>
  );
}
