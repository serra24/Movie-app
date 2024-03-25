
import React from 'react';
import Favorites from '../Components/Favorites'; 
function FavoritesPage  ()  {
  return (
    <div style={{ minHeight: "400px" }}>
      <h1 className="m-4 text-center" >Favorites Movies</h1>
      <Favorites />
      
    </div>
  );
};

export default FavoritesPage;
