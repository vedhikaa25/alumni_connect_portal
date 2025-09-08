import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/alumni-dashboard': 'Dashboard',
    '/alumni-directory': 'Alumni Directory',
    '/profile-management': 'Profile Management',
    '/event-details': 'Event Details',
    '/login': 'Login',
    '/registration': 'Registration'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/alumni-dashboard' }];

    if (location?.pathname !== '/alumni-dashboard') {
      const currentPath = location?.pathname;
      const currentLabel = pathMap?.[currentPath] || 'Page';
      breadcrumbs?.push({ label: currentLabel, path: currentPath });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-body-sm font-body mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <div key={crumb?.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(crumb?.path)}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              {crumb?.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;