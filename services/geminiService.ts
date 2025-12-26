
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { UserProfile, JobDetails, AiAnalysisResult } from '../types';

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
    You are an expert career coach and resume writer. Your goal is to help a job seeker tailor their application materials for a specific job opening.

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
    1. "tailoredResumePoints": An array of 3-5 bullet points that I can add to my resume. Each point must specifically highlight how my experience aligns with this job's requirements, using action verbs and quantifying achievements where possible.
    2. "coverLetter": A professional, concise, and engaging cover letter (3 paragraphs maximum) for this application. It should address the company, mention the specific role, and connect my key skills and experiences to the job requirements. It should be written from my perspective.
    3. "keywords": An array of the most important technical and soft-skill keywords from the job description that I should ensure are present in my application.
    4. "skillGapAnalysis": Perform a detailed skill gap analysis.
       - "matchingSkills": An array of skills from the job description that are clearly present in my profile's key skills.
       - "gapSkills": An array of important skills from the job description that are missing from my profile's key skills.
       - "suggestions": An array of actionable suggestions for bridging the identified skill gaps. Suggestions could include online courses, certifications, or ways to rephrase existing experience to better match the requirements.
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
              description: "Bullet points for the resume."
            },
            coverLetter: {
              type: Type.STRING,
              description: "The full cover letter text."
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Keywords from the job description."
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
          required: ["tailoredResumePoints", "coverLetter", "keywords", "skillGapAnalysis"],
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

export { generateApplicationMaterials };
