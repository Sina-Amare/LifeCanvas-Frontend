import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import api from '../services/api';

const Login = ({ setToken, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ email: '', password: '', general: '' });

    // Client-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address.',
      }));
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting to log in with email:', email);
      const response = await api.post('/token/', { email, password });
      console.log('Login response:', response.data);
      setToken(response.data.access);
      try {
        const userResponse = await api.get('/users/me/', {
          headers: { Authorization: `Bearer ${response.data.access}` },
        });
        setUser({
          email: userResponse.data.email,
          username: userResponse.data.username,
        });
      } catch (userError) {
        console.error('Error fetching user data:', userError);
        setErrors((prev) => ({
          ...prev,
          general: 'Logged in, but failed to fetch user data.',
        }));
      }
      navigate('/journals');
    } catch (error) {
      console.error(
        'Login error:',
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        console.log(
          'Server errors received:',
          JSON.stringify(serverErrors, null, 2)
        );
        if (serverErrors.detail) {
          setErrors((prev) => ({ ...prev, general: serverErrors.detail }));
        } else if (serverErrors.non_field_errors) {
          setErrors((prev) => ({
            ...prev,
            general: serverErrors.non_field_errors[0],
          }));
        } else if (serverErrors.email) {
          setErrors((prev) => ({ ...prev, email: serverErrors.email[0] }));
        } else if (serverErrors.password) {
          setErrors((prev) => ({
            ...prev,
            password: serverErrors.password[0],
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: 'Login failed. Please check your credentials.',
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          general: 'Unable to connect to the server. Please try again later.',
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gray-50 relative">
      {/* Back to Home Link */}
      <div className="absolute top-4 left-4">
        <Link to="/">
          <h1 className="text-2xl font-bold font-poppins text-blue-600 hover:text-blue-800 transition-colors">
            LifeCanvas
          </h1>
        </Link>
      </div>
      <div className="w-full max-w-sm">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-poppins">Login</CardTitle>
            <CardDescription className="font-poppins">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} noValidate>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="font-poppins">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm font-poppins">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="font-poppins">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm font-poppins">
                      {errors.password}
                    </p>
                  )}
                </div>
                {errors.general && (
                  <p className="text-red-500 text-sm text-center font-poppins">
                    {errors.general}
                  </p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm font-poppins">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="underline underline-offset-4 hover:text-blue-600"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
