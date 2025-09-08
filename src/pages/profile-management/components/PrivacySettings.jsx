import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PrivacySettings = ({ settings, onChange }) => {
  const privacyOptions = [
    {
      key: 'showEmail',
      label: 'Show Email Address',
      description: 'Allow other alumni to see your email address',
      icon: 'Mail'
    },
    {
      key: 'showPhone',
      label: 'Show Phone Number',
      description: 'Display your phone number on your public profile',
      icon: 'Phone'
    },
    {
      key: 'showLinkedIn',
      label: 'Show LinkedIn Profile',
      description: 'Display your LinkedIn profile link',
      icon: 'Linkedin'
    },
    {
      key: 'showCurrentJob',
      label: 'Show Current Employment',
      description: 'Display your current job title and company',
      icon: 'Briefcase'
    },
    {
      key: 'showLocation',
      label: 'Show Location',
      description: 'Display your current location',
      icon: 'MapPin'
    },
    {
      key: 'allowMessages',
      label: 'Allow Direct Messages',
      description: 'Let other alumni send you direct messages',
      icon: 'MessageCircle'
    },
    {
      key: 'showInDirectory',
      label: 'Appear in Alumni Directory',
      description: 'Include your profile in the searchable alumni directory',
      icon: 'Users'
    },
    {
      key: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive email notifications for events and updates',
      icon: 'Bell'
    }
  ];

  const handleSettingChange = (key, value) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Shield" size={24} className="text-primary" />
        <h3 className="font-heading font-semibold text-heading-md text-foreground">
          Privacy Settings
        </h3>
      </div>
      <div className="space-y-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <p className="font-body font-medium text-body-sm text-foreground mb-1">
                Control Your Visibility
              </p>
              <p className="text-body-sm text-muted-foreground">
                Choose what information you want to share with other alumni. You can change these settings anytime.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {privacyOptions?.map((option) => (
            <div key={option?.key} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={option?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <Checkbox
                  label={option?.label}
                  description={option?.description}
                  checked={settings?.[option?.key] || false}
                  onChange={(e) => handleSettingChange(option?.key, e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
            <div>
              <p className="font-body font-medium text-body-sm text-foreground mb-1">
                Privacy Notice
              </p>
              <p className="text-body-sm text-muted-foreground">
                Your basic information (name, graduation year, and course) will always be visible to maintain the integrity of the alumni network. Other details can be controlled above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;