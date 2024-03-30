import React, { useState, useEffect } from 'react';
import MovieCard from '../Components/MovieCard'; 
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/actions';
import Pagination from '../Components/Pagination'; 
import { useLanguage } from '../context/LanguageContext';

function SearchResult({ searchQuery }) {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const { language } = useLanguage(); // Accessing language from useLanguage hook
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const apiKey = 'dc186421333d8ad36f1a654387701e25';
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=${language}`;
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
  },  [searchQuery, language]); // Include language in dependency array

  const isFavorite = (movieId) => {
    return favorites.some((favorite) => favorite.id === movieId);
  };

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <div className="container mt-4" style={{ minHeight: "350px" }}>
      <h1 className="mb-4">Search Results for {searchQuery}</h1>
      {loading && <p style={{ minHeight: "350px" }}>Loading...</p>}
      {error && <p style={{ minHeight: "350px" }}>Error: {error}</p>}
      <div className="row" style={{ minHeight: "350px" }}>
        {searchResults.map((result) => (
          <MovieCard
            key={result.id}
            movie={result}
            isFavorite={isFavorite}
            handleToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(searchResults.length / 4)} 
        handlePrevPage={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
        handleNextPage={() => setCurrentPage((prevPage) => prevPage + 1)}
      />
    </div>
  );
}

export default SearchResult;

