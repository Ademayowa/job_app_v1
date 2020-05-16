import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/auth/AuthState';
import { IoIosLogOut } from 'react-icons/io';

const Navbar = ({ title }) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const authLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>Hello {user && user.user.username}</li>
      <li className='ml-2'>
        <IoIosLogOut />
        <a onClick={logout} href='#!'>
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/sign-up'>
          Register
          <i className='fa fa-user-plus text-white ml-1' />
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/sign-in'>
          Login
          <i className='fa fa-user text-white ml-1' />
        </Link>
      </li>
    </ul>
  );

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
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Navbar;
