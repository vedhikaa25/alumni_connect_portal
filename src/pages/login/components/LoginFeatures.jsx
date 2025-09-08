import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFeatures = () => {
  const features = [
    {
      icon: 'Users',
      title: 'Alumni Directory',
      description: 'Connect with fellow graduates from your batch and across different years'
    },
    {
      icon: 'Calendar',
      title: 'Events & Networking',
      description: 'Attend exclusive alumni events and professional networking sessions'
    },
    {
      icon: 'Briefcase',
      title: 'Career Opportunities',
      description: 'Access internships, mentorship programs, and job opportunities'
    },
    {
      icon: 'Heart',
      title: 'Support Institution',
      description: 'Contribute to your alma mater through various support initiatives'
    }
  ];

  return (
    <div className="hidden lg:block">
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 h-full">
        <div className="mb-8">
          <h3 className="font-heading font-semibold text-heading-lg text-foreground mb-4">
            Why Join Alumni Connect?
          </h3>
          <p className="font-body text-body-md text-muted-foreground">
            Discover the benefits of staying connected with your educational community.
          </p>
        </div>

        <div className="space-y-6">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-body font-semibold text-body-lg text-foreground mb-1">
                  {feature?.title}
                </h4>
                <p className="font-body text-body-sm text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex items-center space-x-4 text-body-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span>10,000+ Alumni</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFeatures;