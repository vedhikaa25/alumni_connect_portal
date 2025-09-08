import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RSVPSection = ({ event, userRSVP, onRSVPChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const rsvpOptions = [
    { 
      value: 'attending', 
      label: 'Attending', 
      icon: 'Check', 
      color: 'text-success',
      bgColor: 'bg-success',
      description: 'I will be there'
    },
    { 
      value: 'maybe', 
      label: 'Maybe', 
      icon: 'Clock', 
      color: 'text-warning',
      bgColor: 'bg-warning',
      description: 'Not sure yet'
    },
    { 
      value: 'not_attending', 
      label: 'Can\'t Attend', 
      icon: 'X', 
      color: 'text-error',
      bgColor: 'bg-error',
      description: 'Unable to make it'
    }
  ];

  const handleRSVPChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onRSVPChange(newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const getRSVPCounts = () => {
    return {
      attending: event?.rsvpCounts?.attending || 0,
      maybe: event?.rsvpCounts?.maybe || 0,
      not_attending: event?.rsvpCounts?.not_attending || 0
    };
  };

  const counts = getRSVPCounts();
  const totalResponses = counts?.attending + counts?.maybe + counts?.not_attending;

  return (
    <div className="bg-card rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-heading-md text-foreground">
          RSVP Status
        </h2>
        {userRSVP && (
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${rsvpOptions?.find(opt => opt?.value === userRSVP)?.bgColor}`} />
            <span className="font-body text-body-sm text-muted-foreground">
              Your Status: {rsvpOptions?.find(opt => opt?.value === userRSVP)?.label}
            </span>
          </div>
        )}
      </div>
      {/* RSVP Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {rsvpOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => handleRSVPChange(option?.value)}
            disabled={isUpdating}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              userRSVP === option?.value
                ? `border-primary bg-primary/5 ${option?.color}`
                : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
            } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex flex-col items-center space-y-2">
              <Icon 
                name={option?.icon} 
                size={24} 
                className={userRSVP === option?.value ? option?.color : 'text-muted-foreground'}
              />
              <span className="font-body font-medium text-body-sm">
                {option?.label}
              </span>
              <span className="font-body text-caption text-muted-foreground">
                {option?.description}
              </span>
            </div>
          </button>
        ))}
      </div>
      {/* RSVP Statistics */}
      <div className="bg-muted rounded-lg p-4">
        <h3 className="font-body font-semibold text-body-md text-foreground mb-3">
          Response Summary
        </h3>
        <div className="space-y-3">
          {rsvpOptions?.map((option) => {
            const count = counts?.[option?.value];
            const percentage = totalResponses > 0 ? (count / totalResponses) * 100 : 0;
            
            return (
              <div key={option?.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={option?.icon} size={16} className={option?.color} />
                  <span className="font-body text-body-sm text-foreground">
                    {option?.label}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-2 bg-background rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${option?.bgColor} transition-all duration-300`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="font-body text-body-sm text-muted-foreground w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="font-body font-medium text-body-sm text-foreground">
              Total Responses
            </span>
            <span className="font-body font-bold text-body-md text-primary">
              {totalResponses}
            </span>
          </div>
        </div>
      </div>
      {/* Calendar Integration */}
      {userRSVP === 'attending' && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-body font-semibold text-body-md text-foreground mb-3">
            Add to Calendar
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => {/* Add to Google Calendar */}}
            >
              Google Calendar
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => {/* Add to Outlook */}}
            >
              Outlook
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => {/* Download ICS */}}
            >
              Download ICS
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RSVPSection;