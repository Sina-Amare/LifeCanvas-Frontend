import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import {
  PencilSquareIcon,
  HeartIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const Home = ({ token, user, handleLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold font-poppins">LifeCanvas</h1>
          <div className="space-x-4">
            {token ? (
              <>
                <span className="text-sm font-poppins bg-white text-blue-600 px-3 py-1 rounded-full shadow-md">
                  Welcome, {user?.username || 'User'}!
                </span>
                <Button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-md">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-4 text-gray-100 drop-shadow-lg">
            LifeCanvas
          </h1>
          <p className="text-xl md:text-2xl font-light mb-6 text-gray-100 drop-shadow-lg">
            Capture Your Memories, Discover Your Emotions
          </p>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-6 py-3 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg animate-scale-in">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-poppins text-gray-800">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1: Journal Writing */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <PencilSquareIcon className="w-16 h-16 text-blue-500 mr-6" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Journal Writing
                </h3>
                <p className="text-gray-600">
                  Record your memories with details like time and location.
                </p>
              </div>
            </div>
            {/* Feature 2: Romantic Relationships */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <HeartIcon className="w-16 h-16 text-pink-500 mr-6" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Romantic Relationships
                </h3>
                <p className="text-gray-600">
                  Capture your romantic moments and create beautiful stories.
                </p>
              </div>
            </div>
            {/* Feature 3: AI Analysis */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <ChartBarIcon className="w-16 h-16 text-purple-500 mr-6" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  AI Analysis
                </h3>
                <p className="text-gray-600">
                  Analyze your emotions and discover patterns in your life.
                </p>
              </div>
            </div>
            {/* Feature 4: Social Interaction */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <UsersIcon className="w-16 h-16 text-green-500 mr-6" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Social Interaction
                </h3>
                <p className="text-gray-600">
                  Share your memories with friends and connect with others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
