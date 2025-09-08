import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SortingControls = ({
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  viewMode,
  onViewModeChange,
  resultsCount
}) => {
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'batch', label: 'Graduation Year' },
    { value: 'company', label: 'Company' },
    { value: 'location', label: 'Location' },
    { value: 'course', label: 'Course' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border rounded-lg p-4">
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <Icon name="Users" size={16} className="text-muted-foreground" />
        <span className="font-body text-body-sm text-muted-foreground">
          {resultsCount?.toLocaleString()} alumni found
        </span>
      </div>
      {/* Controls */}
      <div className="flex items-center space-x-3">
        {/* Sort By */}
        <div className="flex items-center space-x-2">
          <span className="font-body text-body-sm text-muted-foreground whitespace-nowrap">
            Sort by:
          </span>
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="min-w-[120px]"
          />
        </div>

        {/* Sort Order */}
        <Button
          variant="outline"
          size="sm"
          onClick={onSortOrderChange}
          iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
          iconPosition="left"
        >
          {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </Button>

        {/* View Mode Toggle */}
        <div className="flex items-center border border-border rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            className="rounded-r-none border-r-0"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            iconName="List"
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SortingControls;