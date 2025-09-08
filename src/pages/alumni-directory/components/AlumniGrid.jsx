import React from 'react';
import AlumniCard from './AlumniCard';
import AlumniListItem from './AlumniListItem';

const AlumniGrid = ({ alumni, viewMode, onViewProfile, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-muted rounded-full mb-4"></div>
              <div className="h-4 bg-muted rounded w-32 mb-2"></div>
              <div className="h-3 bg-muted rounded w-24 mb-3"></div>
              <div className="h-3 bg-muted rounded w-28 mb-2"></div>
              <div className="h-3 bg-muted rounded w-20 mb-4"></div>
              <div className="h-8 bg-muted rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (alumni?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-heading-sm text-foreground mb-2">
          No Alumni Found
        </h3>
        <p className="font-body text-body-md text-muted-foreground max-w-md mx-auto">
          No alumni match your current search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {alumni?.map((alumniItem) => (
          <AlumniListItem
            key={alumniItem?.id}
            alumni={alumniItem}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {alumni?.map((alumniItem) => (
        <AlumniCard
          key={alumniItem?.id}
          alumni={alumniItem}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  );
};

export default AlumniGrid;