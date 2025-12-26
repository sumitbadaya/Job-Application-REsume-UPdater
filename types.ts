
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

export interface AiAnalysisResult {
  tailoredResumePoints: string[];
  coverLetter: string;
  keywords: string[];
  skillGapAnalysis: SkillGapAnalysis;
}
