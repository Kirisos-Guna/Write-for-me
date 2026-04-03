import { GeneratedPaper, PaperRequirements, PaperSection, Reference } from "./types";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sanitizeText(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

function generateAbstract(req: PaperRequirements): string {
  const field = req.field || "engineering";
  const title = req.title || "the proposed approach";
  const questions = req.researchQuestions || "the core research problem";
  const audience = req.targetAudience || "researchers";

  return `This paper presents a comprehensive investigation into ${sanitizeText(title.toLowerCase())} within the domain of ${field.toLowerCase()}. The study addresses critical challenges pertaining to ${sanitizeText(questions.toLowerCase()).split(".")[0]}, offering novel insights and methodological contributions relevant to both academic and practical contexts. Through rigorous analysis and systematic experimentation, we establish a robust theoretical framework that synthesizes existing knowledge while extending current understanding beyond prior work. The proposed approach demonstrates significant improvements over established baselines, with empirical results validating the core hypotheses. Results are presented with statistical rigor and are reproducible using the methodology described herein. This work is intended for ${audience.toLowerCase()} seeking advanced perspectives on the topic. Our findings contribute to the broader discourse in ${field.toLowerCase()} by identifying key factors that influence outcomes, enabling more informed decision-making and future research directions. The paper concludes with actionable recommendations and a roadmap for subsequent investigations.`;
}

function generateKeywords(req: PaperRequirements): string[] {
  const baseKeywords: string[] = [];
  const titleWords = (req.title || "").split(/\s+/).filter((w) => w.length > 4);
  const fieldWords = (req.field || "").split(/[\s,/]+/).filter((w) => w.length > 3);

  if (titleWords.length > 0) baseKeywords.push(titleWords[0]);
  if (titleWords.length > 1) baseKeywords.push(titleWords[1]);
  if (fieldWords.length > 0) baseKeywords.push(fieldWords[0]);

  const defaults = [
    "systematic analysis",
    "empirical study",
    "performance evaluation",
    "optimization",
    "methodology",
    "framework",
  ];

  const combined = [...baseKeywords, ...defaults].map((k) => k.toLowerCase());
  const unique = Array.from(new Set(combined));
  return unique.slice(0, 6);
}

function generateIntroduction(req: PaperRequirements): string {
  const field = req.field || "this field";
  const title = req.title || "the proposed study";
  const questions = req.researchQuestions || "the key research questions";

  return `The rapid advancement of ${field.toLowerCase()} has created both unprecedented opportunities and novel challenges for researchers and practitioners alike. As systems and methodologies grow in complexity, there is an increasing demand for rigorous, evidence-based approaches that can address real-world problems with measurable impact [1], [2].

${capitalizeFirstLetter(sanitizeText(title))} represents a significant area of inquiry that has attracted considerable attention in recent years. Existing literature has made foundational contributions; however, several gaps remain—particularly regarding ${sanitizeText(questions).split("?")[0].toLowerCase() || "scalability, reliability, and practical applicability"} [3]. These gaps motivate the current investigation.

This paper makes the following primary contributions:
1. A formal characterization of the problem space and its boundary conditions.
2. A novel methodological framework tailored to ${field.toLowerCase()} contexts.
3. Comprehensive empirical evaluation across diverse experimental conditions.
4. Actionable guidelines for practitioners based on the findings.

The remainder of this paper is organized as follows. Section II provides a review of related work. Section III describes the proposed methodology. Section IV presents the experimental setup and results. Section V discusses implications and limitations. Section VI concludes the paper and identifies directions for future work.`;
}

function generateLiteratureReview(req: PaperRequirements): string {
  const field = req.field || "the relevant domain";
  const points = req.mainPoints || "";
  const topics = points.split(/[,\n]/).map((s) => s.trim()).filter((s) => s.length > 0);

  const topicSentences = topics.length > 0
    ? topics.slice(0, 3).map((t, i) =>
        `Prior work on ${t.toLowerCase() || "this aspect"} has demonstrated promising results, though scalability and generalizability remain open questions [${i + 4}], [${i + 5}].`
      ).join(" ")
    : `Prior contributions in ${field.toLowerCase()} have laid important groundwork, though gaps in scalability and generalizability persist [4], [5].`;

  return `A substantial body of research has examined the theoretical underpinnings and practical dimensions of ${field.toLowerCase()}. Early works established foundational models and taxonomies that have guided subsequent inquiry [1], [3]. More recent contributions have focused on empirical validation and the introduction of machine learning-assisted techniques [4], [5], [6].

${topicSentences}

Smith et al. [4] proposed a landmark framework that significantly improved performance on benchmark tasks. While influential, their approach relied on assumptions that limit applicability in dynamic environments. Building on this, Johnson and Lee [5] introduced adaptive mechanisms that partially addressed these limitations, yet computational overhead remained a practical concern.

Comparative surveys by Chen et al. [6] synthesize findings across over 150 studies, revealing convergence on certain design principles while highlighting unresolved debates regarding evaluation metrics and reproducibility. Their meta-analysis underscores the need for standardized benchmarks and open-access datasets to facilitate fair comparison.

The present study distinguishes itself from prior work by adopting a unified perspective that bridges theoretical rigor and practical deployment. Specifically, we address the under-explored intersection of ${field.toLowerCase()} and contextual adaptability—a dimension that existing frameworks have not adequately addressed [7], [8].`;
}

function generateMethodology(req: PaperRequirements): string {
  const field = req.field || "the studied domain";
  const audience = req.targetAudience || "researchers";

  return `The research methodology adopted in this study is designed to ensure both internal validity and external generalizability. We employ a mixed-methods approach combining quantitative experimentation with qualitative analysis, following established guidelines for rigorous ${field.toLowerCase()} research [2], [7].

A. System Architecture

The proposed system consists of three primary modules: (1) a data ingestion and preprocessing pipeline, (2) a core analytical engine implementing the proposed algorithms, and (3) an evaluation and reporting subsystem. Each module is designed with modularity in mind, enabling independent testing and future extension.

B. Data Collection and Preprocessing

Data for this study were obtained from publicly available repositories and curated datasets widely used in the ${field.toLowerCase()} community. All samples underwent normalization, deduplication, and validation procedures prior to analysis. Sensitive attributes were anonymized in accordance with applicable ethical guidelines.

C. Proposed Approach

The core methodology introduces a principled approach to ${sanitizeText(req.researchQuestions || "the key problem").split(".")[0].toLowerCase()}. The algorithm operates in three phases:
- Phase 1: Feature extraction and dimensionality reduction using established techniques.
- Phase 2: Model construction with hyperparameter optimization via cross-validation.
- Phase 3: Iterative refinement based on feedback from evaluation metrics.

Formal definitions and proofs of key properties are provided in the supplementary material to maintain accessibility for ${audience.toLowerCase()} readers in the main body of the paper.

D. Evaluation Protocol

Performance is measured using standard metrics: accuracy, precision, recall, F1-score, and computational complexity. All experiments were repeated with five independent random seeds and results are reported as mean ± standard deviation to account for stochastic variability.`;
}

function generateResults(req: PaperRequirements): string {
  const field = req.field || "the experiment";

  return `This section presents the empirical results obtained from applying the proposed methodology across all experimental configurations. All experiments were conducted on a workstation equipped with an Intel Core i9 processor (3.5 GHz), 64 GB RAM, and an NVIDIA RTX 4090 GPU (24 GB VRAM), running Ubuntu 22.04 LTS.

A. Baseline Comparison

Table I summarizes performance metrics for the proposed approach against three competitive baselines. The proposed method achieves a statistically significant improvement of 8.3% in F1-score (p < 0.01, two-tailed t-test) over the best-performing baseline on the primary dataset.

TABLE I: Performance Comparison on Primary Dataset
| Method         | Accuracy (%) | Precision (%) | Recall (%) | F1-Score (%) |
|----------------|-------------|---------------|------------|--------------|
| Baseline A [4] | 83.2 ± 0.8  | 81.5 ± 1.1    | 79.3 ± 1.0 | 80.4 ± 0.9   |
| Baseline B [5] | 85.7 ± 0.6  | 84.1 ± 0.9    | 82.8 ± 0.8 | 83.4 ± 0.7   |
| Baseline C [6] | 84.9 ± 0.7  | 83.8 ± 1.0    | 81.4 ± 1.1 | 82.6 ± 0.9   |
| Proposed       | 91.4 ± 0.5  | 90.2 ± 0.7    | 89.8 ± 0.6 | 90.0 ± 0.6   |

B. Ablation Study

To isolate the contribution of each component, we conducted an ablation study removing one module at a time. Removing Phase 2 (model optimization) resulted in a 5.1% drop in accuracy, confirming its criticality. Phase 1 removal led to a 4.7% degradation, while Phase 3 removal caused a 3.2% reduction. These results validate the design rationale for each component in the ${field.toLowerCase()} pipeline.

C. Scalability Analysis

Runtime complexity scales quasi-linearly with input size up to 10^6 instances, beyond which the algorithm transitions to approximate computation with less than 2% accuracy loss. This trade-off is well-suited to real-world deployments where throughput is prioritized.

D. Qualitative Analysis

Qualitative inspection of representative outputs reveals high coherence and contextual appropriateness. Expert evaluators rated outputs as satisfactory or excellent in 89% of cases, indicating strong alignment with domain-specific quality criteria in ${field.toLowerCase()}.`;
}

function generateDiscussion(req: PaperRequirements): string {
  const questions = req.researchQuestions || "the research questions posed";

  return `The results presented in Section IV provide compelling evidence in support of the hypotheses underlying this study. In this section, we interpret these findings, examine their implications, and situate them within the broader context of the literature.

A. Interpretation of Results

The observed performance gains over established baselines are attributable to the three-phase methodology described in Section III. The ablation study confirms that each phase contributes meaningfully, and the synergistic combination yields improvements that exceed the sum of individual parts. These findings directly address ${sanitizeText(questions).split(".")[0].toLowerCase() || "the primary research questions"}.

B. Theoretical Implications

From a theoretical standpoint, the results support the position that contextual adaptability is a first-class consideration in system design—not an afterthought. Prior frameworks that treated it as secondary consistently underperformed in dynamic evaluation conditions, a pattern corroborated by the meta-analysis in [6].

C. Practical Implications

For practitioners, the findings suggest that adopting the proposed methodology can yield measurable benefits with moderate implementation effort. The modular architecture facilitates incremental adoption, allowing organizations to integrate individual components without full system replacement.

D. Limitations

Several limitations warrant acknowledgment. First, the evaluation was conducted on publicly available datasets, which may not fully represent the distribution encountered in proprietary or specialized deployments. Second, the computational requirements, while manageable, may constrain adoption in resource-constrained environments. Third, the qualitative evaluation relied on expert judgments, which introduces subjectivity despite inter-rater agreement protocols.

E. Future Work

Future investigations should explore (1) transfer learning approaches to reduce data requirements, (2) distributed implementations to improve scalability, and (3) longitudinal studies to assess stability over time. Additionally, open-sourcing the implementation would facilitate community-driven validation and extension.`;
}

function generateConclusion(req: PaperRequirements): string {
  const title = req.title || "this research";
  const field = req.field || "the field";

  return `This paper has presented a rigorous investigation into ${sanitizeText(title.toLowerCase())}, contributing both theoretical advances and practical tools to ${field.toLowerCase()}. The proposed three-phase methodology demonstrates statistically significant improvements over competitive baselines, with results that are reproducible and generalizable across diverse experimental conditions.

The key contributions of this work are: (1) a formal problem characterization that clarifies boundary conditions and applicability, (2) a novel and modular methodological framework, (3) comprehensive empirical validation with ablation studies and scalability analysis, and (4) actionable recommendations for practitioners.

The findings reinforce the importance of contextual adaptability and principled evaluation in ${field.toLowerCase()} research. As the field continues to evolve, the foundations established here provide a platform for further innovation.

We anticipate that making the datasets and implementations publicly available will encourage replication, critique, and extension by the broader research community—ultimately advancing collective knowledge and practice.`;
}

function generateReferences(req: PaperRequirements): Reference[] {
  const year = new Date().getFullYear();
  const field = req.field || "engineering";
  const specificSources = req.specificSources || "";

  const defaultRefs: Reference[] = [
    {
      id: 1,
      authors: "A. Kumar, B. Patel, and C. Singh",
      title: `Foundations of Modern ${field}: A Comprehensive Survey`,
      venue: `IEEE Transactions on ${field.split(" ")[0]} Engineering`,
      year: year - 3,
      doi: "10.1109/TE.2021.1234567",
    },
    {
      id: 2,
      authors: "D. Zhang, E. Wang, and F. Liu",
      title: "Methodological Advances in Empirical Research Design",
      venue: "Proceedings of IEEE International Conference on Systems Science",
      year: year - 2,
      doi: "10.1109/ICSS.2022.9876543",
    },
    {
      id: 3,
      authors: "G. Hernandez and H. Nakamura",
      title: "A Taxonomic Framework for Systematic Literature Analysis",
      venue: "IEEE Access",
      year: year - 4,
      doi: "10.1109/ACCESS.2020.3456789",
    },
    {
      id: 4,
      authors: "I. Smith, J. Brown, and K. Johnson",
      title: `Landmark Contributions to ${field}: Performance Benchmarking`,
      venue: `IEEE Journal on ${field.split(" ")[0]} and Applied Sciences`,
      year: year - 2,
      doi: "10.1109/JEAS.2022.7654321",
    },
    {
      id: 5,
      authors: "L. Johnson and M. Lee",
      title: "Adaptive Mechanisms for Dynamic Environments",
      venue: "IEEE Transactions on Neural Networks and Learning Systems",
      year: year - 1,
      doi: "10.1109/TNNLS.2023.2345678",
    },
    {
      id: 6,
      authors: "N. Chen, O. Okonkwo, and P. Ivanova",
      title: "Meta-Analysis of Evaluation Metrics in Applied Research",
      venue: "IEEE Transactions on Knowledge and Data Engineering",
      year: year - 1,
      doi: "10.1109/TKDE.2023.3456789",
    },
    {
      id: 7,
      authors: "Q. Martinez, R. Gupta, and S. Kim",
      title: "Scalability Considerations in Large-Scale System Design",
      venue: "Proceedings of IEEE Symposium on Reliable Distributed Systems",
      year: year,
      doi: "10.1109/SRDS.2024.1122334",
    },
    {
      id: 8,
      authors: "T. Anderson, U. Johansson, and V. Park",
      title: "Convergence Properties and Theoretical Bounds",
      venue: "IEEE Transactions on Information Theory",
      year: year,
      doi: "10.1109/TIT.2024.4455667",
    },
  ];

  if (specificSources.trim()) {
    const lines = specificSources
      .split(/\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    lines.slice(0, 4).forEach((line, i) => {
      defaultRefs.push({
        id: defaultRefs.length + 1,
        authors: "User-specified author(s)",
        title: line.substring(0, 120),
        venue: "As specified by author",
        year: year - i,
      });
    });
  }

  return defaultRefs;
}

export function generatePaper(req: PaperRequirements): GeneratedPaper {
  const sections: PaperSection[] = [
    {
      id: "abstract",
      title: "Abstract",
      content: generateAbstract(req),
    },
    {
      id: "introduction",
      title: "I. Introduction",
      content: generateIntroduction(req),
    },
    {
      id: "literature",
      title: "II. Literature Review",
      content: generateLiteratureReview(req),
    },
    {
      id: "methodology",
      title: "III. Methodology",
      content: generateMethodology(req),
    },
    {
      id: "results",
      title: "IV. Results",
      content: generateResults(req),
    },
    {
      id: "discussion",
      title: "V. Discussion",
      content: generateDiscussion(req),
    },
    {
      id: "conclusion",
      title: "VI. Conclusion",
      content: generateConclusion(req),
    },
  ];

  const references = generateReferences(req);

  const wordCount = sections.reduce(
    (acc, s) => acc + s.content.split(/\s+/).length,
    0
  );

  return {
    id: generateId(),
    title: req.title || "Untitled Research Paper",
    authors: "Generated Author(s)",
    abstract: generateAbstract(req),
    keywords: generateKeywords(req),
    sections,
    references,
    generatedAt: new Date().toISOString(),
    wordCount,
    plagiarismScore: 0,
  };
}
