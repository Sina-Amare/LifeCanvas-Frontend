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

const Signup = ({ setToken, setUser }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    general: '',
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      general: '',
    });

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address.',
      }));
      setIsLoading(false);
      return;
    }

    if (!username) {
      setErrors((prev) => ({ ...prev, username: 'Username is required.' }));
      setIsLoading(false);
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setErrors((prev) => ({
        ...prev,
        username:
          'Username can only contain letters, numbers, and underscores.',
      }));
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 8 characters long.',
      }));
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match.',
      }));
      setIsLoading(false);
      return;
    }

    try {
      console.log(
        'Attempting to sign up with email:',
        email,
        'and username:',
        username
      );
      const response = await api.post('/users/register/', {
        email,
        username,
        password,
      });
      console.log('Signup response:', response.data);
      setToken(response.data.access);
      setUser({
        email: response.data.user.email,
        username: response.data.user.username,
      });
      console.log('User set after signup:', {
        email: response.data.user.email,
        username: response.data.user.username,
      }); // Debug log
      navigate('/journals');
    } catch (error) {
      console.error(
        'Signup error:',
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        console.log('Server errors received:', serverErrors);
        if (serverErrors.error) {
          if (serverErrors.error.toLowerCase().includes('email')) {
            setErrors((prev) => ({ ...prev, email: serverErrors.error }));
          } else if (serverErrors.error.toLowerCase().includes('username')) {
            setErrors((prev) => ({ ...prev, username: serverErrors.error }));
          } else {
            setErrors((prev) => ({ ...prev, general: serverErrors.error }));
          }
        } else if (serverErrors.email) {
          setErrors((prev) => ({ ...prev, email: serverErrors.email[0] }));
        } else if (serverErrors.username) {
          setErrors((prev) => ({
            ...prev,
            username: serverErrors.username[0],
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: 'Signup failed. Please try again.',
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
            <CardTitle className="text-2xl font-poppins">Sign Up</CardTitle>
            <CardDescription className="font-poppins">
              Create a new account to start capturing your memories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} noValidate>
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
                  <Label htmlFor="username" className="font-poppins">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="your_username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm font-poppins">
                      {errors.username}
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
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password" className="font-poppins">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm font-poppins">
                      {errors.confirmPassword}
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
                  {isLoading ? 'Signing up...' : 'Sign Up'}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm font-poppins">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="underline underline-offset-4 hover:text-blue-600"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
