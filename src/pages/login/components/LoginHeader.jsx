import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="GraduationCap" size={24} color="white" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-heading-xl text-foreground">
            Alumni Connect
          </h1>
          <p className="font-body text-body-md text-muted-foreground -mt-1">
            Portal
          </p>
        </div>
      </div>
      
      <div className="max-w-md mx-auto">
        <h2 className="font-heading font-semibold text-heading-lg text-foreground mb-3">
          Connect with Your Network
        </h2>
        <p className="font-body text-body-md text-muted-foreground leading-relaxed">
          Join thousands of alumni building meaningful professional relationships and supporting our institution's growth.
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;