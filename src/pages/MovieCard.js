import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({ movie, isFavorite, handleToggleFavorite }) => {
  return (
    <div key={movie.id} className="col-md-3 mb-4">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="img-fluid"
        />
      </Link>
      <p className="mt-2">{movie.title}</p>
      <div className="text-center">
        <button
          className={`btn ${isFavorite(movie.id) ? 'btn-danger' : 'btn-outline-secondary'}`}
          onClick={() => handleToggleFavorite(movie)}
        >
          <FontAwesomeIcon icon={faHeart} /> {isFavorite(movie.id)}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

