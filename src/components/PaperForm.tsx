"use client";

import { useState } from "react";
import {
  PaperRequirements,
  FIELDS_OF_STUDY,
  AUDIENCE_LEVELS,
  FORM_STEPS,
} from "@/lib/types";
import { ChevronLeft, ChevronRight, AlertCircle, CheckCircle, FileText } from "lucide-react";

interface PaperFormProps {
  initialData: PaperRequirements;
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: (data: PaperRequirements) => void;
  error: string | null;
}

export default function PaperForm({
  initialData,
  currentStep,
  onStepChange,
  onComplete,
  error,
}: PaperFormProps) {
  const [data, setData] = useState<PaperRequirements>(initialData);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const totalSteps = FORM_STEPS.length;

  const update = (field: keyof PaperRequirements, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return data.title.trim().length >= 5;
      case 2:
        return data.field.trim().length > 0 && data.targetAudience.trim().length > 0;
      case 3:
        return data.pageCount >= 4 && data.pageCount <= 50;
      case 4:
        return data.researchQuestions.trim().length >= 10;
      case 5:
        return data.mainPoints.trim().length >= 5;
      default:
        return true;
    }
  };

  const canAdvance = isStepValid(currentStep);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      onStepChange(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(data);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-sm";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-2";
  const hintClass = "text-xs text-slate-400 mt-1.5";

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Step indicators */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          {FORM_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => {
                if (step.id <= currentStep || isStepValid(step.id - 1)) {
                  onStepChange(step.id);
                }
              }}
              title={step.title}
              className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                step.id === currentStep
                  ? "bg-green-600 text-white shadow-lg shadow-green-200 scale-110"
                  : step.id < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {step.id < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                step.id
              )}
            </button>
          ))}
        </div>
        {/* Progress line */}
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          <span className="text-xs text-slate-500">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-xs font-medium text-slate-700">
            {FORM_STEPS[currentStep - 1].description}
          </span>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          {FORM_STEPS[currentStep - 1].title}
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          {FORM_STEPS[currentStep - 1].description}
        </p>

        {/* Step 1 – Topic & Title */}
        {currentStep === 1 && (
          <div>
            <label className={labelClass} htmlFor="title">
              Research Paper Title *
            </label>
            <input
              id="title"
              type="text"
              className={inputClass}
              placeholder="e.g. Deep Learning Approaches for Early Alzheimer's Detection"
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              autoFocus
            />
            <p className={hintClass}>
              Enter a descriptive working title for your paper (min 5 characters).
            </p>
            {touched.title && data.title.length > 0 && data.title.length < 5 && (
              <p className="text-xs text-red-500 mt-1">
                Title must be at least 5 characters.
              </p>
            )}
          </div>
        )}

        {/* Step 2 – Field & Audience */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className={labelClass} htmlFor="field">
                Field of Study *
              </label>
              <select
                id="field"
                className={inputClass}
                value={data.field}
                onChange={(e) => update("field", e.target.value)}
              >
                <option value="">Select a field...</option>
                {FIELDS_OF_STUDY.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <p className={hintClass}>
                The primary academic discipline of the paper.
              </p>
            </div>
            <div>
              <label className={labelClass} htmlFor="audience">
                Target Audience *
              </label>
              <select
                id="audience"
                className={inputClass}
                value={data.targetAudience}
                onChange={(e) => update("targetAudience", e.target.value)}
              >
                <option value="">Select audience level...</option>
                {AUDIENCE_LEVELS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <p className={hintClass}>
                This determines the technical depth and language of the paper.
              </p>
            </div>
          </div>
        )}

        {/* Step 3 – Length & Format */}
        {currentStep === 3 && (
          <div>
            <label className={labelClass} htmlFor="pageCount">
              Approximate Page Count *
            </label>
            <div className="flex items-center gap-4">
              <input
                id="pageCount"
                type="range"
                min="4"
                max="20"
                step="1"
                value={data.pageCount}
                onChange={(e) => update("pageCount", parseInt(e.target.value))}
                className="flex-1 accent-green-600"
              />
              <div className="w-20 text-center bg-green-50 text-green-700 font-bold text-lg rounded-xl py-2">
                {data.pageCount}
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
              <span>4 pages</span>
              <span>~{Math.round(data.pageCount * 500)} words</span>
              <span>20 pages</span>
            </div>
            <p className={hintClass}>
              Standard IEEE conference papers are 6–8 pages; journal papers 10–20 pages.
            </p>
          </div>
        )}

        {/* Step 4 – Research Questions */}
        {currentStep === 4 && (
          <div>
            <label className={labelClass} htmlFor="rq">
              Research Questions / Thesis Statement *
            </label>
            <textarea
              id="rq"
              className={`${inputClass} min-h-[160px] resize-y`}
              placeholder="e.g. RQ1: Can convolutional neural networks outperform traditional ML methods in early Alzheimer's detection from MRI scans? RQ2: What preprocessing steps most significantly impact model accuracy?"
              value={data.researchQuestions}
              onChange={(e) => update("researchQuestions", e.target.value)}
            />
            <p className={hintClass}>
              State your primary research questions or thesis. These drive the
              paper&apos;s narrative and conclusions.
            </p>
          </div>
        )}

        {/* Step 5 – Main Points */}
        {currentStep === 5 && (
          <div>
            <label className={labelClass} htmlFor="mainPoints">
              Main Points / Key Sections to Cover *
            </label>
            <textarea
              id="mainPoints"
              className={`${inputClass} min-h-[160px] resize-y`}
              placeholder="e.g. - Overview of Alzheimer's pathology&#10;- CNN architectures for medical imaging&#10;- Dataset preprocessing and augmentation&#10;- Comparative baseline models&#10;- Clinical deployment considerations"
              value={data.mainPoints}
              onChange={(e) => update("mainPoints", e.target.value)}
            />
            <p className={hintClass}>
              List the key topics, arguments, and sections you want covered.
              One point per line works best.
            </p>
          </div>
        )}

        {/* Step 6 – Specific Sources */}
        {currentStep === 6 && (
          <div>
            <label className={labelClass} htmlFor="sources">
              Specific Sources / References to Include
              <span className="ml-2 text-xs font-normal text-slate-400">
                (optional)
              </span>
            </label>
            <textarea
              id="sources"
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder="e.g. LeCun et al. (1998) - Gradient-Based Learning Applied to Document Recognition&#10;Szegedy et al. (2015) - Going Deeper with Convolutions"
              value={data.specificSources}
              onChange={(e) => update("specificSources", e.target.value)}
            />
            <p className={hintClass}>
              List any specific papers, books, or authors you want cited. The
              generator will incorporate these into the references section.
            </p>
          </div>
        )}

        {/* Step 7 – IEEE Specifics */}
        {currentStep === 7 && (
          <div>
            <label className={labelClass} htmlFor="ieeeReqs">
              IEEE Format Requirements
              <span className="ml-2 text-xs font-normal text-slate-400">
                (optional)
              </span>
            </label>
            <textarea
              id="ieeeReqs"
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder="e.g. IEEE TNNLS format; include at least 3 tables and 2 figures; use double-column layout; follow IEEE Author Guidelines 2024"
              value={data.ieeeRequirements}
              onChange={(e) => update("ieeeRequirements", e.target.value)}
            />
            <p className={hintClass}>
              Specify any particular IEEE template, conference, or journal
              format requirements. Leave blank for standard IEEE conference
              format.
            </p>
          </div>
        )}

        {/* Step 8 – Additional Instructions */}
        {currentStep === 8 && (
          <div>
            <label className={labelClass} htmlFor="additional">
              Additional Instructions & Constraints
              <span className="ml-2 text-xs font-normal text-slate-400">
                (optional)
              </span>
            </label>
            <textarea
              id="additional"
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder="e.g. Avoid mentioning GPT models directly; emphasize real-world clinical deployment; use passive voice; include an ethical considerations section"
              value={data.additionalInstructions}
              onChange={(e) => update("additionalInstructions", e.target.value)}
            />
            <p className={hintClass}>
              Any other instructions, tone preferences, constraints, or content
              requirements for the generated paper.
            </p>
          </div>
        )}

        {/* Step 9 – Review & Submit */}
        {currentStep === 9 && (
          <div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 text-sm mb-6">
              {[
                { label: "Title", value: data.title },
                { label: "Field of Study", value: data.field },
                { label: "Target Audience", value: data.targetAudience },
                {
                  label: "Page Count",
                  value: `${data.pageCount} pages (~${Math.round(
                    data.pageCount * 500
                  ).toLocaleString()} words)`,
                },
                {
                  label: "Research Questions",
                  value:
                    data.researchQuestions.substring(0, 100) +
                    (data.researchQuestions.length > 100 ? "…" : ""),
                },
                {
                  label: "Main Points",
                  value:
                    data.mainPoints.substring(0, 100) +
                    (data.mainPoints.length > 100 ? "…" : ""),
                },
                {
                  label: "Specific Sources",
                  value: data.specificSources || "None specified",
                },
                {
                  label: "IEEE Requirements",
                  value: data.ieeeRequirements || "Standard IEEE conference format",
                },
                {
                  label: "Additional Instructions",
                  value: data.additionalInstructions || "None",
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 px-5 py-3">
                  <span className="w-40 flex-shrink-0 font-medium text-slate-500">
                    {label}
                  </span>
                  <span className="text-slate-900 flex-1 break-words">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex gap-3">
              <FileText className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800 mb-1">
                  Ready to Submit
                </p>
                <p className="text-xs text-green-600">
                  Your request details are ready. I will use AI to write your IEEE paper and upload it to you in your chosen format.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            disabled={!canAdvance}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition shadow-lg shadow-green-200"
          >
            Submit Request
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
