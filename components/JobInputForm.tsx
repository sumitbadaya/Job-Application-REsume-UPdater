
import React from 'react';
import { JobDetails } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface JobInputFormProps {
  jobDetails: JobDetails;
  setJobDetails: React.Dispatch<React.SetStateAction<JobDetails>>;
  onGenerate: () => void;
  isLoading: boolean;
  isFormValid: boolean;
}

const JobInputForm: React.FC<JobInputFormProps> = ({ jobDetails, setJobDetails, onGenerate, isLoading, isFormValid }) => {

  const handleChange = <K extends keyof JobDetails>(key: K, value: JobDetails[K]) => {
    setJobDetails(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Analyze Job Description</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              value={jobDetails.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">Company</label>
            <input
              type="text"
              id="company"
              value={jobDetails.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Job Description</label>
          <textarea
            id="description"
            value={jobDetails.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={10}
            placeholder="Paste the full job description here..."
            className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onGenerate}
            disabled={isLoading || !isFormValid}
            className="flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            {isLoading ? 'Generating...' : 'Generate Application Materials'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobInputForm;
