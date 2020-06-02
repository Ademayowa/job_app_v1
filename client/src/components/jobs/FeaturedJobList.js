import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { GiNetworkBars } from 'react-icons/gi';
import Img from '../../img/company1.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FeaturedJobList = ({ job }) => {
  let { name, title, skillLevel, location, type } = job;

  return (
    <section className='featured'>
      <div className='card card-body p-4 m-4 text-left'>
        <div>
          {/* <img
            src={logo}
            alt='img-logo'
            className='img-fluid'
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '60px',
              position: 'relative',
              top: '15px',
            }}
          /> */}
        </div>
        <div style={{ marginLeft: '100px', marginTop: '-60px' }}>
          <h3 className='orange-color text-capitalize mb-2'>{name}</h3>
          <h4>{title}</h4>
          <p className='gray-color'>
            {type} · {location}
          </p>
        </div>
        <div className='float-right apply mb-4' style={{ marginTop: '-50px' }}>
          <Link
            to={`/jobs/${job._id}`}
            className='btn btn-outline-danger btn-sm float-right'
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
};

FeaturedJobList.propTypes = {
  job: PropTypes.object.isRequired,
};

export default FeaturedJobList;
