import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SuccessMessage from './components/SuccessMessage';

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const navigate = useNavigate();

  const handleRegistrationSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration logic
      console.log('Registration data:', formData);
      
      setSubmittedEmail(formData?.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
            <div className="max-w-md space-y-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AC</span>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-heading-xl text-foreground">
                  Welcome to Alumni Connect
                </h2>
                <p className="font-body text-body-lg text-muted-foreground">
                  Join thousands of alumni who are already connected, sharing opportunities, and building lasting professional relationships.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="font-heading font-bold text-heading-md text-foreground">5,000+</p>
                  <p className="font-body text-body-sm text-muted-foreground">Alumni Members</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="font-heading font-bold text-heading-md text-foreground">200+</p>
                  <p className="font-body text-body-sm text-muted-foreground">Annual Events</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-2xl">
            {!isSubmitted ? (
              <>
                <RegistrationHeader />
                <div className="bg-card border border-border rounded-xl shadow-soft p-6 lg:p-8">
                  <RegistrationForm 
                    onSubmit={handleRegistrationSubmit}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </>
            ) : (
              <div className="bg-card border border-border rounded-xl shadow-soft p-6 lg:p-8">
                <SuccessMessage 
                  onBackToLogin={handleBackToLogin}
                  userEmail={submittedEmail}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header for smaller screens */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <span className="font-heading font-semibold text-heading-sm text-foreground">
              Alumni Connect
            </span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="font-body text-body-sm text-primary hover:text-primary/80 transition-smooth"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Mobile spacing */}
      <div className="lg:hidden h-16"></div>
    </div>
  );
};

export default Registration;