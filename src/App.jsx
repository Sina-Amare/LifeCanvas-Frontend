import React, { useState, useEffect } from 'react';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import api from './services/api';

function App() {
  const [journals, setJournals] = useState([]);
  const [token, setToken] = useState(null); // Store token in state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For login loading
  const [isFetchingJournals, setIsFetchingJournals] = useState(false); // For journal fetching

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Attempting to log in with email:', email);
      const response = await api.post('/token/', { email, password });
      console.log('Login response:', response.data);
      setToken(response.data.access); // Store access token in state
      alert('Login successful!');
    } catch (error) {
      console.error(
        'Login error:',
        error.response ? error.response.data : error.message
      );
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setToken(null);
    setJournals([]);
    alert('Logged out successfully.');
  };

  // Fetch journals when the token changes
  useEffect(() => {
    const fetchJournals = async () => {
      if (!token) {
        console.log('No token available. Skipping journal fetch.');
        return;
      }
      try {
        setIsFetchingJournals(true); // Start loading state
        console.log('Fetching journals with token:', token);
        const response = await api.get('journal/journals/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched journals:', response.data); // Log the full response
        setJournals(response.data);
      } catch (error) {
        console.error(
          'Error fetching journals:',
          error.response ? error.response.data : error.message
        );
        alert('Failed to fetch journals. Please try again.');
      } finally {
        setIsFetchingJournals(false); // End loading state
      }
    };
    fetchJournals();
  }, [token]);

  // Handle new journal creation
  const handleJournalAdded = (newJournal) => {
    setJournals((prevJournals) => [...prevJournals, newJournal]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">LifeCanvas</h1>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <span className="text-sm">Please log in</span>
          )}
        </div>
      </header>
      <main className="p-4">
        {!token ? (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <JournalForm onJournalAdded={handleJournalAdded} token={token} />
            {isFetchingJournals ? (
              <p className="text-center text-gray-500 mt-4">
                Loading journals...
              </p>
            ) : (
              <JournalList journals={journals} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
