import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AttendeeList = ({ attendees }) => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttendees = attendees?.filter(attendee =>
    attendee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    attendee?.batch?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    attendee?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const displayedAttendees = showAll ? filteredAttendees : filteredAttendees?.slice(0, 12);

  const getStatusColor = (status) => {
    switch (status) {
      case 'attending':
        return 'bg-success';
      case 'maybe':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'attending':
        return 'Check';
      case 'maybe':
        return 'Clock';
      default:
        return 'X';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-heading-md text-foreground">
          Attendees ({filteredAttendees?.length})
        </h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search attendees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg font-body text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
      {/* Attendee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {displayedAttendees?.map((attendee) => (
          <div
            key={attendee?.id}
            className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-smooth"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <Image
                  src={attendee?.avatar}
                  alt={attendee?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(attendee?.rsvpStatus)} rounded-full border-2 border-card flex items-center justify-center`}>
                <Icon 
                  name={getStatusIcon(attendee?.rsvpStatus)} 
                  size={8} 
                  color="white"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-medium text-body-sm text-foreground truncate">
                {attendee?.name}
              </h3>
              <p className="font-body text-caption text-muted-foreground truncate">
                {attendee?.batch} • {attendee?.company}
              </p>
              <p className="font-body text-caption text-muted-foreground truncate">
                {attendee?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Show More/Less Button */}
      {filteredAttendees?.length > 12 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center space-x-2 mx-auto px-4 py-2 text-primary hover:text-primary/80 transition-smooth"
          >
            <span className="font-body font-medium text-body-sm">
              {showAll ? 'Show Less' : `Show All ${filteredAttendees?.length} Attendees`}
            </span>
            <Icon 
              name={showAll ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        </div>
      )}
      {/* Empty State */}
      {filteredAttendees?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-body font-medium text-body-md text-foreground mb-2">
            No attendees found
          </h3>
          <p className="font-body text-body-sm text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms' : 'Be the first to RSVP for this event!'}
          </p>
        </div>
      )}
      {/* Networking Tip */}
      {filteredAttendees?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg">
            <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-body-sm text-foreground mb-1">
                Networking Tip
              </h4>
              <p className="font-body text-caption text-muted-foreground">
                Review the attendee list to identify potential connections and prepare conversation starters based on shared interests or backgrounds.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeeList;