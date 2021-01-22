import React from 'react';
import Hero from '../Hero/Hero';
import Navbar from '../layout/Navbar';
import Banner from '../Banner/Banner';
import SearchForm from '../SearchForm/SearchForm';
import FeaturedJobs from '../jobs/FeaturedJobs';

const Home = () => {
  return (
    <>
      <Hero>
        <Navbar title='Dev Portal' />
        <Banner
          title='find your dream job'
          subtitle='find jobs employmemt & career opportunities'
        >
          <SearchForm />
        </Banner>
      </Hero>
      <FeaturedJobs />
    </>
  );
};

export default Home;
