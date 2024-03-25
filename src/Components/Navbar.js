import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import Dropdown from 'react-bootstrap/Dropdown';
import { Navbar, Nav, Container } from 'react-bootstrap'; // Import Bootstrap components

function CustomNavbar() {
  const favoritesCount = useSelector((state) => state.favorites.length);
  const { changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setSelectedLanguage(language);
  };

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
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

