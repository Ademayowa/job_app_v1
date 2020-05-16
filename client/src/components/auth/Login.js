import React, { useState, useContext, useEffect } from 'react';
import { AlertContext } from '../../context/alert/AlertState';
import { AuthContext } from '../../context/auth/AuthState';

const Login = (props) => {
  const { setAlert } = useContext(AlertContext);
  const { login, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }

    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (password === 'Invalid credentials') {
      setAlert(error, 'danger');
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='container col-md-4 mx-auto mt-5 mb-5 login'>
      <div className='card p-5 z-depth-2'>
        <h3 className='text-center mb-3'>Login</h3>
        <form onSubmit={onSubmit}>
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
          <input
            type='submit'
            value='Login'
            className='btn btn-outline-danger btn-lg btn-block mt-4'
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
