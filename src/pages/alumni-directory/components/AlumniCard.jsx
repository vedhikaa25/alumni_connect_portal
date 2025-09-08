import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlumniCard = ({ alumni, onViewProfile }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-muted">
          <Image
            src={alumni?.profileImage}
            alt={`${alumni?.name} profile`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Basic Info */}
        <h3 className="font-heading font-semibold text-heading-sm text-foreground mb-1">
          {alumni?.name}
        </h3>
        <p className="font-body text-body-sm text-muted-foreground mb-3">
          {alumni?.course} • {alumni?.batch}
        </p>

        {/* Current Position */}
        <div className="mb-4">
          <p className="font-body font-medium text-body-sm text-foreground">
            {alumni?.currentPosition}
          </p>
          <p className="font-body text-body-sm text-muted-foreground">
            {alumni?.company}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 mb-4 text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span className="font-body text-caption">{alumni?.location}</span>
        </div>

        {/* Skills/Achievements */}
        {alumni?.skills && alumni?.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {alumni?.skills?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground font-body text-caption rounded-md"
              >
                {skill}
              </span>
            ))}
            {alumni?.skills?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground font-body text-caption rounded-md">
                +{alumni?.skills?.length - 3}
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
          className="w-full"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default AlumniCard;