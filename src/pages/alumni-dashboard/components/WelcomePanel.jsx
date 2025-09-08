import React from 'react';

import Button from '../../../components/ui/Button';

const WelcomePanel = ({ user, stats, onPledgeSupport }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 text-white mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'Alumni'}!
          </h1>
          <p className="text-blue-100 mb-4 lg:mb-0">
            Stay connected with your alumni network and explore new opportunities
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats?.connections}</div>
            <div className="text-blue-100 text-sm">Network Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats?.upcomingEvents}</div>
            <div className="text-blue-100 text-sm">Upcoming Events</div>
          </div>
          <div className="hidden lg:block">
            <Button
              variant="secondary"
              onClick={onPledgeSupport}
              iconName="Heart"
              iconPosition="left"
              className="bg-white text-primary hover:bg-gray-50"
            >
              Pledge Support
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:hidden mt-4">
        <Button
          variant="secondary"
          onClick={onPledgeSupport}
          iconName="Heart"
          iconPosition="left"
          fullWidth
          className="bg-white text-primary hover:bg-gray-50"
        >
          Pledge Support
        </Button>
      </div>
    </div>
  );
};

export default WelcomePanel;