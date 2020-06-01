import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/alert/AlertState';
import { AuthContext } from '../../context/auth/AuthState';

const Register = (props) => {
  const { setAlert } = useContext(AlertContext);
  const { register, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error === 'Username already exist') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '') {
      setAlert('Please enter all required fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        username,
        email,
        password,
      });
    }
  };

  return (
    <div className='container col-md-4 mx-auto mt-5 mb-5 register'>
      <div className='card p-5 z-depth-2'>
        <h3 className='text-center mb-3'>Register</h3>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Username</label>
            <input
              className='form-control form-control-lg mb-3'
              type='text'
              name='username'
              value={username}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              className='form-control form-control-lg mb-3'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              className='form-control form-control-lg mb-3'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              className='form-control form-control-lg mb-3'
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
            />
          </div>
          <input
            type='submit'
            value='Register'
            className='btn btn-outline-danger btn-lg btn-block mt-4'
          />
          <p className='pt-3 text-center'>
            Already have an account? <Link to='/sign-in'>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
