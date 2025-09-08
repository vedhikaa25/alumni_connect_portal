import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFeatures from './components/LoginFeatures';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user?.email) {
          navigate('/alumni-dashboard');
        }
      } catch (error) {
        // Clear invalid user data
        localStorage.removeItem('user');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <LoginHeader />

          {/* Login Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Login Form */}
            <div className="order-2 lg:order-1">
              <LoginForm />
            </div>

            {/* Features Section */}
            <div className="order-1 lg:order-2">
              <LoginFeatures />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border text-center">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <p className="font-body text-body-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Alumni Connect Portal. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <button className="font-body text-body-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Privacy Policy
                </button>
                <button className="font-body text-body-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Terms of Service
                </button>
                <button className="font-body text-body-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;