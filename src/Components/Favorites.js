import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Pagination from './Pagination'; // Import Pagination component

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of favorites to display per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  // Calculate the index range for favorites to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFavorites = favorites.slice(indexOfFirstItem, indexOfLastItem);

  const handleRemoveFromFavorites = (movieId) => {
    dispatch(removeFromFavorites(movieId));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div >
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={{ minHeight: "350px" }}>
        {currentFavorites.map((favorite) => (
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default Favorites;

