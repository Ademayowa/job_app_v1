import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { AlertContext } from '../../context/alert/AlertState';

const CreateProfile = (props) => {
  const { isAuthenticated, getProfile, profile } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/dashboard');
    }
  }, [isAuthenticated, getProfile, props.history]);

  const [candidate, setCanditate] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    handle: '',
  });

  const { firstName, lastName, gender, handle } = candidate;

  const onChange = (e) =>
    setCanditate({ ...candidate, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setCanditate({ firstName, lastName, gender, handle });
  };

  return (
    <div className='container mt-5 mb-5'>
      <h2 className='text-center mb-5'>Create Profile</h2>
      <form onSubmit={onSubmit}>
        <div className='form-row'>
          <div className='col-md-6 mb-4'>
            <input
              type='text'
              className='form-control'
              placeholder='First name'
              name='firstName'
              value={firstName}
              onChange={onChange}
            />
          </div>
          <div className='col-md-6 mb-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Last name'
              name='lastName'
              value={lastName}
              onChange={onChange}
            />
          </div>
          <div className='col mb-4'>
            <input
              type='text'
              className='form-control'
              placeholder='Gender'
              name='gender'
              value={gender}
              onChange={onChange}
            />
          </div>
          <div className='col'>
            <input
              type='text'
              className='form-control'
              placeholder='Profile handle'
              name='handle'
              value={handle}
              onChange={onChange}
            />
          </div>
        </div>
        <input type='submit' value='submit' className='btn btn-danger' />
      </form>
    </div>
  );
};

export default CreateProfile;
