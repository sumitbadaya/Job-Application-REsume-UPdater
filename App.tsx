
import React, { useState } from 'react';
import { UserProfile, JobDetails, AiAnalysisResult, OnDemandProject } from './types';
import { generateApplicationMaterials, generateOnDemandProject } from './services/geminiService';
import UserProfileForm from './components/UserProfileForm';
import JobInputForm from './components/JobInputForm';
import AiAnalysisDisplay from './components/AiAnalysisDisplay';
import Header from './components/Header';
import Loader from './components/Loader';
import OnDemandProjectGenerator from './components/OnDemandProjectGenerator';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'John Doe',
    experienceSummary: 'Senior Java Developer with over 8 years of experience in building scalable backend systems, microservices architecture, and cloud-native applications. Proficient in Spring Boot, Kafka, and AWS.',
    skills: 'Java, Spring Boot, Python, Microservices, REST APIs, Docker, Kubernetes, AWS, Jenkins, SQL, NoSQL',
    yearsOfExperience: '8',
    noticePeriod: '30 days',
    salaryExpectation: '150,000 USD',
  });
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    jobTitle: 'Senior Java Developer',
    company: 'Tech Solutions Inc.',
    description: `We are looking for a seasoned Senior Java Developer to join our dynamic team. The ideal candidate will have extensive experience with Java and the Spring Framework.

Responsibilities:
- Design, develop, and maintain high-performance, reliable, and scalable Java applications.
- Collaborate with cross-functional teams to define, design, and ship new features.
- Work with our cloud infrastructure on AWS.
- Ensure the best possible performance, quality, and responsiveness of the applications.

Requirements:
- 5+ years of experience in Java development.
- Strong experience with Spring Boot and microservices.
- Experience with cloud platforms like AWS.
- Familiarity with CI/CD pipelines.`,
  });
  const [analysisResult, setAnalysisResult] = useState<AiAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [onDemandProject, setOnDemandProject] = useState<OnDemandProject | null>(null);
  const [isProjectLoading, setIsProjectLoading] = useState<boolean>(false);
  const [projectError, setProjectError] = useState<string | null>(null);


  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await generateApplicationMaterials(userProfile, jobDetails);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to generate application materials. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProject = async (resumePoint: string) => {
    setIsProjectLoading(true);
    setProjectError(null);
    setOnDemandProject(null);
    try {
      const result = await generateOnDemandProject(resumePoint);
      setOnDemandProject(result);
    } catch (err) {
      setProjectError('Failed to generate project example. Please try again.');
      console.error(err);
    } finally {
      setIsProjectLoading(false);
    }
  };
  
  const isFormValid = userProfile.experienceSummary && userProfile.skills && jobDetails.description;

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4">
             <div className="sticky top-8">
                <UserProfileForm userProfile={userProfile} setUserProfile={setUserProfile} />
             </div>
          </div>
          
          <div className="lg:col-span-8">
            <div className="space-y-8">
              <JobInputForm 
                jobDetails={jobDetails} 
                setJobDetails={setJobDetails} 
                onGenerate={handleGenerate}
                isLoading={isLoading}
                isFormValid={isFormValid}
              />

              {isLoading && <Loader />}
              {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">{error}</div>}
              {analysisResult && <AiAnalysisDisplay result={analysisResult} />}

              <OnDemandProjectGenerator
                onGenerate={handleGenerateProject}
                isLoading={isProjectLoading}
                project={onDemandProject}
                error={projectError}
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
