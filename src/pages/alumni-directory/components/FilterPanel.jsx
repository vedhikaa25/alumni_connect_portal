import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({
  searchTerm,
  onSearchChange,
  selectedBatch,
  onBatchChange,
  selectedCourse,
  onCourseChange,
  selectedCompany,
  onCompanyChange,
  selectedLocation,
  onLocationChange,
  selectedIndustry,
  onIndustryChange,
  onClearFilters,
  activeFiltersCount,
  isCollapsed,
  onToggleCollapse
}) => {
  const batchOptions = [
    { value: '', label: 'All Batches' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' }
  ];

  const courseOptions = [
    { value: '', label: 'All Courses' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Business Administration', label: 'Business Administration' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Medicine', label: 'Medicine' },
    { value: 'Law', label: 'Law' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Economics', label: 'Economics' },
    { value: 'Psychology', label: 'Psychology' }
  ];

  const companyOptions = [
    { value: '', label: 'All Companies' },
    { value: 'Google', label: 'Google' },
    { value: 'Microsoft', label: 'Microsoft' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Amazon', label: 'Amazon' },
    { value: 'Meta', label: 'Meta' },
    { value: 'Tesla', label: 'Tesla' },
    { value: 'Netflix', label: 'Netflix' },
    { value: 'Goldman Sachs', label: 'Goldman Sachs' },
    { value: 'McKinsey & Company', label: 'McKinsey & Company' },
    { value: 'Deloitte', label: 'Deloitte' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'New York, NY', label: 'New York, NY' },
    { value: 'San Francisco, CA', label: 'San Francisco, CA' },
    { value: 'Los Angeles, CA', label: 'Los Angeles, CA' },
    { value: 'Chicago, IL', label: 'Chicago, IL' },
    { value: 'Boston, MA', label: 'Boston, MA' },
    { value: 'Seattle, WA', label: 'Seattle, WA' },
    { value: 'Austin, TX', label: 'Austin, TX' },
    { value: 'Miami, FL', label: 'Miami, FL' },
    { value: 'Denver, CO', label: 'Denver, CO' },
    { value: 'Atlanta, GA', label: 'Atlanta, GA' }
  ];

  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Education', label: 'Education' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Media', label: 'Media' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Non-profit', label: 'Non-profit' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span className="font-body font-medium text-body-md text-foreground">
            Filters
          </span>
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full font-body text-caption">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName={isCollapsed ? 'ChevronDown' : 'ChevronUp'}
          iconPosition="right"
        >
          {isCollapsed ? 'Show' : 'Hide'}
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <div className="p-4 space-y-4">
          {/* Search */}
          <Input
            type="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />

          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <Select
              placeholder="Select batch"
              options={batchOptions}
              value={selectedBatch}
              onChange={onBatchChange}
            />

            <Select
              placeholder="Select course"
              options={courseOptions}
              value={selectedCourse}
              onChange={onCourseChange}
              searchable
            />

            <Select
              placeholder="Select company"
              options={companyOptions}
              value={selectedCompany}
              onChange={onCompanyChange}
              searchable
            />

            <Select
              placeholder="Select location"
              options={locationOptions}
              value={selectedLocation}
              onChange={onLocationChange}
              searchable
            />

            <Select
              placeholder="Select industry"
              options={industryOptions}
              value={selectedIndustry}
              onChange={onIndustryChange}
              searchable
            />
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;