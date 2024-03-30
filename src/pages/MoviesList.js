import React, { useState, useEffect, useCallback } from 'react';
import axios from '../services/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/actions';
import { useLanguage } from '../context/LanguageContext';
import Pagination from '../Components/Pagination'; 
import MovieCard from '../Components/MovieCard'; 

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.get('/movie/popular', {
        params: { page: currentPage, language },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, [currentPage, language]);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, fetchMovies]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('/search/movie', {
        params: { api_key: 'dc186421333d8ad36f1a654387701e25', query: searchQuery },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

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
    <div className="container mt-4" style={{ minHeight: "400px" }}>
      <h1 className="mb-4">Popular Movies</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {movies.map((movie) => (
	  <MovieCard
	  key={movie.id}
	  movie={movie}
	  isFavorite={isFavorite}
	  handleToggleFavorite={handleToggleFavorite}
	/>

        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(movies.length / 8)} 
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default MoviesList;

