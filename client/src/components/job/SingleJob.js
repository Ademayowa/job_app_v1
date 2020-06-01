import React, { useContext, useEffect } from 'react';
import { JobContext } from '../../context/jobs/JobState';
import { Link } from 'react-router-dom';
import Img from '../../img/company4.png';
import Spinner from '../layout/Spinner';
import { FaTools, FaPhone, FaEnvelope } from 'react-icons/fa';
import { IoMdGlobe } from 'react-icons/io';

const SingleJob = ({ match }) => {
  let { job, loading, getJob } = useContext(JobContext);

  const {
    title,
    location,
    salary,
    description,
    responsibilities,
    skills,
    phone,
    email,
    website,
    name,
  } = job;

  useEffect(() => {
    getJob(match.params.jobId);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className='container job-info mb-5'>
      <div className='row'>
        <div className='col-lg-8 margin p-4'>
          <Link to='/' className='btn btn-danger text-capitalize'>
            Back
          </Link>
          <h3 className='mt-4 mb-4'>{title}</h3>
          <p className='mb-4'>
            Location : {location} · Salary : {salary}
          </p>
          <hr />

          <h4 className='mt-5 mb-3'>Job description</h4>
          <p>{description}</p>
          <h4 className='mt-5 mb-3'>Responsibilities</h4>
          <ul>
            {responsibilities.role.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h4 className='mt-5 mb-3'>Skills</h4>
          <ul>
            {skills.skill.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className='col-lg-4 mt-5 p-4'>
          <img
            src={Img}
            alt='company'
            className='img-fluid z-depth-5 mb-5 ml-4'
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '60px',
            }}
          />
          <article className='ml-4 company-details'>
            <h4 className='mb-3 mt-4 text-capitalize'>{name}</h4>
            <p>
              <span>
                <IoMdGlobe size={16} color='#ff6633' />{' '}
              </span>
              <Link to='#'>{website}</Link>
            </p>
            <p>
              <span>
                <FaEnvelope size={16} color='#ff6633' />{' '}
              </span>
              {email}
            </p>
            <p>
              <span>
                <FaPhone size={16} color='#ff6633' />{' '}
              </span>
              {phone}
            </p>

            <Link
              to={`/jobs/apply/${job._id}`}
              className='btn btn-danger btn-lg text-capitalize'
            >
              Apply
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
