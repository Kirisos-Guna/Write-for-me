"use client";

import { useState } from "react";
import { PaperRequirements, GeneratedPaper, FORM_STEPS } from "@/lib/types";
import PaperForm from "@/components/PaperForm";
import GenerationProgress from "@/components/GenerationProgress";
import PaperPreview from "@/components/PaperPreview";
import { FileText } from "lucide-react";
import Link from "next/link";

type AppState = "form" | "generating" | "preview";

const defaultRequirements: PaperRequirements = {
  title: "",
  field: "",
  pageCount: 8,
  researchQuestions: "",
  mainPoints: "",
  specificSources: "",
  targetAudience: "",
  ieeeRequirements: "",
  additionalInstructions: "",
};

export default function GeneratePage() {
  const [appState, setAppState] = useState<AppState>("form");
  const [currentStep, setCurrentStep] = useState(1);
  const [requirements, setRequirements] =
    useState<PaperRequirements>(defaultRequirements);
  const [generatedPaper, setGeneratedPaper] = useState<GeneratedPaper | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleFormComplete = async (reqs: PaperRequirements) => {
    setRequirements(reqs);
    setAppState("generating");
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqs),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Request processing failed.");
      }

      const data = await response.json();
      setGeneratedPaper(data.paper);
      // Transition to preview after a short delay so progress can finish its animation
      setTimeout(() => setAppState("preview"), 500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setAppState("form");
      setCurrentStep(FORM_STEPS.length);
    }
  };

  const handleRegenerate = () => {
    setAppState("form");
    setCurrentStep(1);
    setGeneratedPaper(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Write for Me
            </span>
          </Link>
          {appState === "form" && (
            <span className="text-sm text-slate-500">
              Step {currentStep} of {FORM_STEPS.length} —{" "}
              {FORM_STEPS[currentStep - 1]?.title}
            </span>
          )}
          {appState === "preview" && generatedPaper && (
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Draft ready — {generatedPaper.wordCount.toLocaleString()} words
              </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {appState === "form" && (
          <PaperForm
            initialData={requirements}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onComplete={handleFormComplete}
            error={error}
          />
        )}
        {appState === "generating" && (
          <GenerationProgress requirements={requirements} />
        )}
        {appState === "preview" && generatedPaper && (
          <PaperPreview
            paper={generatedPaper}
            onRegenerate={handleRegenerate}
          />
        )}
      </main>
    </div>
  );
}
