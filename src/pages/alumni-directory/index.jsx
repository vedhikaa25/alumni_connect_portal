import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterPanel from './components/FilterPanel';
import SortingControls from './components/SortingControls';
import AlumniGrid from './components/AlumniGrid';
import NetworkStats from './components/NetworkStats';
import Pagination from './components/Pagination';

const AlumniDirectory = () => {
  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "alumni"
  };

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);

  // Sorting and view states
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Mock alumni data
  const mockAlumniData = [
    {
      id: 1,
      name: "Michael Rodriguez",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      course: "Computer Science",
      batch: "2020",
      currentPosition: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      skills: ["React", "Node.js", "Python", "Machine Learning"],
      achievements: ["Tech Lead", "Open Source Contributor"],
      isFeatured: true
    },
    {
      id: 2,
      name: "Emily Chen",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      course: "Business Administration",
      batch: "2019",
      currentPosition: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      industry: "Technology",
      skills: ["Product Strategy", "Data Analysis", "Agile", "Leadership"],
      achievements: ["Product Launch Success", "Team Leadership"],
      isFeatured: true
    },
    {
      id: 3,
      name: "David Thompson",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      course: "Engineering",
      batch: "2021",
      currentPosition: "Data Scientist",
      company: "Tesla",
      location: "Austin, TX",
      industry: "Technology",
      skills: ["Python", "TensorFlow", "Statistics", "Deep Learning"],
      achievements: ["AI Research", "Patent Holder"],
      isFeatured: false
    },
    {
      id: 4,
      name: "Jessica Williams",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      course: "Medicine",
      batch: "2018",
      currentPosition: "Cardiologist",
      company: "Mayo Clinic",
      location: "Rochester, MN",
      industry: "Healthcare",
      skills: ["Cardiology", "Surgery", "Research", "Patient Care"],
      achievements: ["Medical Research", "Published Author"],
      isFeatured: true
    },
    {
      id: 5,
      name: "Robert Kim",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      course: "Law",
      batch: "2017",
      currentPosition: "Corporate Lawyer",
      company: "Goldman Sachs",
      location: "New York, NY",
      industry: "Finance",
      skills: ["Corporate Law", "Mergers & Acquisitions", "Compliance", "Negotiation"],
      achievements: ["Major Deal Closer", "Legal Excellence Award"],
      isFeatured: false
    },
    {
      id: 6,
      name: "Amanda Foster",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      course: "Arts",
      batch: "2022",
      currentPosition: "Creative Director",
      company: "Netflix",
      location: "Los Angeles, CA",
      industry: "Media",
      skills: ["Creative Direction", "Brand Strategy", "Design", "Marketing"],
      achievements: ["Award-Winning Campaigns", "Brand Innovation"],
      isFeatured: false
    },
    {
      id: 7,
      name: "James Wilson",
      profileImage: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      course: "Economics",
      batch: "2019",
      currentPosition: "Investment Analyst",
      company: "McKinsey & Company",
      location: "Chicago, IL",
      industry: "Consulting",
      skills: ["Financial Analysis", "Strategy", "Consulting", "Market Research"],
      achievements: ["Top Performer", "Client Success"],
      isFeatured: false
    },
    {
      id: 8,
      name: "Lisa Martinez",
      profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      course: "Psychology",
      batch: "2020",
      currentPosition: "UX Research Manager",
      company: "Apple",
      location: "Cupertino, CA",
      industry: "Technology",
      skills: ["UX Research", "Psychology", "Data Analysis", "User Testing"],
      achievements: ["Product Innovation", "User Experience Excellence"],
      isFeatured: false
    },
    {
      id: 9,
      name: "Christopher Davis",
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      course: "Computer Science",
      batch: "2021",
      currentPosition: "DevOps Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      industry: "Technology",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      achievements: ["Infrastructure Optimization", "Cost Reduction"],
      isFeatured: false
    },
    {
      id: 10,
      name: "Rachel Green",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      course: "Business Administration",
      batch: "2018",
      currentPosition: "Marketing Director",
      company: "Meta",
      location: "Menlo Park, CA",
      industry: "Technology",
      skills: ["Digital Marketing", "Brand Management", "Analytics", "Strategy"],
      achievements: ["Campaign Success", "Brand Growth"],
      isFeatured: false
    },
    {
      id: 11,
      name: "Kevin Brown",
      profileImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      course: "Engineering",
      batch: "2019",
      currentPosition: "Solutions Architect",
      company: "Deloitte",
      location: "Boston, MA",
      industry: "Consulting",
      skills: ["System Architecture", "Cloud Computing", "Enterprise Solutions", "Leadership"],
      achievements: ["Technical Excellence", "Client Satisfaction"],
      isFeatured: false
    },
    {
      id: 12,
      name: "Sophia Lee",
      profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      course: "Medicine",
      batch: "2017",
      currentPosition: "Pediatrician",
      company: "Children\'s Hospital",
      location: "Denver, CO",
      industry: "Healthcare",
      skills: ["Pediatrics", "Patient Care", "Medical Research", "Family Medicine"],
      achievements: ["Patient Care Excellence", "Medical Innovation"],
      isFeatured: false
    }
  ];

  // Filter and sort alumni data
  const filteredAndSortedAlumni = useMemo(() => {
    let filtered = mockAlumniData?.filter((alumni) => {
      const matchesSearch = alumni?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           alumni?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           alumni?.currentPosition?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesBatch = !selectedBatch || alumni?.batch === selectedBatch;
      const matchesCourse = !selectedCourse || alumni?.course === selectedCourse;
      const matchesCompany = !selectedCompany || alumni?.company === selectedCompany;
      const matchesLocation = !selectedLocation || alumni?.location === selectedLocation;
      const matchesIndustry = !selectedIndustry || alumni?.industry === selectedIndustry;

      return matchesSearch && matchesBatch && matchesCourse && matchesCompany && matchesLocation && matchesIndustry;
    });

    // Sort the filtered results
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [mockAlumniData, searchTerm, selectedBatch, selectedCourse, selectedCompany, selectedLocation, selectedIndustry, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedAlumni?.length / itemsPerPage);
  const paginatedAlumni = filteredAndSortedAlumni?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Featured alumni
  const featuredAlumni = mockAlumniData?.filter(alumni => alumni?.isFeatured);

  // Active filters count
  const activeFiltersCount = [
    searchTerm,
    selectedBatch,
    selectedCourse,
    selectedCompany,
    selectedLocation,
    selectedIndustry
  ]?.filter(Boolean)?.length;

  // Handlers
  const handleViewProfile = (alumni) => {
    console.log('Viewing profile for:', alumni?.name);
    // Navigate to profile page or show modal
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedBatch('');
    setSelectedCourse('');
    setSelectedCompany('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setCurrentPage(1);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Handle logout logic
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBatch, selectedCourse, selectedCompany, selectedLocation, selectedIndustry]);

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-heading-xl text-foreground mb-2">
              Alumni Directory
            </h1>
            <p className="font-body text-body-lg text-muted-foreground max-w-2xl">
              Connect with fellow graduates and expand your professional network. Search and filter through our alumni community to find mentors, collaborators, and friends.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <FilterPanel
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedBatch={selectedBatch}
                onBatchChange={setSelectedBatch}
                selectedCourse={selectedCourse}
                onCourseChange={setSelectedCourse}
                selectedCompany={selectedCompany}
                onCompanyChange={setSelectedCompany}
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                selectedIndustry={selectedIndustry}
                onIndustryChange={setSelectedIndustry}
                onClearFilters={handleClearFilters}
                activeFiltersCount={activeFiltersCount}
                isCollapsed={isFilterCollapsed}
                onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
              />

              {/* Sorting Controls */}
              <SortingControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                sortOrder={sortOrder}
                onSortOrderChange={handleSortOrderChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultsCount={filteredAndSortedAlumni?.length}
              />

              {/* Alumni Grid */}
              <AlumniGrid
                alumni={paginatedAlumni}
                viewMode={viewMode}
                onViewProfile={handleViewProfile}
                loading={loading}
              />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredAndSortedAlumni?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <NetworkStats
                  totalAlumni={mockAlumniData?.length}
                  filteredCount={filteredAndSortedAlumni?.length}
                  featuredAlumni={featuredAlumni}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlumniDirectory;