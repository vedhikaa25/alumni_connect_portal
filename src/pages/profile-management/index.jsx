import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfileImageUpload from './components/ProfileImageUpload';
import PersonalInfoSection from './components/PersonalInfoSection';
import ProfessionalInfoSection from './components/ProfessionalInfoSection';
import AchievementsSection from './components/AchievementsSection';
import PrivacySettings from './components/PrivacySettings';
import ProfileCompleteness from './components/ProfileCompleteness';

const ProfileManagement = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "alumni"
  });

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    graduationYear: "2018",
    degreeType: "bachelor",
    course: "computer-science",
    location: "San Francisco, CA",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp Inc.",
    industry: "technology",
    experienceLevel: "senior",
    employmentType: "full-time",
    workLocation: "San Francisco, CA",
    skills: "JavaScript, React, Node.js, Python, AWS, Docker",
    summary: `Experienced software engineer with 6+ years of expertise in full-stack development. Passionate about building scalable web applications and mentoring junior developers. Currently leading a team of 5 engineers at TechCorp Inc., focusing on cloud-native solutions and microservices architecture.`
  });

  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face");

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Employee of the Year",
      description: "Recognized for outstanding performance and leadership in delivering critical projects ahead of schedule.",
      year: "2023"
    },
    {
      id: 2,
      title: "AWS Certified Solutions Architect",
      description: "Achieved professional certification in cloud architecture and solutions design.",
      year: "2022"
    }
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    showEmail: true,
    showPhone: false,
    showLinkedIn: true,
    showCurrentJob: true,
    showLocation: true,
    allowMessages: true,
    showInDirectory: true,
    emailNotifications: true
  });

  const [errors, setErrors] = useState({});

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (Object.keys(formData)?.some(key => formData?.[key])) {
        // Simulate auto-save
        console.log('Auto-saving profile data...');
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    }

    if (!formData?.degreeType) {
      newErrors.degreeType = 'Degree type is required';
    }

    if (!formData?.course) {
      newErrors.course = 'Course/major is required';
    }

    // Optional field validations
    if (formData?.linkedin && !formData?.linkedin?.includes('linkedin.com')) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    }

    if (formData?.phone && !/^\+?[\d\s\-\(\)]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
      console.log('Profile saved:', {
        formData,
        profileImage,
        achievements,
        privacySettings
      });
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreviewProfile = () => {
    // Navigate to a preview or public profile view
    console.log('Previewing public profile...');
    // In a real app, this might open a modal or navigate to a preview page
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: 'User' },
    { id: 'privacy', label: 'Privacy Settings', icon: 'Shield' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-body-md text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-heading-lg text-foreground mb-2">
                Profile Management
              </h1>
              <p className="text-body-md text-muted-foreground">
                Manage your professional information and networking preferences
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={handlePreviewProfile}
                iconName="Eye"
                iconPosition="left"
              >
                Preview Profile
              </Button>
              <Button
                variant="default"
                onClick={handleSaveProfile}
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <p className="font-body font-medium text-body-sm text-success">
                  Profile updated successfully!
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-4 py-3 font-body font-medium text-body-sm transition-smooth border-b-2 ${
                      activeTab === tab?.id
                        ? 'text-primary border-primary' :'text-muted-foreground border-transparent hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="hidden sm:inline">{tab?.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-8">
                {activeTab === 'profile' && (
                  <>
                    {/* Profile Image Upload */}
                    <div className="bg-card rounded-lg border border-border p-6">
                      <h3 className="font-heading font-semibold text-heading-md text-foreground mb-6">
                        Profile Photo
                      </h3>
                      <ProfileImageUpload
                        currentImage={profileImage}
                        onImageChange={setProfileImage}
                      />
                    </div>

                    {/* Personal Information */}
                    <PersonalInfoSection
                      formData={formData}
                      errors={errors}
                      onChange={handleFormChange}
                    />

                    {/* Professional Information */}
                    <ProfessionalInfoSection
                      formData={formData}
                      errors={errors}
                      onChange={handleFormChange}
                    />
                  </>
                )}

                {activeTab === 'achievements' && (
                  <AchievementsSection
                    achievements={achievements}
                    onChange={setAchievements}
                  />
                )}

                {activeTab === 'privacy' && (
                  <PrivacySettings
                    settings={privacySettings}
                    onChange={setPrivacySettings}
                  />
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Profile Completeness */}
                <ProfileCompleteness
                  formData={formData}
                  profileImage={profileImage}
                />

                {/* Quick Actions */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-heading font-semibold text-heading-sm text-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => navigate('/alumni-directory')}
                      iconName="Users"
                      iconPosition="left"
                    >
                      Browse Directory
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => navigate('/event-details')}
                      iconName="Calendar"
                      iconPosition="left"
                    >
                      View Events
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => navigate('/alumni-dashboard')}
                      iconName="LayoutDashboard"
                      iconPosition="left"
                    >
                      Dashboard
                    </Button>
                  </div>
                </div>

                {/* Help & Support */}
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="font-body font-medium text-body-sm text-foreground mb-1">
                        Need Help?
                      </p>
                      <p className="text-body-sm text-muted-foreground mb-3">
                        Contact our support team for assistance with your profile.
                      </p>
                      <Button variant="ghost" size="sm">
                        Get Support
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileManagement;