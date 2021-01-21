import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../context/jobs/JobState';
import Spinner from '../layout/Spinner';
import {
  FaRegMoneyBillAlt,
  FaTools,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { IoMdGlobe } from 'react-icons/io';

const SingleJob = ({ match }) => {
  const { job, loading, getJob } = useContext(JobContext);
  const {
    title,
    location,
    salary,
    description,
    type,
    name,
    logo,
    website,
    skills,
    role,
    about,
  } = job;

  useEffect(() => {
    getJob(match.params.jobId);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className='singleJob container mb-5'>
      <div className='row'>
        <div className='col-lg-8 p-4'>
          <Link to='/' className='btn btn-danger'>
            Back
          </Link>
          <h3 className='mt-4 mb-2'>{title}</h3>
          <p className='singleJob__info'>
            <MdLocationOn className='location' />
            Location : {location}
            <FaRegMoneyBillAlt /> Salary : {salary}
            <FaTools /> Type : {type}
          </p>
          <hr />

          <h4>Job description</h4>
          <p>{description}</p>
          <h4>Responsibilities</h4>
          <ul>
            {role && role.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <h4>Skills</h4>
          <ul>
            {skills &&
              skills.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>
          <h4>About us</h4>
          <p>{about}</p>
        </div>

        <article className='col-lg-4 mt-4 pt-2'>
          <img
            src={logo}
            alt='logo'
            className='singleJob__logo img-fluid z-depth-5 mb-lg-5 ml-4'
          />
          <div className='singleJob__company ml-4'>
            <h4 className='mb-2 mt-3'>{name}</h4>
            <p>
              <IoMdGlobe className='globe' />
              <a
                href={`${website}`}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-2'
              >
                {website}
              </a>
            </p>
            <Link
              to={`/jobs/apply/${job._id}`}
              className='btn btn-danger btn-lg'
            >
              Apply
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SingleJob;
