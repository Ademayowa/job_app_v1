import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import Register from '../auth/Register';
import Login from '../auth/Login';
import SingleJob from '../job/SingleJob';
import Dashboard from '../dashboard/Dashboard';
import Alerts from '../layout/Alerts';
import PrivateRoute from './PrivateRoute';
import ApplicationForm from '../job/ApplicationForm';
import CreateProfile from '../profile-forms/CreateProfile';
import Navbar from '../layout/Navbar';

const Routes = () => {
  return (
    <div className='App'>
      <Navbar title='Dev Portal' />
      <Alerts />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/sign-up' component={Register} />
        <Route exact path='/sign-in' component={Login} />
        <Route exact path='/jobs/:jobId' component={SingleJob} />
        <Route exact path='/jobs/apply/:jobId' component={ApplicationForm} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
      </Switch>
    </div>
  );
};

export default Routes;
