import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedJobList = ({ job }) => {
  const { name, title, location, type, logo } = job;

  return (
    <section className='featuredJob'>
      <div className='featuredJob__body z-depth-2 m-4 p-4'>
        <div className='featuredJob__logo'>
          <img src={logo} alt='logo' />
        </div>

        <div className='featuredJob__info'>
          <div className='featuredJob__details'>
            <h3 className='mt-2'>{name}</h3>
            <h4>{title}</h4>
            <p>
              {type} · {location}
            </p>
          </div>
        </div>

        <div className='featuredJob__btn'>
          <Link
            to={`/jobs/${job._id}`}
            className='btn btn-outline-danger mt-lg-4'
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobList;
