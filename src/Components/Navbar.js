import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap'; 

function CustomNavbar({ onSearch }) {
  const favoritesCount = useSelector((state) => state.favorites.length);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { changeLanguage } = useLanguage();

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setSelectedLanguage(language);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery); // Log the search query
    onSearch(searchQuery); // Trigger search in parent component
    navigate('/search', { state: { query: searchQuery } }); // Navigate to search results page
  };

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="btn btn-light">
                {selectedLanguage === 'en' ? 'En' : 'Ar'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleLanguageChange('en')}>En</Dropdown.Item>
                <Dropdown.Item onClick={() => handleLanguageChange('ar')}>Ar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link as={Link} to="/favorites">
              Favorites ({favoritesCount})
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;

