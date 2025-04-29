import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import api from './services/api';

function App() {
  const [journals, setJournals] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Store user data (email, username)
  const [isFetchingJournals, setIsFetchingJournals] = useState(false);

  // Fetch journals when the token changes
  useEffect(() => {
    const fetchJournals = async () => {
      if (!token) {
        console.log('No token available. Skipping journal fetch.');
        return;
      }
      try {
        setIsFetchingJournals(true);
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
        alert('Failed to fetch journals. Please try again.');
      } finally {
        setIsFetchingJournals(false);
      }
    };
    fetchJournals();
  }, [token]);

  // Handle new journal creation
  const handleJournalAdded = (newJournal) => {
    setJournals((prevJournals) => [...prevJournals, newJournal]);
  };

  // Handle logout
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setJournals([]);
    alert('Logged out successfully.');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
              <div className="min-h-screen bg-gray-100">
                <header className="bg-blue-600 text-white p-4">
                  <div className="flex justify-between items-center max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold">LifeCanvas</h1>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm">
                        Welcome, {user?.username || 'User'}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
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
                    {isFetchingJournals ? (
                      <p className="text-center text-gray-500 mt-4">
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
