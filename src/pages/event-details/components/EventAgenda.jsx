import React from 'react';
import Icon from '../../../components/AppIcon';

const EventAgenda = ({ agenda }) => {
  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'presentation':
        return 'Presentation';
      case 'networking':
        return 'Users';
      case 'break':
        return 'Coffee';
      case 'panel':
        return 'MessageSquare';
      case 'workshop':
        return 'Wrench';
      default:
        return 'Clock';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'presentation':
        return 'text-primary bg-primary/10';
      case 'networking':
        return 'text-success bg-success/10';
      case 'break':
        return 'text-warning bg-warning/10';
      case 'panel':
        return 'text-accent bg-accent/10';
      case 'workshop':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  if (!agenda || agenda?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg shadow-soft p-6">
      <h2 className="font-heading font-bold text-heading-md text-foreground mb-6">
        Event Agenda
      </h2>
      <div className="space-y-4">
        {agenda?.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            {/* Time */}
            <div className="flex-shrink-0 w-20 text-right">
              <span className="font-body font-medium text-body-sm text-foreground">
                {formatTime(item?.startTime)}
              </span>
              {item?.endTime && (
                <span className="font-body text-caption text-muted-foreground block">
                  {formatTime(item?.endTime)}
                </span>
              )}
            </div>

            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(item?.type)}`}>
                <Icon name={getActivityIcon(item?.type)} size={16} />
              </div>
              {index < agenda?.length - 1 && (
                <div className="w-px h-8 bg-border mt-2" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-body font-semibold text-body-md text-foreground">
                  {item?.title}
                </h3>
                <span className="px-2 py-1 bg-muted rounded text-caption font-medium text-muted-foreground ml-4 flex-shrink-0">
                  {item?.duration}
                </span>
              </div>
              
              {item?.description && (
                <p className="font-body text-body-sm text-muted-foreground mb-3">
                  {item?.description}
                </p>
              )}

              {/* Speaker/Facilitator */}
              {item?.speaker && (
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="User" size={14} className="text-muted-foreground" />
                  <span className="font-body text-caption text-muted-foreground">
                    {item?.speaker}
                    {item?.speakerTitle && ` • ${item?.speakerTitle}`}
                  </span>
                </div>
              )}

              {/* Location */}
              {item?.location && (
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} className="text-muted-foreground" />
                  <span className="font-body text-caption text-muted-foreground">
                    {item?.location}
                  </span>
                </div>
              )}

              {/* Tags */}
              {item?.tags && item?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item?.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-caption font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Download Agenda */}
      <div className="mt-6 pt-6 border-t border-border">
        <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth">
          <Icon name="Download" size={16} />
          <span className="font-body font-medium text-body-sm">
            Download Full Agenda
          </span>
        </button>
      </div>
    </div>
  );
};

export default EventAgenda;