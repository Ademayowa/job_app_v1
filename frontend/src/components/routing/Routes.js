import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import SingleJob from '../job/SingleJob';
import ApplicationForm from '../job/ApplicationForm';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/jobs/:jobId' component={SingleJob} />
        <Route exact path='/jobs/apply/:jobId' component={ApplicationForm} />
      </Switch>
    </>
  );
};

export default Routes;
