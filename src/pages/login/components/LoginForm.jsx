import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@university.edu', password: 'admin123' },
    alumni: { email: 'john.doe@alumni.edu', password: 'alumni123' },
    pending: { email: 'jane.smith@alumni.edu', password: 'pending123' }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear login error when user modifies form
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        // Store user session data
        const userData = {
          email: formData?.email,
          name: formData?.email === mockCredentials?.admin?.email ? 'Admin User' : 
                formData?.email === mockCredentials?.alumni?.email ? 'John Doe' : 'Jane Smith',
          role: formData?.email === mockCredentials?.admin?.email ? 'admin' : 'alumni',
          isApproved: formData?.email !== mockCredentials?.pending?.email,
          rememberMe: formData?.rememberMe
        };

        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to dashboard
        navigate('/alumni-dashboard');
      } else {
        setLoginError('Invalid email or password. Please check your credentials and try again.');
      }
    } catch (error) {
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here. For demo purposes, use the provided mock credentials.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-soft p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="GraduationCap" size={32} color="white" />
          </div>
          <h1 className="font-heading font-semibold text-heading-lg text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="font-body text-body-md text-muted-foreground">
            Sign in to your Alumni Connect account
          </p>
        </div>

        {loginError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-body-sm text-red-800">
                  {loginError}
                </p>
                <div className="mt-2 text-body-xs text-red-700">
                  <p className="font-medium">Demo Credentials:</p>
                  <p>Admin: admin@university.edu / admin123</p>
                  <p>Alumni: john.doe@alumni.edu / alumni123</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={handleForgotPassword}
              className="font-body text-body-sm text-primary hover:text-primary/80 transition-smooth"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="font-body text-body-sm text-muted-foreground">
            New to the network?{' '}
            <button
              onClick={() => navigate('/registration')}
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
              disabled={isLoading}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;