import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'profile_update': return 'User';
      case 'event_rsvp': return 'Calendar';
      case 'connection': return 'UserPlus';
      case 'achievement': return 'Award';
      case 'post': return 'MessageSquare';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'profile_update': return 'text-blue-500';
      case 'event_rsvp': return 'text-green-500';
      case 'connection': return 'text-purple-500';
      case 'achievement': return 'text-yellow-500';
      case 'post': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-4">
      {activities?.map((activity) => (
        <div key={activity?.id} className="flex items-start space-x-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={activity?.user?.avatar}
                alt={activity?.user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-card rounded-full flex items-center justify-center border border-border`}>
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={10} 
                className={getActivityColor(activity?.type)} 
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-foreground text-sm">
                {activity?.user?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {activity?.user?.batch}
              </span>
              <span className="text-xs text-muted-foreground">
                •
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(activity?.timestamp)}
              </span>
            </div>
            
            <p className="text-muted-foreground text-sm line-clamp-2">
              {activity?.description}
            </p>
            
            {activity?.metadata && (
              <div className="mt-2 p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">
                  {activity?.metadata}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;