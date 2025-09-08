import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EventHeader = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-soft overflow-hidden">
      {/* Event Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={event?.bannerImage}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 bg-primary rounded-full text-xs font-medium">
              {event?.category}
            </span>
            {event?.isVirtual && (
              <span className="px-3 py-1 bg-accent rounded-full text-xs font-medium text-accent-foreground">
                Virtual Event
              </span>
            )}
          </div>
          <h1 className="font-heading font-bold text-heading-lg md:text-heading-xl mb-2">
            {event?.title}
          </h1>
        </div>
      </div>
      {/* Event Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date & Time */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Calendar" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-body font-semibold text-body-md text-foreground mb-1">
                Date & Time
              </h3>
              <p className="font-body text-body-sm text-muted-foreground">
                {formatDate(event?.date)}
              </p>
              <p className="font-body text-body-sm text-muted-foreground">
                {formatTime(event?.startTime)} - {formatTime(event?.endTime)}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={event?.isVirtual ? "Monitor" : "MapPin"} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-body font-semibold text-body-md text-foreground mb-1">
                Location
              </h3>
              <p className="font-body text-body-sm text-muted-foreground">
                {event?.location}
              </p>
              {event?.address && (
                <p className="font-body text-body-sm text-muted-foreground">
                  {event?.address}
                </p>
              )}
            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-body font-semibold text-body-md text-foreground mb-1">
                Organized by
              </h3>
              <p className="font-body text-body-sm text-muted-foreground">
                {event?.organizer}
              </p>
              <p className="font-body text-body-sm text-muted-foreground">
                {event?.organizerTitle}
              </p>
            </div>
          </div>

          {/* Capacity */}
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-body font-semibold text-body-md text-foreground mb-1">
                Capacity
              </h3>
              <p className="font-body text-body-sm text-muted-foreground">
                {event?.attendeeCount} / {event?.maxCapacity} registered
              </p>
              <div className="w-32 h-2 bg-muted rounded-full mt-2">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(event?.attendeeCount / event?.maxCapacity) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;