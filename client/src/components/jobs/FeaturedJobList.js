import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { GiNetworkBars } from 'react-icons/gi';
import Img from '../../img/company1.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FeaturedJobList = ({ job }) => {
  return (
    <article className='card card-body py-4'>
      <img
        src={Img}
        alt='jobs'
        className='img-fluid mx-auto'
        style={{ width: '60px' }}
      />
      <div>
        <Link to={`/jobs/${job._id}`}>
          <h5 className='mt-4 mb-4'>{job.title}</h5>
        </Link>
        <span>
          <GiNetworkBars size={14} /> {job.skillLevel}{' '}
          <MdLocationOn size={14} /> {job.location}
        </span>
      </div>

      <div className='card-footer mt-5 pt-4'>
        <span className='float-left mt-2'>{job.type}</span>
        <Link
          to={`/jobs/${job._id}`}
          className='btn btn-outline-danger btn-sm float-right'
        >
          Apply Now
        </Link>
      </div>
    </article>
  );
};

FeaturedJobList.propTypes = {
  job: PropTypes.object.isRequired,
};

export default FeaturedJobList;
