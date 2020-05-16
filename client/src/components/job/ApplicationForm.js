import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../context/jobs/JobState';
import Spinner from '../layout/Spinner';

const ApplicationForm = ({ match }) => {
  const { job, loading, getJob } = useContext(JobContext);

  useEffect(() => {
    getJob(match.params.jobId);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className='container mt-3 mb-5 application-form px-5'>
      <Link to={`/jobs/${job._id}`} className='btn btn-danger text-capitalize'>
        Back
      </Link>
      <h4 className='text-center mt-2 mb-4'>Job Application Form</h4>
      <p className='pt-4 pb-4'>
        Thank you for your interest in working with us. Please check below for
        available job opportunities that meet your criteria and send your
        application by filling out the Job Application Form.
      </p>
      <form>
        <div className='form-row'>
          <div className='col'>
            <label htmlFor='text'>First Name *</label>
            <input
              type='text'
              className='form-control'
              placeholder='First name'
            />
          </div>
          <div className='col'>
            <label htmlFor='text'>Last Name *</label>
            <input
              type='text'
              className='form-control'
              placeholder='Last name'
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='col-md-6 mt-4'>
            <label htmlFor='email'>Email *</label>
            <input type='email' className='form-control' placeholder='Email' />
          </div>
          <div className='col-md-6 mt-4'>
            <label htmlFor='phone'>Phone *</label>
            <input type='text' className='form-control' placeholder='Phone' />
          </div>
        </div>

        <div className='form-row'>
          <div className='col mt-4'>
            <label htmlFor='resume'>
              Submit your resume by providing your resume URL:
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='resume link'
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='col-sm-12 mt-4'>
            <label htmlFor='resume'>Cover letter</label>
            <textarea
              placeholder='Max. 100 characters'
              rows='10'
              className='form-control'
            />
          </div>
        </div>
        <input type='submit' value='apply now' className='btn btn-dark mt-4' />
      </form>
    </div>
  );
};

export default ApplicationForm;
