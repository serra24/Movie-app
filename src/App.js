// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './Components/Navbar';
import { LanguageProvider } from './context/LanguageContext'; 

import MoviesList from './Components/MoviesList';
import MovieDetails from './Components/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';


function App() {
  return (
    <Provider store={store}>
      <LanguageProvider> {/* Wrap your entire application with LanguageProvider */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </Provider>
  );
}

export default App;
