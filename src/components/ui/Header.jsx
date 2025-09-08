import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/alumni-dashboard', icon: 'LayoutDashboard' },
    { label: 'Directory', path: '/alumni-directory', icon: 'Users' },
    { label: 'Profile', path: '/profile-management', icon: 'User' },
    { label: 'Events', path: '/event-details', icon: 'Calendar' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    if (onLogout) onLogout();
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-[1000]">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/alumni-dashboard')}
              className="flex items-center space-x-3 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-heading font-semibold text-heading-sm text-foreground">
                  Alumni Connect
                </h1>
                <p className="font-caption text-caption text-muted-foreground -mt-1">
                  Portal
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium text-body-sm transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="hidden sm:block font-body text-body-sm">
                  {user?.name || 'User'}
                </span>
                <Icon name="ChevronDown" size={16} />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-[1100]">
                  <div className="p-2">
                    <button
                      onClick={() => {
                        handleNavigation('/profile-management');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left rounded-md text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name="Settings" size={16} />
                      <span className="font-body text-body-sm">Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left rounded-md text-error hover:bg-muted transition-smooth"
                    >
                      <Icon name="LogOut" size={16} />
                      <span className="font-body text-body-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[1200] lg:hidden">
          <div className="fixed inset-y-0 left-0 w-80 bg-card shadow-elevated animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} color="white" />
                </div>
                <div>
                  <h1 className="font-heading font-semibold text-heading-sm text-foreground">
                    Alumni Connect
                  </h1>
                  <p className="font-caption text-caption text-muted-foreground -mt-1">
                    Portal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-body font-medium text-body-md transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="white" />
                </div>
                <div className="flex-1">
                  <p className="font-body font-medium text-body-sm text-foreground">
                    {user?.name || 'User'}
                  </p>
                  <p className="font-body text-caption text-muted-foreground">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="left"
                className="w-full mt-3"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;