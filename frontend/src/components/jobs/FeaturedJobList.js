import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedJobList = ({ job }) => {
  const { name, title, location, type, logo } = job;

  return (
    <section className='featured'>
      <div className='card card-body p-4 m-4 pb-3 text-left'>
        <div className='featured__img'>
          <img src={logo} alt='logo' className='img-fluid' />
        </div>

        <div className='featured__jobInfo mb-5'>
          <h3 className='mb-2'>{name}</h3>
          <h4>{title}</h4>
          <p>
            {type} · {location}
          </p>

          <div className='featured__applyBtn mb-4'>
            <Link
              to={`/jobs/${job._id}`}
              className='btn btn-outline-danger btn-lg'
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobList;
