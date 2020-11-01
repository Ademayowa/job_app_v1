import React, { useContext, useRef, useEffect } from 'react';
import { FaRegKeyboard } from 'react-icons/fa';
import { MdLocationOn, MdSearch } from 'react-icons/md';
import { JobContext } from '../../context/jobs/JobState';

const SearchForm = () => {
  const { filtered, filteredJobs } = useContext(JobContext);

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    filteredJobs(e.target.value);
  };

  return (
    <div className='container job-search'>
      <form>
        <div className='row'>
          <div className='col-lg-7'>
            <input
              className='form-control form-control-lg mb-3'
              type='text'
              placeholder='Search job title or location'
              ref={text}
              onChange={onChange}
            />
            <span>
              <FaRegKeyboard size={28} />
            </span>
          </div>
          <div className='col-lg-4'>
            <input
              className='form-control form-control-lg mb-3'
              type='text'
              placeholder='Search location'
            />
            <span>
              {' '}
              <MdLocationOn size={28} />
            </span>
          </div>
          <div className='col-lg-1'>
            <button type='search'>
              <span className='search'>
                {' '}
                <MdSearch size={28} />
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
