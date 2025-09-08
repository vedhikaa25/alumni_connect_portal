import React from 'react';
import Icon from '../../../components/AppIcon';

const NetworkStats = ({ totalAlumni, filteredCount, featuredAlumni }) => {
  const stats = [
    {
      icon: 'Users',
      label: 'Total Alumni',
      value: totalAlumni?.toLocaleString(),
      color: 'text-primary'
    },
    {
      icon: 'Search',
      label: 'Search Results',
      value: filteredCount?.toLocaleString(),
      color: 'text-accent'
    },
    {
      icon: 'Star',
      label: 'Featured Alumni',
      value: featuredAlumni?.length?.toString(),
      color: 'text-warning'
    },
    {
      icon: 'TrendingUp',
      label: 'Active This Month',
      value: Math.floor(totalAlumni * 0.15)?.toLocaleString(),
      color: 'text-success'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="font-heading font-semibold text-heading-sm text-foreground mb-4">
        Network Statistics
      </h3>
      <div className="space-y-4">
        {stats?.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-muted ${stat?.color}`}>
              <Icon name={stat?.icon} size={16} />
            </div>
            <div>
              <p className="font-body font-semibold text-body-md text-foreground">
                {stat?.value}
              </p>
              <p className="font-body text-caption text-muted-foreground">
                {stat?.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Featured Alumni Section */}
      {featuredAlumni?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-heading font-medium text-body-lg text-foreground mb-3">
            Featured Alumni
          </h4>
          <div className="space-y-3">
            {featuredAlumni?.slice(0, 3)?.map((alumni) => (
              <div key={alumni?.id} className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={alumni?.profileImage}
                    alt={alumni?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-body-sm text-foreground truncate">
                    {alumni?.name}
                  </p>
                  <p className="font-body text-caption text-muted-foreground truncate">
                    {alumni?.currentPosition}
                  </p>
                </div>
                <Icon name="Star" size={14} className="text-warning flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkStats;