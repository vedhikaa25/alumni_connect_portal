import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EventDescription = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card rounded-lg shadow-soft p-6">
      <h2 className="font-heading font-bold text-heading-md text-foreground mb-4">
        About This Event
      </h2>
      <div className="prose prose-sm max-w-none">
        <div className={`text-muted-foreground ${!isExpanded ? 'line-clamp-4' : ''}`}>
          {event?.description?.split('\n')?.map((paragraph, index) => (
            <p key={index} className="font-body text-body-md mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
        
        {event?.description?.length > 300 && (
          <button
            onClick={toggleExpanded}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth mt-4"
          >
            <span className="font-body font-medium text-body-sm">
              {isExpanded ? 'Show Less' : 'Read More'}
            </span>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        )}
      </div>
      {/* Event Highlights */}
      {event?.highlights && event?.highlights?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-body font-semibold text-body-md text-foreground mb-3">
            Event Highlights
          </h3>
          <ul className="space-y-2">
            {event?.highlights?.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="font-body text-body-sm text-muted-foreground">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Requirements */}
      {event?.requirements && event?.requirements?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-body font-semibold text-body-md text-foreground mb-3">
            Requirements
          </h3>
          <ul className="space-y-2">
            {event?.requirements?.map((requirement, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <span className="font-body text-body-sm text-muted-foreground">
                  {requirement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventDescription;