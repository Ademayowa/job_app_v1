import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { JobProvider } from './context/jobs/JobState';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import Routes from './components/routing/Routes';
import './App.css';

const App = () => {
  return (
    <>
      <JobProvider>
        <Router>
          <Routes />
        </Router>
      </JobProvider>
    </>
  );
};

export default App;
