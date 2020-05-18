import React, { Fragment, useEffect, useContext } from 'react';
import Hero from './Hero';
// import Navbar from '../layout/Navbar';
import Banner from './Banner';
import SearchForm from './SearchForm';
import FeaturedJobs from '../jobs/FeaturedJobs';
// import Testimonials from '../candidate/Testimonials';
// import HowItworks from './HowItworks';
import { AuthContext } from '../../context/auth/AuthState';

const Home = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Hero>
        <Banner
          title='find your dream job'
          subtitle='find jobs employmemt & career opportunities'
        >
          <SearchForm />
        </Banner>
      </Hero>
      <FeaturedJobs />
      {/* <Testimonials /> */}
      {/* <HowItworks /> */}
    </Fragment>
  );
};

export default Home;
