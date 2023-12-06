import React from 'react';
import { Link } from 'react-router-dom';
import arrow from '../images/arrow.png';
import '../styles/_header.sass';


const Header = ({ searchTerm, handleSearch, showSearchBar = true, showBackArrow = true }) => {
  return (
    <div className="header">
      {showBackArrow && (
        <Link to="/">
          <img src={arrow} alt="backArrow" className="backArrow" />
        </Link>
      )}
      {showSearchBar && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      )}
      {/* <div>
        <Link to="/" className="logotypeLink">
          Rankify
        </Link>
      </div> */}
    </div>
  );
};

export default Header;
