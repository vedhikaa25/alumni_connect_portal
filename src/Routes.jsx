import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EventDetails from './pages/event-details';
import Registration from './pages/registration';
import AlumniDirectory from './pages/alumni-directory';
import Login from './pages/login';
import AlumniDashboard from './pages/alumni-dashboard';
import ProfileManagement from './pages/profile-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AlumniDashboard />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/alumni-directory" element={<AlumniDirectory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
