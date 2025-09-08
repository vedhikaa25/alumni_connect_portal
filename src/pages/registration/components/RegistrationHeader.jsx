import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6 mb-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Icon name="GraduationCap" size={24} color="white" />
          </div>
          <div className="text-left">
            <h1 className="font-heading font-bold text-heading-md text-foreground">
              Alumni Connect
            </h1>
            <p className="font-body text-caption text-muted-foreground -mt-1">
              Portal
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-3">
        <h2 className="font-heading font-semibold text-heading-lg text-foreground">
          Join Our Alumni Network
        </h2>
        <p className="font-body text-body-md text-muted-foreground max-w-md mx-auto">
          Connect with fellow graduates, discover opportunities, and stay engaged with your alma mater.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="flex flex-col items-center space-y-2 p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="font-body font-medium text-body-sm text-foreground">
              Network
            </p>
            <p className="font-body text-caption text-muted-foreground">
              Connect with alumni
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="font-body font-medium text-body-sm text-foreground">
              Events
            </p>
            <p className="font-body text-caption text-muted-foreground">
              Join exclusive events
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4 bg-muted/30 rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Briefcase" size={20} className="text-primary" />
          </div>
          <div className="text-center">
            <p className="font-body font-medium text-body-sm text-foreground">
              Opportunities
            </p>
            <p className="font-body text-caption text-muted-foreground">
              Find career growth
            </p>
          </div>
        </div>
      </div>

      {/* Login Link */}
      <div className="flex items-center justify-center space-x-2 pt-4">
        <span className="font-body text-body-sm text-muted-foreground">
          Already have an account?
        </span>
        <Button
          variant="link"
          onClick={() => navigate('/login')}
          className="p-0 h-auto font-medium"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;