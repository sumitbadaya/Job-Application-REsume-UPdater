
import React from 'react';
import { UserProfile } from '../types';
import { UserIcon } from './icons/UserIcon';

interface UserProfileFormProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ userProfile, setUserProfile }) => {
  
  const handleChange = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setUserProfile(prev => ({ ...prev, [key]: value }));
  };

  const InputField: React.FC<{ label: string; name: keyof UserProfile; value: string; isTextarea?: boolean }> = ({ label, name, value, isTextarea = false }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          rows={6}
          className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
      )}
    </div>
  );

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-white"><UserIcon className="h-6 w-6 mr-2 text-cyan-400"/> My Profile</h2>
      <div className="space-y-4">
        <InputField label="Full Name" name="fullName" value={userProfile.fullName} />
        <InputField label="Experience Summary" name="experienceSummary" value={userProfile.experienceSummary} isTextarea />
        <InputField label="Key Skills (comma-separated)" name="skills" value={userProfile.skills} isTextarea />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Years of Experience" name="yearsOfExperience" value={userProfile.yearsOfExperience} />
            <InputField label="Notice Period" name="noticePeriod" value={userProfile.noticePeriod} />
        </div>
        <InputField label="Salary Expectation" name="salaryExpectation" value={userProfile.salaryExpectation} />
      </div>
    </div>
  );
};

export default UserProfileForm;
