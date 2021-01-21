import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import SingleJob from '../job/SingleJob';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/jobs/:jobId' component={SingleJob} />
      </Switch>
    </>
  );
};

export default Routes;
