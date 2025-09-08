import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickAccessCard = ({ title, description, icon, color, onClick, badge }) => {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-smooth text-left w-full group"
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
          <Icon name={icon} size={20} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground text-sm">
              {title}
            </h3>
            {badge && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {badge}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>
        <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </button>
  );
};

export default QuickAccessCard;