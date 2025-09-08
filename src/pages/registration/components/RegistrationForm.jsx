import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    graduationYear: '',
    course: '',
    currentCompany: '',
    jobTitle: '',
    location: '',
    profileImage: null,
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const graduationYears = Array.from({ length: 50 }, (_, i) => {
    const year = new Date()?.getFullYear() - i;
    return { value: year?.toString(), label: year?.toString() };
  });

  const courses = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'mechanical-engineering', label: 'Mechanical Engineering' },
    { value: 'business-administration', label: 'Business Administration' },
    { value: 'economics', label: 'Economics' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'biology', label: 'Biology' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'physics', label: 'Physics' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english-literature', label: 'English Literature' },
    { value: 'history', label: 'History' },
    { value: 'political-science', label: 'Political Science' },
    { value: 'sociology', label: 'Sociology' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    }

    if (!formData?.course) {
      newErrors.course = 'Course/Program is required';
    }

    if (!formData?.currentCompany?.trim()) {
      newErrors.currentCompany = 'Current company is required';
    }

    if (!formData?.jobTitle?.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData?.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: 'Image size must be less than 5MB' }));
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes?.includes(file?.type)) {
        setErrors(prev => ({ ...prev, profileImage: 'Only JPEG, PNG, and GIF files are allowed' }));
        return;
      }

      setFormData(prev => ({ ...prev, profileImage: file }));
      setErrors(prev => ({ ...prev, profileImage: '' }));

      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e?.target?.result);
      reader?.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="User" size={32} className="text-muted-foreground" />
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-smooth">
            <Icon name="Camera" size={16} color="white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        <div className="text-center">
          <p className="font-body text-body-sm text-muted-foreground">
            Upload your profile photo
          </p>
          <p className="font-body text-caption text-muted-foreground">
            Max size: 5MB (JPEG, PNG, GIF)
          </p>
        </div>
        {errors?.profileImage && (
          <p className="text-error text-caption font-body">{errors?.profileImage}</p>
        )}
      </div>
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll use this for account verification"
          required
        />
      </div>
      {/* Academic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Graduation Year"
          placeholder="Select graduation year"
          options={graduationYears}
          value={formData?.graduationYear}
          onChange={(value) => handleInputChange('graduationYear', value)}
          error={errors?.graduationYear}
          required
        />

        <Select
          label="Course/Program"
          placeholder="Select your course"
          options={courses}
          value={formData?.course}
          onChange={(value) => handleInputChange('course', value)}
          error={errors?.course}
          searchable
          required
        />
      </div>
      {/* Professional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Current Company"
          type="text"
          placeholder="Enter your current company"
          value={formData?.currentCompany}
          onChange={(e) => handleInputChange('currentCompany', e?.target?.value)}
          error={errors?.currentCompany}
          required
        />

        <Input
          label="Job Title"
          type="text"
          placeholder="Enter your job title"
          value={formData?.jobTitle}
          onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
          error={errors?.jobTitle}
          required
        />
      </div>
      <Input
        label="Location"
        type="text"
        placeholder="Enter your current location (City, Country)"
        value={formData?.location}
        onChange={(e) => handleInputChange('location', e?.target?.value)}
        error={errors?.location}
        required
      />
      {/* Terms and Privacy */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="I agree to the Privacy Policy"
          checked={formData?.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
          error={errors?.agreeToPrivacy}
          required
        />
      </div>
      {/* Submit Button */}
      <div className="pt-6">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          iconName="UserPlus"
          iconPosition="left"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Registration...' : 'Submit Registration'}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;