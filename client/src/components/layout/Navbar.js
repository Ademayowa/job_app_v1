import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';

const Navbar = ({ title }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-info m-auto p-4 z-depth-3'>
      <div className='container'>
        <Link className='navbar-brand text-white' to='/'>
          <FaCode size={32} color='#ff6633' /> {title}
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

export default Navbar;
