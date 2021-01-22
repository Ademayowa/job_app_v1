import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ title }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-info m-auto p-3 z-depth-2'>
      <div className='container'>
        <Link className='navbar-brand text-white' to='/'>
          <FaCode className='code' /> {title}
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarSupportedContent'
        ></div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
