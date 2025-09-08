import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import WelcomePanel from './components/WelcomePanel';
import AnnouncementCard from './components/AnnouncementCard';
import EventCard from './components/EventCard';
import NetworkingHighlight from './components/NetworkingHighlight';
import QuickAccessCard from './components/QuickAccessCard';
import ActivityFeed from './components/ActivityFeed';

const AlumniDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    batch: "2018",
    course: "Computer Science",
    company: "Tech Solutions Inc.",
    position: "Senior Software Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock dashboard stats
  const dashboardStats = {
    connections: 247,
    upcomingEvents: 3
  };

  // Mock announcements data
  const mockAnnouncements = [
    {
      id: 1,
      title: "Annual Alumni Reunion 2025 - Save the Date!",
      content: `Join us for our biggest alumni gathering of the year on March 15, 2025. Reconnect with classmates, enjoy great food, and celebrate our shared memories. Early bird registration starts February 1st.`,
      date: "2025-01-05T10:00:00Z",
      priority: "high",
      author: "Alumni Relations Office"
    },
    {
      id: 2,
      title: "New Career Services Portal Launch",
      content: "We're excited to announce the launch of our enhanced career services portal with job matching, resume reviews, and interview preparation resources.",
      date: "2025-01-03T14:30:00Z",
      priority: "normal",
      author: "Career Services"
    },
    {
      id: 3,
      title: "Alumni Mentorship Program Applications Open",
      content: "Applications are now open for both mentors and mentees in our 2025 Alumni Mentorship Program. Connect across generations and industries.",
      date: "2025-01-02T09:15:00Z",
      priority: "normal",
      author: "Alumni Relations Office"
    }
  ];

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Tech Industry Networking Mixer",
      date: "2025-01-15T18:00:00Z",
      location: "Downtown Convention Center, Hall A",
      type: "networking",
      attendees: 45,
      rsvpStatus: "going",
      description: "Connect with fellow alumni working in technology sector"
    },
    {
      id: 2,
      title: "Professional Development Workshop: Leadership Skills",
      date: "2025-01-22T14:00:00Z",
      location: "University Campus, Business Building Room 201",
      type: "workshop",
      attendees: 28,
      rsvpStatus: null,
      description: "Enhance your leadership capabilities with expert guidance"
    },
    {
      id: 3,
      title: "Alumni Coffee Social",
      date: "2025-01-28T10:00:00Z",
      location: "Campus Coffee House",
      type: "social",
      attendees: 15,
      rsvpStatus: "maybe",
      description: "Casual meetup for local alumni"
    }
  ];

  // Mock networking highlights
  const mockHighlights = [
    {
      id: 1,
      name: "Michael Chen",
      batch: "Class of 2020",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      type: "promotion",
      description: "Just got promoted to Senior Data Scientist at Google! Excited for this new chapter in my career journey.",
      timestamp: "2025-01-08T15:30:00Z"
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      batch: "Class of 2019",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      type: "achievement",
      description: "Thrilled to share that our startup just secured Series A funding! Looking forward to scaling our impact.",
      timestamp: "2025-01-08T11:45:00Z"
    },
    {
      id: 3,
      name: "David Park",
      batch: "Class of 2021",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      type: "new_member",
      description: "Recently joined the alumni network! Excited to connect with fellow graduates and explore opportunities.",
      timestamp: "2025-01-08T09:20:00Z"
    }
  ];

  // Mock activity feed
  const mockActivities = [
    {
      id: 1,
      user: {
        name: "Jennifer Liu",
        batch: "2017",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      type: "event_rsvp",
      description: "RSVP\'d to Tech Industry Networking Mixer",
      timestamp: "2025-01-08T16:45:00Z"
    },
    {
      id: 2,
      user: {
        name: "Robert Kim",
        batch: "2016",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      type: "profile_update",
      description: "Updated profile with new position at Microsoft",
      timestamp: "2025-01-08T14:20:00Z",
      metadata: "Senior Product Manager - Azure Division"
    },
    {
      id: 3,
      user: {
        name: "Amanda Foster",
        batch: "2019",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
      },
      type: "connection",
      description: "Connected with 3 new alumni from the marketing industry",
      timestamp: "2025-01-08T12:10:00Z"
    },
    {
      id: 4,
      user: {
        name: "Thomas Wilson",
        batch: "2015",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
      },
      type: "post",
      description: "Shared insights about remote work best practices",
      timestamp: "2025-01-08T10:30:00Z"
    }
  ];

  // Quick access cards data
  const quickAccessCards = [
    {
      title: "Edit Profile",
      description: "Update your professional information and achievements",
      icon: "User",
      color: "bg-blue-500",
      onClick: () => navigate('/profile-management')
    },
    {
      title: "Mentorship Opportunities",
      description: "Explore mentoring programs and connect with mentors",
      icon: "Users",
      color: "bg-green-500",
      onClick: () => navigate('/alumni-directory'),
      badge: "New"
    },
    {
      title: "Internship Postings",
      description: "Discover internship opportunities for current students",
      icon: "Briefcase",
      color: "bg-purple-500",
      onClick: () => navigate('/event-details'),
      badge: "5 New"
    },
    {
      title: "Alumni Directory",
      description: "Search and connect with fellow alumni worldwide",
      icon: "Search",
      color: "bg-orange-500",
      onClick: () => navigate('/alumni-directory')
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handlePledgeSupport = () => {
    // Mock pledge support functionality
    alert('Thank you for your interest in supporting our institution! A representative will contact you soon.');
  };

  const handleRSVP = (eventId) => {
    // Mock RSVP functionality
    navigate('/event-details');
  };

  const handleViewAllAnnouncements = () => {
    // Mock navigation to announcements page
    alert('Navigating to all announcements...');
  };

  const handleBrowseEvents = () => {
    navigate('/event-details');
  };

  const handleExploreDirectory = () => {
    navigate('/alumni-directory');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Welcome Panel */}
          <WelcomePanel
            user={user}
            stats={dashboardStats}
            onPledgeSupport={handlePledgeSupport}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Announcements */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent Announcements</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleViewAllAnnouncements}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {mockAnnouncements?.slice(0, 3)?.map((announcement) => (
                  <AnnouncementCard key={announcement?.id} announcement={announcement} />
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBrowseEvents}
                  iconName="Calendar"
                  iconPosition="right"
                >
                  Browse Events
                </Button>
              </div>
              <div className="space-y-4">
                {mockEvents?.map((event) => (
                  <EventCard key={event?.id} event={event} onRSVP={handleRSVP} />
                ))}
              </div>
            </div>

            {/* Networking Highlights */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Networking Highlights</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExploreDirectory}
                  iconName="Users"
                  iconPosition="right"
                >
                  Explore Directory
                </Button>
              </div>
              <div className="space-y-4">
                {mockHighlights?.map((highlight) => (
                  <NetworkingHighlight key={highlight?.id} highlight={highlight} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickAccessCards?.map((card, index) => (
                <QuickAccessCard
                  key={index}
                  title={card?.title}
                  description={card?.description}
                  icon={card?.icon}
                  color={card?.color}
                  onClick={card?.onClick}
                  badge={card?.badge}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
            </div>
            <ActivityFeed activities={mockActivities} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlumniDashboard;