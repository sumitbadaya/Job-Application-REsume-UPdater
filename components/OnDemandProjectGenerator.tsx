
import React, { useState } from 'react';
import { OnDemandProject } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { ProjectDetailSection } from './AiAnalysisDisplay'; // Re-use the detail section component

interface OnDemandProjectGeneratorProps {
  onGenerate: (resumePoint: string) => void;
  isLoading: boolean;
  project: OnDemandProject | null;
  error: string | null;
}

const OnDemandProjectGenerator: React.FC<OnDemandProjectGeneratorProps> = ({ onGenerate, isLoading, project, error }) => {
  const [resumePoint, setResumePoint] = useState<string>(
    'Led the integration of third-party payment gateways and logistics providers via secure RESTful APIs (OAuth/JWT), supporting seamless omnichannel commerce across web and mobile platforms.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumePoint.trim()) {
      onGenerate(resumePoint);
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Generate a Project Example on Demand</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resumePoint" className="block text-sm font-medium text-gray-400 mb-1">Your Tailored Resume Point</label>
          <textarea
            id="resumePoint"
            value={resumePoint}
            onChange={(e) => setResumePoint(e.target.value)}
            rows={3}
            placeholder="Enter a resume bullet point here..."
            className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !resumePoint.trim()}
            className="flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            {isLoading ? 'Generating...' : 'Generate Project Example'}
          </button>
        </div>
      </form>

      {isLoading && (
         <div className="flex flex-col items-center justify-center p-8 mt-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400"></div>
            <p className="mt-3 text-md font-semibold text-gray-300">Building your project story...</p>
         </div>
      )}
      {error && <div className="mt-4 bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">{error}</div>}
      
      {project && (
        <div className="mt-6 border-t border-gray-700 pt-6 animate-fade-in">
           <div className="space-y-4">
            <h4 className="text-md font-bold text-white">{project.title}</h4>
            <p className="text-cyan-300 bg-cyan-900/50 border-l-4 border-cyan-500 p-3 italic text-sm">"{project.scenario}"</p>
            <ProjectDetailSection title="Project Context" content={project.context} />
            <ProjectDetailSection title="Original Design" content={project.originalDesign} />
            <ProjectDetailSection title="Problem / Task" content={project.problem} />
            <ProjectDetailSection title="My Solution" content={project.solution} />
            <ProjectDetailSection title="Result" content={project.result} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OnDemandProjectGenerator;
