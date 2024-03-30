import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; 

function SearchResult({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const apiKey = 'dc186421333d8ad36f1a654387701e25';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setSearchResults(data.results);
        setError(null);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
        setError('An error occurred while fetching search results.');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setError(null);
    }
  }, [searchQuery]);

  return (
    <div className="container mt-4" style={{ minHeight: "400px" }}>
      <h1 className="mb-4">Search Results for {searchQuery}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="row">
        {searchResults.map((result) => (
          <div key={result.id} className="col-md-4 mb-4">
            <MovieCard movie={result} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;

