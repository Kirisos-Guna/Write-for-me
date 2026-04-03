import { GeneratedPaper } from "./types";

/**
 * Generate a LaTeX string from a GeneratedPaper object.
 */
export function generateLatex(paper: GeneratedPaper): string {
  const refsLatex = paper.references
    .map(
      (r) =>
        "\\bibitem{ref" + r.id + "} " + r.authors + ", ``" + r.title + ",'' \\textit{" + r.venue + "}, " + r.year + (r.doi ? ", doi: " + r.doi : "") + "."
    )
    .join("\n");

  const sectionsLatex = paper.sections
    .filter((s) => s.id !== "abstract")
    .map((s) => {
      const content = s.content
        .replace(/&/g, "\\&")
        .replace(/%/g, "\\%")
        .replace(/_/g, "\\_")
        .replace(/\$/g, "\\$")
        .replace(/#/g, "\\#");
      return `\\section{${s.title.replace(/^[IVX]+\.\s*/, "")}}\n${content}`;
    })
    .join("\n\n");

  return `\\documentclass[conference]{IEEEtran}
\\IEEEoverridecommandlockouts

\\usepackage{cite}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{algorithmic}
\\usepackage{graphicx}
\\usepackage{textcomp}
\\usepackage{xcolor}

\\def\\BibTeX{{\\rm B\\kern-.05em{\\sc i\\kern-.025em b}\\kern-.08em
    T\\kern-.1667em\\lower.7ex\\hbox{E}\\kern-.125emX}}

\\begin{document}

\\title{${paper.title.replace(/&/g, "\\&").replace(/_/g, "\\_")}}

\\author{\\IEEEauthorblockN{${paper.authors}}
\\IEEEauthorblockA{\\textit{Department of Research} \\\\
\\textit{University / Institution}\\\\
contact@institution.edu}}

\\maketitle

\\begin{abstract}
${paper.abstract.replace(/&/g, "\\&").replace(/_/g, "\\_")}
\\end{abstract}

\\begin{IEEEkeywords}
${paper.keywords.join(", ")}
\\end{IEEEkeywords}

${sectionsLatex}

\\begin{thebibliography}{00}
${refsLatex}
\\end{thebibliography}

\\end{document}
`;
}

/**
 * Generate a plain-text representation suitable for DOCX export.
 * The actual DOCX generation is done client-side using the `docx` library.
 */
export function generatePlainText(paper: GeneratedPaper): string {
  const refs = paper.references
    .map(
      (r) =>
        `[${r.id}] ${r.authors}, "${r.title}," ${r.venue}, ${r.year}${r.doi ? `, doi: ${r.doi}` : ""}.`
    )
    .join("\n");

  const sections = paper.sections
    .map((s) => `${s.title}\n\n${s.content}`)
    .join("\n\n---\n\n");

  return `${paper.title.toUpperCase()}

${paper.authors}

Keywords: ${paper.keywords.join(", ")}

Generated: ${new Date(paper.generatedAt).toLocaleDateString()}
Word Count: ${paper.wordCount}
Plagiarism Score: ${paper.plagiarismScore}%

==================================================

${sections}

==================================================

REFERENCES

${refs}
`;
}
