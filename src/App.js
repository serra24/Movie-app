import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './Components/Navbar';
import { LanguageProvider } from './context/LanguageContext'; 
import SearchResult from './pages/SearchResult'; 
import MoviesList from './pages/MoviesList';
import MovieDetails from './pages/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';
import axios from 'axios'; 


function App() {
 const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    setSearchQuery(query);
  };
  return (
    <Provider store={store}>
      <LanguageProvider> 
        <Router>
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/search" element={<SearchResult searchQuery={searchQuery} />} />



          </Routes>
        </Router>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
