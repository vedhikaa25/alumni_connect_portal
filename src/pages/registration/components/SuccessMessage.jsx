import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ onBackToLogin, userEmail }) => {
  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="font-heading font-semibold text-heading-lg text-foreground">
          Registration Submitted Successfully!
        </h2>
        
        <div className="space-y-3">
          <p className="font-body text-body-md text-muted-foreground max-w-md mx-auto">
            Thank you for registering with Alumni Connect Portal. Your registration has been submitted for administrative review.
          </p>
          
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="font-body font-medium text-body-sm text-foreground">
                Pending Admin Approval
              </span>
            </div>
            <p className="font-body text-caption text-muted-foreground">
              Your account will be activated once approved by our administrators
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-heading font-medium text-heading-sm text-foreground">
          What happens next?
        </h3>
        
        <div className="space-y-3 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="font-body font-medium text-caption text-primary">1</span>
            </div>
            <div>
              <p className="font-body text-body-sm text-foreground font-medium">
                Email Confirmation
              </p>
              <p className="font-body text-caption text-muted-foreground">
                A confirmation email has been sent to {userEmail}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="font-body font-medium text-caption text-primary">2</span>
            </div>
            <div>
              <p className="font-body text-body-sm text-foreground font-medium">
                Admin Review
              </p>
              <p className="font-body text-caption text-muted-foreground">
                Our team will verify your information within 24-48 hours
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="font-body font-medium text-caption text-primary">3</span>
            </div>
            <div>
              <p className="font-body text-body-sm text-foreground font-medium">
                Account Activation
              </p>
              <p className="font-body text-caption text-muted-foreground">
                You'll receive an approval email with login instructions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
          <span className="font-body font-medium text-body-sm text-foreground">
            Need Help?
          </span>
        </div>
        <p className="font-body text-caption text-muted-foreground">
          Contact our support team at{' '}
          <span className="text-primary font-medium">support@alumniconnect.edu</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button
          variant="outline"
          onClick={onBackToLogin}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Login
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => window.location.href = 'mailto:support@alumniconnect.edu'}
          iconName="Mail"
          iconPosition="left"
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default SuccessMessage;