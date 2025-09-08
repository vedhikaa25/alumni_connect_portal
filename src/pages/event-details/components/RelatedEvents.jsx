import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedEvents = ({ events }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEventClick = (eventId) => {
    // Navigate to event details - in a real app, this would include the event ID
    navigate('/event-details');
  };

  if (!events || events?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg shadow-soft p-6">
      <h2 className="font-heading font-bold text-heading-md text-foreground mb-6">
        Related Events
      </h2>
      <div className="space-y-4">
        {events?.map((event) => (
          <div
            key={event?.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth cursor-pointer"
            onClick={() => handleEventClick(event?.id)}
          >
            {/* Event Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={event?.image}
                alt={event?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-body font-semibold text-body-sm text-foreground line-clamp-2">
                  {event?.title}
                </h3>
                <div className="flex flex-col items-end ml-4 flex-shrink-0">
                  <span className="font-body font-medium text-body-sm text-primary">
                    {formatDate(event?.date)}
                  </span>
                  <span className="font-body text-caption text-muted-foreground">
                    {event?.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-caption text-muted-foreground mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span>{event?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{event?.attendeeCount} attending</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-caption font-medium">
                    {event?.category}
                  </span>
                  {event?.isVirtual && (
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded text-caption font-medium">
                      Virtual
                    </span>
                  )}
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View All Events */}
      <div className="mt-6 pt-6 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={() => navigate('/alumni-dashboard')}
        >
          View All Events
        </Button>
      </div>
    </div>
  );
};

export default RelatedEvents;