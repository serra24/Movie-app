
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleRemoveFromFavorites = (movieId) => {
    dispatch(removeFromFavorites(movieId));
  };

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
      {favorites.map((favorite) => (
        <div key={favorite.id} className="col mb-4">
          <div className="card h-100">
            <img src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`} alt={favorite.title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body">
              <h5 className="card-title">{favorite.title}</h5>
              <div className="text-center">
              <button className="btn btn-danger" onClick={() => handleRemoveFromFavorites(favorite.id)}>
                <FontAwesomeIcon icon={faHeart} /> 
              </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
