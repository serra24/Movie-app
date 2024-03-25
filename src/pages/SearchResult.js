import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ results }) => {
  return (
    <div className="container mt-4">
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="row">
          {results.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid"
                />
              </Link>
              <p className="mt-2">{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

