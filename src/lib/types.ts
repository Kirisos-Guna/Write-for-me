export interface PaperRequirements {
  title: string;
  field: string;
  pageCount: number;
  researchQuestions: string;
  mainPoints: string;
  specificSources: string;
  targetAudience: string;
  ieeeRequirements: string;
  additionalInstructions: string;
}

export interface PaperSection {
  id: string;
  title: string;
  content: string;
}

export interface Reference {
  id: number;
  authors: string;
  title: string;
  venue: string;
  year: number;
  doi?: string;
}

export interface GeneratedPaper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  keywords: string[];
  sections: PaperSection[];
  references: Reference[];
  generatedAt: string;
  wordCount: number;
  plagiarismScore: number;
}

export interface GenerationProgress {
  stage: string;
  step: number;
  totalSteps: number;
  message: string;
}

export type DownloadFormat = "pdf" | "docx" | "latex";

export const FIELDS_OF_STUDY = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biomedical Engineering",
  "Information Technology",
  "Artificial Intelligence & Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Robotics & Automation",
  "Materials Science",
  "Environmental Engineering",
  "Medicine & Healthcare",
  "Physics",
  "Mathematics",
  "Chemistry",
  "Economics",
  "Other",
] as const;

export const AUDIENCE_LEVELS = [
  "Undergraduate",
  "Graduate (Master's)",
  "Doctoral (PhD)",
  "Industry Professional",
  "Academic Researcher",
] as const;

export const FORM_STEPS = [
  { id: 1, title: "Topic & Title", description: "Define your paper topic" },
  { id: 2, title: "Field & Audience", description: "Scope and target readers" },
  { id: 3, title: "Length & Format", description: "Paper size requirements" },
  { id: 4, title: "Research Questions", description: "Core thesis and questions" },
  { id: 5, title: "Main Points", description: "Key sections to cover" },
  { id: 6, title: "Sources", description: "References to include" },
  { id: 7, title: "IEEE Specifics", description: "Formatting requirements" },
  { id: 8, title: "Instructions", description: "Additional constraints" },
  { id: 9, title: "Review & Generate", description: "Confirm and generate" },
] as const;
