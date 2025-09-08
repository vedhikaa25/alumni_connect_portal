import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileCompleteness = ({ formData, profileImage }) => {
  const calculateCompleteness = () => {
    const requiredFields = [
      'fullName', 'email', 'graduationYear', 'degreeType', 'course'
    ];
    
    const optionalFields = [
      'phone', 'linkedin', 'location', 'jobTitle', 'company', 
      'industry', 'skills', 'summary'
    ];

    let completed = 0;
    let total = requiredFields?.length + optionalFields?.length + 1; // +1 for profile image

    // Check required fields
    requiredFields?.forEach(field => {
      if (formData?.[field] && formData?.[field]?.trim()) {
        completed++;
      }
    });

    // Check optional fields
    optionalFields?.forEach(field => {
      if (formData?.[field] && formData?.[field]?.trim()) {
        completed++;
      }
    });

    // Check profile image
    if (profileImage) {
      completed++;
    }

    return Math.round((completed / total) * 100);
  };

  const completeness = calculateCompleteness();

  const getCompletenessColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getCompletenessIcon = (percentage) => {
    if (percentage >= 80) return 'CheckCircle';
    if (percentage >= 60) return 'AlertCircle';
    return 'XCircle';
  };

  const sections = [
    {
      title: 'Profile Photo',
      completed: !!profileImage,
      icon: 'Camera'
    },
    {
      title: 'Personal Information',
      completed: formData?.fullName && formData?.email && formData?.graduationYear && formData?.course,
      icon: 'User'
    },
    {
      title: 'Professional Details',
      completed: formData?.jobTitle && formData?.company,
      icon: 'Briefcase'
    },
    {
      title: 'Contact Information',
      completed: formData?.phone && formData?.linkedin,
      icon: 'Phone'
    },
    {
      title: 'Skills & Summary',
      completed: formData?.skills && formData?.summary,
      icon: 'Award'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="font-heading font-semibold text-heading-md text-foreground mb-6">
        Profile Completeness
      </h3>
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body font-medium text-body-sm text-foreground">
            Overall Progress
          </span>
          <div className="flex items-center gap-2">
            <Icon 
              name={getCompletenessIcon(completeness)} 
              size={16} 
              className={getCompletenessColor(completeness)} 
            />
            <span className={`font-body font-semibold text-body-sm ${getCompletenessColor(completeness)}`}>
              {completeness}%
            </span>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              completeness >= 80 ? 'bg-success' : 
              completeness >= 60 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>
      {/* Section Breakdown */}
      <div className="space-y-3">
        <h4 className="font-body font-medium text-body-sm text-foreground mb-3">
          Section Status
        </h4>
        {sections?.map((section, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Icon 
                name={section?.icon} 
                size={16} 
                className="text-muted-foreground" 
              />
              <span className="font-body text-body-sm text-foreground">
                {section?.title}
              </span>
            </div>
            <Icon 
              name={section?.completed ? 'Check' : 'X'} 
              size={16} 
              className={section?.completed ? 'text-success' : 'text-muted-foreground'} 
            />
          </div>
        ))}
      </div>
      {/* Tips */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <p className="font-body font-medium text-body-sm text-foreground mb-1">
              Profile Tips
            </p>
            <ul className="text-body-sm text-muted-foreground space-y-1">
              <li>• Complete profiles get 3x more networking connections</li>
              <li>• Add a professional photo to increase visibility</li>
              <li>• Include skills to be found by relevant opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompleteness;