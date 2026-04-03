import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Download,
  Shield,
  Clock,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "IEEE-Formatted Papers",
    description:
      "Every paper follows the exact IEEE conference and journal format including proper sections, citations, and layout specifications.",
  },
  {
    icon: Shield,
    title: "0% Plagiarism Guaranteed",
    description:
      "All content is synthetically generated and verified—unique analysis, arguments, and conclusions crafted specifically for your topic.",
  },
  {
    icon: Zap,
    title: "Fast Generation",
    description:
      "Receive your complete research paper in minutes. Our engine handles abstract, literature review, methodology, results, and more.",
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description:
      "Download your paper as a polished PDF, editable DOCX, or LaTeX source file for journal submission workflows.",
  },
  {
    icon: CheckCircle,
    title: "Full Section Coverage",
    description:
      "Automatically generates all required IEEE sections: abstract, introduction, literature review, methodology, results, discussion, and conclusion.",
  },
  {
    icon: Clock,
    title: "Edit Before Download",
    description:
      "Preview, refine, and edit every section of your paper before finalizing. Regenerate individual sections with new parameters.",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter Your Requirements",
    description:
      "Fill in your paper topic, field of study, research questions, key points, and any specific sources or constraints through our intuitive multi-step form.",
  },
  {
    number: "02",
    title: "AI Generates Your Paper",
    description:
      "Our engine synthesizes original content, constructs arguments, generates citations in IEEE format, and assembles the complete paper structure.",
  },
  {
    number: "03",
    title: "Review & Edit",
    description:
      "Preview each section, make inline edits, and optionally regenerate specific parts to better match your vision.",
  },
  {
    number: "04",
    title: "Download & Submit",
    description:
      "Export your verified, plagiarism-free paper as PDF, DOCX, or LaTeX. Includes a plagiarism report showing 0% match.",
  },
];

const testimonials = [
  {
    name: "Dr. Aisha M.",
    role: "Assistant Professor, EE Department",
    text: "Write for Me saved me hours of initial drafting. The IEEE formatting is spot-on and the generated structure is an excellent foundation to build upon.",
    rating: 5,
  },
  {
    name: "Raj K.",
    role: "PhD Candidate, Computer Science",
    text: "I use it to generate first-draft frameworks for my literature reviews. The citation formatting alone saves significant time.",
    rating: 5,
  },
  {
    name: "Lin W.",
    role: "Industry Research Engineer",
    text: "Perfect for conference paper submissions. The zero-plagiarism guarantee means I can confidently submit without concern.",
    rating: 4,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                Write for Me
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                Testimonials
              </a>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Start Writing <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 px-4">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Shield className="w-3.5 h-3.5" />
            Verified 0% Plagiarism Score
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            IEEE Research Papers,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Written for You
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Generate complete, original IEEE-formatted research papers from your
            specifications. Every paper includes abstract, literature review,
            methodology, results, and references—all synthesized fresh with
            verified zero plagiarism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Generate My Paper <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-lg font-semibold px-8 py-4 rounded-xl transition-all border border-slate-200 shadow-sm"
            >
              See How It Works
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            {["PDF, DOCX & LaTeX export", "All IEEE sections included", "Multi-step guided input", "Edit before download"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Publish
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              From first draft to final download—Write for Me handles every
              aspect of IEEE paper generation so you can focus on your research.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center mb-4 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-gradient-to-br from-slate-900 to-blue-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Four simple steps from your requirements to a complete,
              submission-ready IEEE research paper.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trusted by Researchers
            </h2>
            <p className="text-lg text-slate-500">
              Academics and industry professionals rely on Write for Me every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  &quot;{t.text}&quot;
                </p>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {t.name}
                  </div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Generate Your IEEE Paper?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            It takes less than 5 minutes to fill in your requirements. Your
            complete paper will be ready shortly after.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-lg"
          >
            Start Writing Now <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Write for Me</span>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Write for Me. IEEE-formatted research paper generation.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <Link href="/generate" className="hover:text-white transition-colors">Generate</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
