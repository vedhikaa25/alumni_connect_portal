import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import EventHeader from './components/EventHeader';
import EventDescription from './components/EventDescription';
import RSVPSection from './components/RSVPSection';
import AttendeeList from './components/AttendeeList';
import EventAgenda from './components/EventAgenda';
import RelatedEvents from './components/RelatedEvents';
import SocialShare from './components/SocialShare';

const EventDetails = () => {
  const [userRSVP, setUserRSVP] = useState('attending');
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    batch: "2018",
    course: "Computer Science"
  });

  // Mock event data
  const eventData = {
    id: 1,
    title: "Alumni Tech Summit 2025: Innovation & Leadership",
    category: "Professional Development",
    bannerImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    date: "2025-03-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "Grand Ballroom, Alumni Center",
    address: "123 University Ave, Campus City, CA 90210",
    isVirtual: false,
    organizer: "Dr. Michael Chen",
    organizerTitle: "Director of Alumni Relations",
    maxCapacity: 200,
    attendeeCount: 156,
    description: `Join us for the most anticipated alumni gathering of the year! The Alumni Tech Summit brings together industry leaders, innovative entrepreneurs, and rising stars from our alumni network.\n\nThis full-day event features keynote presentations from successful alumni who are shaping the future of technology, interactive workshops on emerging trends, and extensive networking opportunities. Whether you're looking to advance your career, explore new business opportunities, or simply reconnect with old friends, this summit offers something valuable for everyone.\n\nDon't miss this chance to be part of our vibrant alumni community and contribute to the ongoing success of our network. Light breakfast, lunch, and evening reception are included with registration.`,
    highlights: [
      "Keynote speeches from 3 industry-leading alumni CEOs",
      "Interactive workshops on AI, blockchain, and sustainable tech",
      "Structured networking sessions with industry matching",
      "Career mentorship speed-dating sessions",
      "Startup pitch competition with $10,000 prize pool",
      "Alumni achievement awards ceremony"
    ],
    requirements: [
      "Valid alumni ID or graduation verification",
      "Business attire recommended",
      "Laptop/tablet for workshop participation",
      "Networking materials (business cards, portfolio)"
    ],
    rsvpCounts: {
      attending: 156,
      maybe: 23,
      not_attending: 12
    }
  };

  // Mock agenda data
  const agendaData = [
    {
      startTime: "08:30",
      endTime: "09:00",
      title: "Registration & Welcome Coffee",
      type: "networking",
      duration: "30 min",
      location: "Main Lobby"
    },
    {
      startTime: "09:00",
      endTime: "09:45",
      title: "Opening Keynote: The Future of Tech Leadership",
      type: "presentation",
      duration: "45 min",
      speaker: "Jennifer Martinez",
      speakerTitle: "CEO, TechVision Inc. (Class of 2010)",
      location: "Grand Ballroom",
      tags: ["Leadership", "Innovation"]
    },
    {
      startTime: "10:00",
      endTime: "11:30",
      title: "Workshop Track A: AI in Business Applications",
      type: "workshop",
      duration: "90 min",
      speaker: "Dr. Robert Kim",
      speakerTitle: "CTO, DataFlow Solutions (Class of 2008)",
      location: "Conference Room A",
      tags: ["AI", "Business Strategy"]
    },
    {
      startTime: "11:30",
      endTime: "11:45",
      title: "Coffee Break",
      type: "break",
      duration: "15 min",
      location: "Main Lobby"
    },
    {
      startTime: "12:00",
      endTime: "13:00",
      title: "Panel: Entrepreneurship in the Digital Age",
      type: "panel",
      duration: "60 min",
      location: "Grand Ballroom",
      tags: ["Entrepreneurship", "Startups"]
    },
    {
      startTime: "13:00",
      endTime: "14:00",
      title: "Networking Lunch",
      type: "networking",
      duration: "60 min",
      location: "Dining Hall"
    },
    {
      startTime: "14:15",
      endTime: "15:45",
      title: "Workshop Track B: Sustainable Technology Solutions",
      type: "workshop",
      duration: "90 min",
      speaker: "Lisa Thompson",
      speakerTitle: "Founder, GreenTech Innovations (Class of 2012)",
      location: "Conference Room B",
      tags: ["Sustainability", "Innovation"]
    },
    {
      startTime: "16:00",
      endTime: "17:00",
      title: "Closing Keynote & Awards Ceremony",
      type: "presentation",
      duration: "60 min",
      location: "Grand Ballroom",
      tags: ["Awards", "Recognition"]
    }
  ];

  // Mock attendees data
  const attendeesData = [
    {
      id: 1,
      name: "Michael Rodriguez",
      batch: "2015",
      company: "Google",
      title: "Senior Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 2,
      name: "Emily Chen",
      batch: "2017",
      company: "Microsoft",
      title: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 3,
      name: "David Park",
      batch: "2014",
      company: "Tesla",
      title: "Lead Engineer",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      rsvpStatus: "maybe"
    },
    {
      id: 4,
      name: "Sarah Williams",
      batch: "2016",
      company: "Apple",
      title: "UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 5,
      name: "James Thompson",
      batch: "2013",
      company: "Amazon",
      title: "Solutions Architect",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      batch: "2018",
      company: "Facebook",
      title: "Data Scientist",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 7,
      name: "Kevin Lee",
      batch: "2019",
      company: "Netflix",
      title: "Software Developer",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      rsvpStatus: "maybe"
    },
    {
      id: 8,
      name: "Amanda Davis",
      batch: "2020",
      company: "Spotify",
      title: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 9,
      name: "Ryan Martinez",
      batch: "2012",
      company: "Uber",
      title: "Engineering Manager",
      avatar: "https://randomuser.me/api/portraits/men/18.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 10,
      name: "Jessica Brown",
      batch: "2021",
      company: "Airbnb",
      title: "Product Designer",
      avatar: "https://randomuser.me/api/portraits/women/52.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 11,
      name: "Daniel Wilson",
      batch: "2011",
      company: "LinkedIn",
      title: "Senior Developer",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 12,
      name: "Rachel Garcia",
      batch: "2022",
      company: "Salesforce",
      title: "Business Analyst",
      avatar: "https://randomuser.me/api/portraits/women/61.jpg",
      rsvpStatus: "maybe"
    },
    {
      id: 13,
      name: "Christopher Taylor",
      batch: "2010",
      company: "Oracle",
      title: "Database Administrator",
      avatar: "https://randomuser.me/api/portraits/men/47.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 14,
      name: "Megan Johnson",
      batch: "2023",
      company: "Adobe",
      title: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/38.jpg",
      rsvpStatus: "attending"
    },
    {
      id: 15,
      name: "Andrew Miller",
      batch: "2009",
      company: "IBM",
      title: "Cloud Architect",
      avatar: "https://randomuser.me/api/portraits/men/63.jpg",
      rsvpStatus: "attending"
    }
  ];

  // Mock related events data
  const relatedEventsData = [
    {
      id: 2,
      title: "Alumni Career Fair 2025",
      date: "2025-04-20",
      time: "10:00 AM",
      location: "Campus Center",
      category: "Career",
      attendeeCount: 89,
      isVirtual: false,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Virtual Networking Mixer",
      date: "2025-05-10",
      time: "7:00 PM",
      location: "Online",
      category: "Networking",
      attendeeCount: 124,
      isVirtual: true,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Alumni Golf Tournament",
      date: "2025-06-15",
      time: "8:00 AM",
      location: "Riverside Golf Club",
      category: "Social",
      attendeeCount: 45,
      isVirtual: false,
      image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=200&h=200&fit=crop"
    }
  ];

  const handleRSVPChange = (newStatus) => {
    setUserRSVP(newStatus);
    // In a real app, this would make an API call to update the RSVP status
    console.log('RSVP updated to:', newStatus);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('User logged out');
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <EventHeader event={eventData} />
              <EventDescription event={eventData} />
              <EventAgenda agenda={agendaData} />
              <AttendeeList attendees={attendeesData} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <RSVPSection 
                event={eventData} 
                userRSVP={userRSVP} 
                onRSVPChange={handleRSVPChange} 
              />
              <SocialShare event={eventData} />
              <RelatedEvents events={relatedEventsData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;