
import React from 'react';
import { AiAnalysisResult } from '../types';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { TagIcon } from './icons/TagIcon';
import { AcademicCapIcon } from './icons/AcademicCapIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { CodeBracketSquareIcon } from './icons/CodeBracketSquareIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';


interface AiAnalysisDisplayProps {
  result: AiAnalysisResult;
}

export const ProjectDetailSection: React.FC<{title: string, content: string}> = ({ title, content}) => (
    <div>
        <h5 className="font-semibold text-gray-300 mb-1">{title}</h5>
        <p className="text-gray-400 text-sm">{content}</p>
    </div>
);


const AiAnalysisDisplay: React.FC<AiAnalysisDisplayProps> = ({ result }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-3 flex items-center text-cyan-400">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );

  const { projectExample } = result;

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Your AI-Powered Application Kit</h2>
      
      <Section title="Skill Gap Analysis" icon={<LightBulbIcon className="h-6 w-6 mr-2" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold text-white mb-2 flex items-center"><ShieldCheckIcon className="h-5 w-5 mr-2 text-green-400" /> Matching Skills</h4>
                <ul className="space-y-1 list-disc list-inside text-gray-300">
                    {result.skillGapAnalysis.matchingSkills.map((skill, i) => <li key={`match-${i}`}>{skill}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-white mb-2 flex items-center"><ExclamationTriangleIcon className="h-5 w-5 mr-2 text-yellow-400" /> Skill Gaps</h4>
                <ul className="space-y-1 list-disc list-inside text-gray-300">
                    {result.skillGapAnalysis.gapSkills.map((skill, i) => <li key={`gap-${i}`}>{skill}</li>)}
                </ul>
            </div>
        </div>
        <div className="mt-6">
            <h4 className="font-semibold text-white mb-2 flex items-center"><AcademicCapIcon className="h-5 w-5 mr-2 text-blue-400" /> Actionable Suggestions</h4>
             <div className="prose prose-sm prose-invert text-gray-300 max-w-none">
                <ul className="space-y-2">
                    {result.skillGapAnalysis.suggestions.map((suggestion, i) => <li key={`sug-${i}`}>{suggestion}</li>)}
                </ul>
                <p className="text-xs text-gray-500 mt-4">Use these suggestions to get prepared for interview questions about the 'Tailored Resume Points'.</p>
             </div>
        </div>
      </Section>

      <Section title="Tailored Resume Points" icon={<LightBulbIcon className="h-6 w-6 mr-2" />}>
        <ul className="space-y-3 list-disc list-inside text-gray-300">
          {result.tailoredResumePoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </Section>
      
       <Section title="Custom Cover Letter" icon={<DocumentTextIcon className="h-6 w-6 mr-2" />}>
        <div className="relative">
          <button
            onClick={() => copyToClipboard(result.coverLetter, 'coverLetter')}
            className="absolute top-2 right-2 p-1.5 bg-gray-700 rounded-md hover:bg-gray-600 transition text-gray-300"
            aria-label="Copy cover letter"
          >
            {copied === 'coverLetter' ? <CheckIcon className="h-5 w-5 text-green-400" /> : <ClipboardIcon className="h-5 w-5" />}
          </button>
          <p className="whitespace-pre-wrap font-mono text-sm bg-gray-900 p-4 rounded-md text-gray-300 border border-gray-700">
            {result.coverLetter}
          </p>
        </div>
      </Section>

      <Section title="STAR Interview Project Example" icon={<CodeBracketSquareIcon className="h-6 w-6 mr-2" />}>
          <div className="space-y-4">
            <h4 className="text-md font-bold text-white">{projectExample.title}</h4>
            <p className="text-cyan-300 bg-cyan-900/50 border-l-4 border-cyan-500 p-3 italic text-sm">"{projectExample.scenario}"</p>
            <ProjectDetailSection title="Project Context" content={projectExample.context} />
            <ProjectDetailSection title="Original Design" content={projectExample.originalDesign} />
            <ProjectDetailSection title="Problem" content={projectExample.problem} />
            <ProjectDetailSection title="My Solution" content={projectExample.solution} />
            <ProjectDetailSection title="Result" content={projectExample.result} />
          </div>
      </Section>

      <Section title="Keywords to Include" icon={<TagIcon className="h-6 w-6 mr-2" />}>
        <p className="text-gray-300 bg-gray-900 p-3 rounded-md text-sm border border-gray-700">
            {result.keywords}
        </p>
      </Section>
    </div>
  );
};

export default AiAnalysisDisplay;
