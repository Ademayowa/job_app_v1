import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../context/jobs/JobState';
import Spinner from '../layout/Spinner';

const ApplicationForm = ({ match }) => {
  const { job, loading, getJob, apply } = useContext(JobContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    resumeUrl: '',
    phone: '',
  });

  const { firstName, lastName, email, resumeUrl, phone } = formData;

  useEffect(() => {
    getJob(match.params.jobId);
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    apply(lastName, email, resumeUrl, phone);
  };

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
      <form onSubmit={onSubmit}>
        <div className='form-row'>
          <div className='col'>
            <label htmlFor='text'>First Name *</label>
            <input
              type='text'
              className='form-control'
              placeholder='First name'
              name='firstName'
              value={firstName}
              onChange={onChange}
            />
          </div>
          <div className='col'>
            <label htmlFor='text'>Last Name *</label>
            <input
              type='text'
              className='form-control'
              placeholder='Last name'
              name='lastName'
              value={lastName}
              onChange={onChange}
            />
          </div>
        </div>

        <div className='form-row'>
          <div className='col-md-6 mt-4'>
            <label htmlFor='email'>Email *</label>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='col-md-6 mt-4'>
            <label htmlFor='phone'>Phone *</label>
            <input
              type='text'
              className='form-control'
              placeholder='Phone'
              name='phone'
              value={phone}
              onChange={onChange}
            />
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
              name='resumeUrl'
              value={resumeUrl}
              onChange={onChange}
            />
          </div>
        </div>
        <input type='submit' value='apply now' className='btn btn-dark mt-4' />
      </form>
    </div>
  );
};

export default ApplicationForm;
