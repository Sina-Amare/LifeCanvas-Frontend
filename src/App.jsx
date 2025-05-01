import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import api from './services/api';
import 'animate.css';

function App() {
  const [journals, setJournals] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Store user data (email, username)
  const [isFetchingJournals, setIsFetchingJournals] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Fetch journals when the token changes
  useEffect(() => {
    const fetchJournals = async () => {
      if (!token) {
        console.log('No token available. Skipping journal fetch.');
        return;
      }
      try {
        setIsFetchingJournals(true);
        setFetchError(null);
        console.log('Fetching journals with token:', token);
        const response = await api.get('journal/journals/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched journals:', response.data);
        setJournals(response.data);
      } catch (error) {
        console.error(
          'Error fetching journals:',
          error.response ? error.response.data : error.message
        );
        if (error.response) {
          if (error.response.status === 401) {
            setFetchError('Unauthorized access. Please log in again.');
          } else {
            setFetchError('Failed to fetch journals. Please try again.');
          }
        } else {
          setFetchError(
            'Unable to connect to the server. Please try again later.'
          );
        }
      } finally {
        setIsFetchingJournals(false);
      }
    };
    fetchJournals();
  }, [token]);

  // Handle new journal creation
  const handleJournalAdded = (newJournal) => {
    setJournals((prevJournals) => [...prevJournals, newJournal]);
    setFetchError(null); // Clear any previous errors
  };

  // Handle logout
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setJournals([]);
    setFetchError(null);
    alert('Logged out successfully.');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home token={token} user={user} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/journals" />
            ) : (
              <Login setToken={setToken} setUser={setUser} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            token ? (
              <Navigate to="/journals" />
            ) : (
              <Signup setToken={setToken} setUser={setUser} />
            )
          }
        />
        <Route
          path="/journals"
          element={
            token ? (
              <div className="min-h-screen bg-gray-50">
                <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
                  <div className="flex justify-between items-center max-w-4xl mx-auto">
                    <Link to="/">
                      <h1 className="text-3xl font-bold font-poppins hover:text-gray-200 transition-colors">
                        LifeCanvas
                      </h1>
                    </Link>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-poppins bg-white text-blue-600 px-3 py-1 rounded-full shadow-md">
                        Welcome, {user?.username || 'User'}!
                      </span>
                      <button
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md font-poppins"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </header>
                <main className="p-4">
                  <div className="max-w-4xl mx-auto">
                    <JournalForm
                      onJournalAdded={handleJournalAdded}
                      token={token}
                    />
                    {fetchError && (
                      <p className="text-red-500 text-sm text-center mt-4 font-poppins bg-red-50 p-3 rounded-lg">
                        {fetchError}
                      </p>
                    )}
                    {isFetchingJournals ? (
                      <p className="text-center text-gray-500 mt-4 font-poppins animate-pulse">
                        Loading journals...
                      </p>
                    ) : (
                      <JournalList journals={journals} />
                    )}
                  </div>
                </main>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
