import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onRSVP }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'networking': return 'Users';
      case 'workshop': return 'BookOpen';
      case 'social': return 'Coffee';
      case 'career': return 'Briefcase';
      default: return 'Calendar';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'networking': return 'bg-blue-500';
      case 'workshop': return 'bg-green-500';
      case 'social': return 'bg-purple-500';
      case 'career': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
      <div className="flex items-start space-x-3 mb-3">
        <div className={`w-10 h-10 ${getEventTypeColor(event?.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon name={getEventTypeIcon(event?.type)} size={20} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
            {event?.title}
          </h3>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{formatDate(event?.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{formatTime(event?.date)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-3">
            <Icon name="MapPin" size={12} />
            <span className="line-clamp-1">{event?.location}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {event?.attendees} attending
          </span>
          {event?.rsvpStatus && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              event?.rsvpStatus === 'going' ?'bg-success/10 text-success' 
                : event?.rsvpStatus === 'maybe' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
            }`}>
              {event?.rsvpStatus === 'going' ? 'Going' : event?.rsvpStatus === 'maybe' ? 'Maybe' : 'Not Going'}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRSVP(event?.id)}
          iconName="Calendar"
          iconPosition="left"
        >
          RSVP
        </Button>
      </div>
    </div>
  );
};

export default EventCard;