import Link from "next/link";
import {
  FileText,
  CheckCircle,
  Download,
  IndianRupee,
  Clock,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Manually Written IEEE Papers",
    description:
      "Every paper is personally written by me using your exact requirements and delivered in proper IEEE conference/journal structure.",
  },
  {
    icon: CheckCircle,
    title: "Direct Requirement Handling",
    description:
      "You share your topic, field, and expectations directly with me. No automated writing pipeline is used for your final paper.",
  },
  {
    icon: Zap,
    title: "Timely Delivery",
    description:
      "I draft and structure your paper quickly while still writing each section manually for quality and clarity.",
  },
  {
    icon: Download,
    title: "Delivered in Multiple Formats",
    description:
      "Your completed paper can be uploaded to you as PDF, DOCX, or LaTeX based on your submission workflow.",
  },
  {
    icon: FileText,
    title: "Complete Section Coverage",
    description:
      "Abstract, introduction, literature review, methodology, results, discussion, conclusion, and references are all covered.",
  },
  {
    icon: Clock,
    title: "Revision-Friendly Process",
    description:
      "You can request edits after review so the final uploaded paper matches your expectations before submission.",
  },
];

const steps = [
  {
    number: "01",
    title: "Share Your Requirements",
    description:
      "Submit your topic, field, page target, research questions, and specific instructions through the request form.",
  },
  {
    number: "02",
    title: "I Write It Manually",
    description:
      "I personally write your IEEE paper based on your request. The final document is not AI-written.",
  },
  {
    number: "03",
    title: "Review & Request Changes",
    description:
      "You review the delivered draft and share revisions if needed so the paper matches your exact goals.",
  },
  {
    number: "04",
    title: "Receive Final Upload",
    description:
      "Once finalized, I upload the paper to you in the format you need for submission.",
  },
];

const testimonials = [
  {
    name: "Dr. Aisha M.",
    role: "Assistant Professor, EE Department",
    text: "The manual writing quality was excellent. My IEEE formatting requirements were followed exactly.",
    rating: 5,
  },
  {
    name: "Raj K.",
    role: "PhD Candidate, Computer Science",
    text: "I shared my research direction and received a well-structured draft with clear arguments and references.",
    rating: 5,
  },
  {
    name: "Lin W.",
    role: "Industry Research Engineer",
    text: "The revision process was smooth and fast. Final delivery was on time and submission-ready.",
    rating: 4,
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "₹2,999",
    details: "Up to 6 pages",
    points: ["Manual writing", "IEEE formatting", "1 revision"],
  },
  {
    name: "Standard",
    price: "₹4,999",
    details: "Up to 10 pages",
    points: ["Manual writing", "IEEE formatting", "2 revisions", "Priority delivery"],
  },
  {
    name: "Premium",
    price: "₹7,999",
    details: "Up to 15 pages",
    points: ["Manual writing", "IEEE formatting", "3 revisions", "Fastest delivery"],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-slate-900">
                Write for Me
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
                Pricing
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
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-2.5 rounded-lg transition-colors"
            >
              Submit Request <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="sm:hidden border-t border-slate-100">
            <div className="flex items-center gap-5 py-3 overflow-x-auto text-sm text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                Features
              </a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                Pricing
              </a>
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                How It Works
              </a>
              <a href="#testimonials" className="hover:text-blue-600 transition-colors whitespace-nowrap">
                Testimonials
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-24 px-4">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <CheckCircle className="w-3.5 h-3.5" />
            100% Manually Written by Me
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Your IEEE Research Paper,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Written Manually
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            You share your requirements, and I personally write and upload your
            IEEE-formatted paper. This is a manual writing service—not AI paper
            generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Submit My Request <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-lg font-semibold px-8 py-4 rounded-xl transition-all border border-slate-200 shadow-sm"
            >
              See How It Works
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-5 sm:gap-8 text-sm text-slate-500">
            {["Manual writing process", "All IEEE sections included", "Pricing in rupees", "Revisions available"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for Submission
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              From request to final upload, every paper is written manually and
              structured for IEEE-style submissions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all group animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
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

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Pricing (INR)
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Transparent pricing in rupees based on your required paper length.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, idx) => (
              <div
                key={plan.name}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-lg transition-all animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                <div className="mt-4 flex items-center gap-2 text-blue-700">
                  <IndianRupee className="w-5 h-5" />
                  <span className="text-3xl font-extrabold">{plan.price.replace("₹", "")}</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">{plan.details}</p>
                <ul className="mt-5 space-y-2">
                  {plan.points.map((point) => (
                    <li key={point} className="text-sm text-slate-600 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 bg-gradient-to-br from-slate-900 to-blue-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Four simple steps from your request to final manual delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="flex gap-4 sm:gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
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
      <section id="testimonials" className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Researchers
            </h2>
            <p className="text-lg text-slate-500">
              Academics and industry professionals rely on Write for Me every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.08}s` }}
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
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Submit Your Request?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Share your requirement details in a few minutes and I&apos;ll write
            your paper manually and upload it to you.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-lg"
          >
            Start Now <ChevronRight className="w-5 h-5" />
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
              © {new Date().getFullYear()} Write for Me. Manual IEEE research paper writing service.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <Link href="/generate" className="hover:text-white transition-colors">Request</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
