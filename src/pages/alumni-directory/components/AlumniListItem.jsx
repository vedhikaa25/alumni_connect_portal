import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlumniListItem = ({ alumni, onViewProfile }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-center space-x-4">
        {/* Profile Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={alumni?.profileImage}
            alt={`${alumni?.name} profile`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-heading-sm text-foreground truncate">
                {alumni?.name}
              </h3>
              <p className="font-body text-body-sm text-muted-foreground">
                {alumni?.course} • {alumni?.batch}
              </p>
              <div className="mt-2">
                <p className="font-body font-medium text-body-sm text-foreground">
                  {alumni?.currentPosition}
                </p>
                <p className="font-body text-body-sm text-muted-foreground">
                  {alumni?.company}
                </p>
              </div>
            </div>

            {/* Right Side Info */}
            <div className="flex flex-col sm:items-end space-y-2">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span className="font-body text-caption">{alumni?.location}</span>
              </div>
              
              {/* Skills */}
              {alumni?.skills && alumni?.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:justify-end">
                  {alumni?.skills?.slice(0, 2)?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground font-body text-caption rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {alumni?.skills?.length > 2 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground font-body text-caption rounded-md">
                      +{alumni?.skills?.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* View Profile Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(alumni)}
                iconName="Eye"
                iconPosition="left"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniListItem;