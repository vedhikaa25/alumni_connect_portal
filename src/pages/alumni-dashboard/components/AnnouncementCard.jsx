import React from 'react';
import Icon from '../../../components/AppIcon';

const AnnouncementCard = ({ announcement }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="Megaphone" size={20} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
            {announcement?.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-3">
            {announcement?.content}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {formatDate(announcement?.date)}
            </span>
            {announcement?.priority === 'high' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                Important
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;