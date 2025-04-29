import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">LifeCanvas</h1>
          <div className="space-x-4">
            <Link to="/login">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-blue-700"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white text-blue-600 hover:bg-gray-200">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-[80vh] flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">LifeCanvas</h1>
          <p className="text-xl mb-6">
            Capture Your Memories, Discover Your Emotions
          </p>
          <Link to="/signup">
            <Button className="bg-white text-blue-600 hover:bg-gray-200">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Sections */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1: Journal Writing */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-1/2 h-48 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg mr-6"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Journal Writing</h3>
                <p className="text-gray-600">
                  Record your memories with details like time and location.
                </p>
              </div>
            </div>
            {/* Feature 2: Romantic Relationships */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-1/2 h-48 bg-gradient-to-r from-pink-300 to-pink-500 rounded-lg mr-6"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Romantic Relationships
                </h3>
                <p className="text-gray-600">
                  Capture your romantic moments and create beautiful stories.
                </p>
              </div>
            </div>
            {/* Feature 3: AI Analysis */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-1/2 h-48 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg mr-6"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Analyze your emotions and discover patterns in your life.
                </p>
              </div>
            </div>
            {/* Feature 4: Social Interaction */}
            <div className="flex items-center bg-white p-6 rounded-lg shadow-md">
              <div className="w-1/2 h-48 bg-gradient-to-r from-green-300 to-green-500 rounded-lg mr-6"></div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
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
