import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NetworkingHighlight = ({ highlight }) => {
  const getHighlightIcon = (type) => {
    switch (type) {
      case 'new_member': return 'UserPlus';
      case 'achievement': return 'Award';
      case 'promotion': return 'TrendingUp';
      case 'milestone': return 'Star';
      default: return 'Users';
    }
  };

  const getHighlightColor = (type) => {
    switch (type) {
      case 'new_member': return 'bg-blue-500';
      case 'achievement': return 'bg-yellow-500';
      case 'promotion': return 'bg-green-500';
      case 'milestone': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now - past) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return past?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
      <div className="flex items-start space-x-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={highlight?.avatar}
              alt={highlight?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getHighlightColor(highlight?.type)} rounded-full flex items-center justify-center`}>
            <Icon name={getHighlightIcon(highlight?.type)} size={12} color="white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-foreground text-sm truncate">
              {highlight?.name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {highlight?.batch}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
            {highlight?.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(highlight?.timestamp)}
            </span>
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded-full hover:bg-muted transition-smooth">
                <Icon name="Heart" size={14} className="text-muted-foreground hover:text-error" />
              </button>
              <button className="p-1 rounded-full hover:bg-muted transition-smooth">
                <Icon name="MessageCircle" size={14} className="text-muted-foreground hover:text-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingHighlight;