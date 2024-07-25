import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        setError('Failed to submit data');
        throw new Error('Failed to submit data');
      }

      setSubmitted(true);
      setName('');
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Failed to submit data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    setError(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello World</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {submitted && <p>Data submitted successfully!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
