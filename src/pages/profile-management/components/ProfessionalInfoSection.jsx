import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfessionalInfoSection = ({ formData, errors, onChange }) => {
  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'government', label: 'Government' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'startup', label: 'Startup' },
    { value: 'other', label: 'Other' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Manager (10+ years)' },
    { value: 'executive', label: 'Executive (15+ years)' }
  ];

  const employmentTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'student', label: 'Student' },
    { value: 'unemployed', label: 'Currently Seeking' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="font-heading font-semibold text-heading-md text-foreground mb-6">
        Professional Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Current Job Title"
          type="text"
          placeholder="e.g., Software Engineer, Marketing Manager"
          value={formData?.jobTitle}
          onChange={(e) => onChange('jobTitle', e?.target?.value)}
          error={errors?.jobTitle}
        />

        <Input
          label="Company Name"
          type="text"
          placeholder="Enter your current company"
          value={formData?.company}
          onChange={(e) => onChange('company', e?.target?.value)}
          error={errors?.company}
        />

        <Select
          label="Industry"
          options={industryOptions}
          value={formData?.industry}
          onChange={(value) => onChange('industry', value)}
          error={errors?.industry}
          searchable
          placeholder="Select your industry"
        />

        <Select
          label="Experience Level"
          options={experienceLevels}
          value={formData?.experienceLevel}
          onChange={(value) => onChange('experienceLevel', value)}
          error={errors?.experienceLevel}
          placeholder="Select experience level"
        />

        <Select
          label="Employment Type"
          options={employmentTypes}
          value={formData?.employmentType}
          onChange={(value) => onChange('employmentType', value)}
          error={errors?.employmentType}
          placeholder="Select employment type"
        />

        <Input
          label="Work Location"
          type="text"
          placeholder="City, State or Remote"
          value={formData?.workLocation}
          onChange={(e) => onChange('workLocation', e?.target?.value)}
          error={errors?.workLocation}
        />

        <div className="md:col-span-2">
          <Input
            label="Skills & Expertise"
            type="text"
            placeholder="e.g., JavaScript, Project Management, Data Analysis (comma-separated)"
            value={formData?.skills}
            onChange={(e) => onChange('skills', e?.target?.value)}
            error={errors?.skills}
            description="List your key skills separated by commas"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-body font-medium text-body-sm text-foreground mb-2">
            Professional Summary
          </label>
          <textarea
            placeholder="Write a brief professional summary highlighting your experience, achievements, and career goals..."
            value={formData?.summary}
            onChange={(e) => onChange('summary', e?.target?.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
          {errors?.summary && (
            <p className="mt-1 text-caption text-error">{errors?.summary}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoSection;