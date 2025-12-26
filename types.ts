
export interface UserProfile {
  fullName: string;
  experienceSummary: string;
  skills: string;
  yearsOfExperience: string;
  noticePeriod: string;
  salaryExpectation: string;
}

export interface JobDetails {
  jobTitle: string;
  company: string;
  description:string;
}

export interface SkillGapAnalysis {
  matchingSkills: string[];
  gapSkills: string[];
  suggestions: string[];
}

export interface ProjectExample {
  title: string;
  scenario: string;
  context: string;
  originalDesign: string;
  problem: string;
  solution: string;
  result: string;
}

export interface AiAnalysisResult {
  tailoredResumePoints: string[];
  projectExample: ProjectExample;
  keywords: string;
  skillGapAnalysis: SkillGapAnalysis;
  coverLetter: string;
}

// New type for the on-demand project
export type OnDemandProject = ProjectExample;
