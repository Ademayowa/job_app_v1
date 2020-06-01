import React, { useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthState';

const Dashboard = () => {
  const { getProfile, profile } = useContext(AuthContext);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  return profile === null ? (
    <div className='container no-profile mt-5 mb-5'>
      <Redirect to='/create-profile' />
    </div>
  ) : (
    <div className='container mt-5 mb-5'>
      <div className='row'>
        <div className='col-sm-12'>
          <h2>Dashboard</h2>
          <p className='lead'>Welcome {profile.user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
