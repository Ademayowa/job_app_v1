import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthState';

const Dashboard = () => {
  const { loadUser, user } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
