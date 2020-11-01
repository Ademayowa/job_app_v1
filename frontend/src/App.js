import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import { AuthProvider } from './context/auth/AuthState';
import { JobProvider } from './context/jobs/JobState';
import { AlertProvider } from './context/alert/AlertState';
// import Footer from './components/layout/Footer';
import setAuthToken from './utils/setAuthToken';
import Routes from './components/routing/Routes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Fragment>
      <AuthProvider>
        <JobProvider>
          <AlertProvider>
            <Router>
              <Routes />
            </Router>
            {/* <Footer /> */}
          </AlertProvider>
        </JobProvider>
      </AuthProvider>
    </Fragment>
  );
};

export default App;
