
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { UserProfile, JobDetails, AiAnalysisResult, OnDemandProject } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. The app will not function correctly without a valid API key.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'YOUR_API_KEY_HERE' });

const generateApplicationMaterials = async (
  userProfile: UserProfile,
  jobDetails: JobDetails
): Promise<AiAnalysisResult> => {
  const model = "gemini-3-flash-preview";

  const prompt = `
    You are an expert career coach and interview preparer. Your goal is to help a job seeker create compelling application materials and interview talking points for a specific job opening.

    --- MY PROFILE ---
    Full Name: ${userProfile.fullName}
    Experience Summary: ${userProfile.experienceSummary}
    Key Skills: ${userProfile.skills}
    Years of Experience: ${userProfile.yearsOfExperience}
    Notice Period: ${userProfile.noticePeriod}
    Salary Expectation: ${userProfile.salaryExpectation}

    --- JOB DESCRIPTION ---
    Job Title: ${jobDetails.jobTitle}
    Company: ${jobDetails.company}
    Description: ${jobDetails.description}

    --- YOUR TASK ---
    Based on my profile and the provided job description, generate the following in a structured JSON format.

    1. "tailoredResumePoints": An array of 3-5 bullet points for a resume. These points must creatively merge my existing experience with the key requirements from the job description. For any identified skill gaps, frame the resume points as project-based learning or initiative-driven accomplishments that demonstrate those skills.
    
    2. "coverLetter": A professional, concise, and engaging cover letter (3 paragraphs maximum). It should address the company, mention the specific role, and connect my key skills and experiences to the job requirements. It should be written from my perspective.

    3. "projectExample": A detailed, realistic project story I can use in an interview to justify one of the tailored resume points. Structure it using the STAR method (Situation, Task, Action, Result).
        - "title": A concise title for the project.
        - "scenario": A one-sentence summary of the achievement.
        - "context": "Project context. What was the system/platform?
        - "originalDesign": "The original design and why it existed."
        - "problem": "The problem that surfaced. Why did the original design fail?"
        - "solution": "What I changed. What specific technical actions did I take?"
        - "result": "The measurable outcome."

    4. "keywords": A comma-separated string of the most important technical and soft-skill keywords from the job description.

    5. "skillGapAnalysis": A detailed skill gap analysis.
       - "matchingSkills": An array of skills from the job description that are clearly present in my profile.
       - "gapSkills": An array of important skills from the job description that are missing from my profile.
       - "suggestions": An array of actionable suggestions for bridging the identified skill gaps.
  `;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tailoredResumePoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Aspirational bullet points for the resume."
            },
             coverLetter: {
              type: Type.STRING,
              description: "The full cover letter text."
            },
            projectExample: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    scenario: { type: Type.STRING },
                    context: { type: Type.STRING },
                    originalDesign: { type: Type.STRING },
                    problem: { type: Type.STRING },
                    solution: { type: Type.STRING },
                    result: { type: Type.STRING },
                },
                required: ["title", "scenario", "context", "originalDesign", "problem", "solution", "result"],
                description: "A detailed project example for interviews."
            },
            keywords: {
              type: Type.STRING,
              description: "A comma-separated string of keywords."
            },
            skillGapAnalysis: {
              type: Type.OBJECT,
              properties: {
                matchingSkills: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Skills the user has that match the job."
                },
                gapSkills: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Skills the user is missing for the job."
                },
                suggestions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Suggestions to bridge skill gaps."
                }
              },
              required: ["matchingSkills", "gapSkills", "suggestions"],
              description: "The skill gap analysis results."
            }
          },
          required: ["tailoredResumePoints", "coverLetter", "projectExample", "keywords", "skillGapAnalysis"],
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as AiAnalysisResult;
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};


const generateOnDemandProject = async (resumePoint: string): Promise<OnDemandProject> => {
  const model = "gemini-3-flash-preview";

  const prompt = `
    You are an expert career coach who creates compelling, realistic project stories for software engineers to use in interviews.
    Your task is to generate a detailed project story that proves the user's experience for the following resume point.

    --- RESUME POINT ---
    "${resumePoint}"

    --- YOUR TASK ---
    Generate a detailed, realistic project story that a software engineer can use in an interview to justify the resume point. The story must be clear, simple, and impressive.
    Structure your response as a JSON object with the following keys:
      - "title": A concise title for the project.
      - "scenario": A one-sentence summary of the achievement that directly reflects the resume point.
      - "context": "Project context. What was the business goal? What kind of application was it?"
      - "originalDesign": "The situation before your work. What was the existing system or process?"
      - "problem": "The specific problem or task. What challenge needed to be solved?"
      - "solution": "The actions you took. Describe the technical steps and your specific contributions."
      - "result": "The measurable outcome. What was the quantifiable improvement or impact?"
  `;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            scenario: { type: Type.STRING },
            context: { type: Type.STRING },
            originalDesign: { type: Type.STRING },
            problem: { type: Type.STRING },
            solution: { type: Type.STRING },
            result: { type: Type.STRING },
          },
          required: ["title", "scenario", "context", "originalDesign", "problem", "solution", "result"],
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as OnDemandProject;
    return result;

  } catch (error) {
    console.error("Error calling Gemini API for on-demand project:", error);
    throw new Error("Failed to generate project example from Gemini API.");
  }
};

export { generateApplicationMaterials, generateOnDemandProject };
