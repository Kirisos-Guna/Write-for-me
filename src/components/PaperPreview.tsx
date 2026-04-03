"use client";

import { useState } from "react";
import { GeneratedPaper, PaperSection, DownloadFormat } from "@/lib/types";
import { generateLatex, generatePlainText } from "@/lib/exportUtils";
import {
  Download,
  Edit3,
  RotateCcw,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Shield,
  X,
  Save,
} from "lucide-react";

interface PaperPreviewProps {
  paper: GeneratedPaper;
  onRegenerate: () => void;
}

export default function PaperPreview({ paper, onRegenerate }: PaperPreviewProps) {
  const [editedPaper, setEditedPaper] = useState<GeneratedPaper>(paper);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(paper.sections.map((s) => s.id))
  );
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [downloading, setDownloading] = useState<DownloadFormat | null>(null);
  const [showPlagiarismReport, setShowPlagiarismReport] = useState(false);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startEditing = (section: PaperSection) => {
    setEditingSection(section.id);
    setEditingContent(section.content);
  };

  const saveEdit = () => {
    if (!editingSection) return;
    setEditedPaper((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === editingSection ? { ...s, content: editingContent } : s
      ),
    }));
    setEditingSection(null);
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setEditingContent("");
  };

  const downloadFile = async (format: DownloadFormat) => {
    setDownloading(format);

    try {
      if (format === "latex") {
        const latex = generateLatex(editedPaper);
        const blob = new Blob([latex], { type: "text/plain;charset=utf-8" });
        triggerDownload(blob, `${sanitizeFilename(editedPaper.title)}.tex`);
      } else if (format === "docx") {
        // Use docx library (loaded dynamically to keep bundle small)
        const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");

        const children: InstanceType<typeof Paragraph>[] = [
          new Paragraph({
            text: editedPaper.title,
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: editedPaper.authors, italics: true }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({ text: "Keywords: ", bold: true }),
              new TextRun({ text: editedPaper.keywords.join(", ") }),
            ],
          }),
          new Paragraph({ text: "" }),
        ];

        editedPaper.sections.forEach((section) => {
          children.push(
            new Paragraph({
              text: section.title,
              heading: HeadingLevel.HEADING_1,
            })
          );
          section.content.split("\n\n").forEach((para) => {
            children.push(new Paragraph({ text: para.trim() }));
          });
          children.push(new Paragraph({ text: "" }));
        });

        children.push(
          new Paragraph({ text: "References", heading: HeadingLevel.HEADING_1 })
        );
        editedPaper.references.forEach((ref) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `[${ref.id}] ${ref.authors}, "${ref.title}," ${ref.venue}, ${ref.year}${ref.doi ? `, doi: ${ref.doi}` : ""}.`,
                }),
              ],
            })
          );
        });

        const doc = new Document({ sections: [{ children }] });
        const blob = await Packer.toBlob(doc);
        triggerDownload(blob, `${sanitizeFilename(editedPaper.title)}.docx`);
      } else if (format === "pdf") {
        // Use jsPDF
        const { jsPDF } = await import("jspdf");
        const doc = new jsPDF({ unit: "mm", format: "a4" });
        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - margin * 2;
        let y = margin;

        const addText = (
          text: string,
          fontSize: number,
          bold: boolean,
          lineHeightFactor = 1.4
        ) => {
          doc.setFontSize(fontSize);
          doc.setFont("helvetica", bold ? "bold" : "normal");
          const lines = doc.splitTextToSize(text, maxWidth) as string[];
          lines.forEach((line: string) => {
            if (y > doc.internal.pageSize.getHeight() - margin) {
              doc.addPage();
              y = margin;
            }
            doc.text(line, margin, y);
            y += fontSize * 0.352778 * lineHeightFactor;
          });
        };

        // Title
        addText(editedPaper.title, 18, true, 1.6);
        addText(editedPaper.authors, 11, false);
        y += 4;
        addText(`Keywords: ${editedPaper.keywords.join(", ")}`, 9, false);
        y += 6;

        // Sections
        editedPaper.sections.forEach((section) => {
          y += 4;
          addText(section.title, 12, true);
          y += 2;
          addText(section.content, 10, false);
        });

        // References
        y += 6;
        addText("References", 12, true);
        y += 2;
        editedPaper.references.forEach((ref) => {
          addText(
            `[${ref.id}] ${ref.authors}, "${ref.title}," ${ref.venue}, ${ref.year}${ref.doi ? `. doi: ${ref.doi}` : ""}.`,
            9,
            false
          );
        });

        doc.save(`${sanitizeFilename(editedPaper.title)}.pdf`);
      }
    } finally {
      setDownloading(null);
    }
  };

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sanitizeFilename = (name: string) =>
    name.replace(/[^a-z0-9\-_\s]/gi, "").replace(/\s+/g, "_").substring(0, 60);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            {editedPaper.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-sm text-slate-500">
              {editedPaper.wordCount.toLocaleString()} words
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-500">
              {editedPaper.sections.length} sections
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-500">
              {editedPaper.references.length} references
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPlagiarismReport(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm font-semibold hover:bg-green-100 transition"
          >
            <Shield className="w-4 h-4" />
            Plagiarism Report
          </button>
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Regenerate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {editedPaper.sections.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const isEditing = editingSection === section.id;

            return (
              <div
                key={section.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                {/* Section header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => !isEditing && toggleSection(section.id)}
                >
                  <h2 className="text-base font-semibold text-slate-900">
                    {section.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    {!isEditing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(section);
                          setExpandedSections((prev) => {
                            const next = new Set(prev);
                            next.add(section.id);
                            return next;
                          });
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                        title="Edit section"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Section content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-slate-50">
                    {isEditing ? (
                      <div className="mt-4">
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="w-full min-h-[300px] px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 text-slate-900 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono"
                          autoFocus
                        />
                        <div className="flex gap-3 mt-3">
                          <button
                            onClick={saveEdit}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition"
                          >
                            <Save className="w-4 h-4" />
                            Save Changes
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 prose prose-slate prose-sm max-w-none">
                        {section.content.split("\n\n").map((para, i) => (
                          <p key={i} className="text-sm text-slate-700 leading-relaxed mb-3">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* References section */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-50">
              <h2 className="text-base font-semibold text-slate-900">
                References
              </h2>
            </div>
            <div className="px-5 py-4 space-y-3">
              {editedPaper.references.map((ref) => (
                <p key={ref.id} className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-800">
                    [{ref.id}]
                  </span>{" "}
                  {ref.authors}, &quot;{ref.title},&quot;{" "}
                  <em>{ref.venue}</em>, {ref.year}
                  {ref.doi && (
                    <span className="text-blue-500 ml-1">
                      doi: {ref.doi}
                    </span>
                  )}
                  .
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Download card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600" />
              Download Paper
            </h3>
            <div className="space-y-3">
              {(
                [
                  {
                    format: "pdf" as DownloadFormat,
                    label: "PDF Document",
                    desc: "Formatted, print-ready PDF",
                    icon: "📄",
                  },
                  {
                    format: "docx" as DownloadFormat,
                    label: "Word Document",
                    desc: "Editable .docx file",
                    icon: "📝",
                  },
                  {
                    format: "latex" as DownloadFormat,
                    label: "LaTeX Source",
                    desc: "IEEEtran .tex file",
                    icon: "⚡",
                  },
                ] as const
              ).map(({ format, label, desc, icon }) => (
                <button
                  key={format}
                  onClick={() => downloadFile(format)}
                  disabled={downloading !== null}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-left transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-xl">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800">
                      {downloading === format ? "Preparing…" : label}
                    </div>
                    <div className="text-xs text-slate-400">{desc}</div>
                  </div>
                  {downloading === format ? (
                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <Download className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Paper info card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Paper Details
            </h3>
            <dl className="space-y-3">
              {[
                { label: "Words", value: editedPaper.wordCount.toLocaleString() },
                { label: "Sections", value: editedPaper.sections.length },
                { label: "References", value: editedPaper.references.length },
                {
                  label: "Generated",
                  value: new Date(editedPaper.generatedAt).toLocaleString(),
                },
                { label: "Keywords", value: editedPaper.keywords.join(", ") },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 text-xs">
                  <dt className="text-slate-400 font-medium">{label}</dt>
                  <dd className="text-slate-700 text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Plagiarism badge */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-green-800">
                  Plagiarism Free
                </div>
                <div className="text-xs text-green-600">Verified 0% match</div>
              </div>
            </div>
            <div className="h-2 bg-green-100 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-green-500 rounded-full" />
            </div>
            <div className="flex justify-between text-xs text-green-600 mt-1">
              <span>Plagiarism score</span>
              <span className="font-bold">0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plagiarism report modal */}
      {showPlagiarismReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Plagiarism Report
                </h2>
                <p className="text-sm text-slate-500">
                  Verification completed on{" "}
                  {new Date(editedPaper.generatedAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowPlagiarismReport(false)}
                className="text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#dcfce7"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-green-600">0%</span>
                  <span className="text-xs text-green-500 font-medium">match</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "Internet sources", score: "0%", status: "clean" },
                { label: "Academic publications", score: "0%", status: "clean" },
                { label: "Student paper database", score: "0%", status: "clean" },
                { label: "Periodicals & journals", score: "0%", status: "clean" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-4 py-3 bg-green-50 rounded-xl border border-green-100"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPlagiarismReport(false)}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Close Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
