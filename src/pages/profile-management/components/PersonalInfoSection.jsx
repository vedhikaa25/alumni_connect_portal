import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ formData, errors, onChange }) => {
  const graduationYears = [];
  const currentYear = new Date()?.getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    graduationYears?.push({ value: year?.toString(), label: year?.toString() });
  }

  const courseOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'civil-engineering', label: 'Civil Engineering' },
    { value: 'business-administration', label: 'Business Administration' },
    { value: 'economics', label: 'Economics' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'biology', label: 'Biology' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'physics', label: 'Physics' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english', label: 'English Literature' },
    { value: 'history', label: 'History' },
    { value: 'other', label: 'Other' }
  ];

  const degreeOptions = [
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="font-heading font-semibold text-heading-md text-foreground mb-6">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => onChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={(e) => onChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData?.phone}
          onChange={(e) => onChange('phone', e?.target?.value)}
          error={errors?.phone}
        />

        <Input
          label="LinkedIn Profile"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          value={formData?.linkedin}
          onChange={(e) => onChange('linkedin', e?.target?.value)}
          error={errors?.linkedin}
        />

        <Select
          label="Graduation Year"
          options={graduationYears}
          value={formData?.graduationYear}
          onChange={(value) => onChange('graduationYear', value)}
          error={errors?.graduationYear}
          required
          searchable
          placeholder="Select graduation year"
        />

        <Select
          label="Degree Type"
          options={degreeOptions}
          value={formData?.degreeType}
          onChange={(value) => onChange('degreeType', value)}
          error={errors?.degreeType}
          required
          placeholder="Select degree type"
        />

        <Select
          label="Course/Major"
          options={courseOptions}
          value={formData?.course}
          onChange={(value) => onChange('course', value)}
          error={errors?.course}
          required
          searchable
          placeholder="Select your course"
        />

        <Input
          label="Current Location"
          type="text"
          placeholder="City, State, Country"
          value={formData?.location}
          onChange={(e) => onChange('location', e?.target?.value)}
          error={errors?.location}
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;