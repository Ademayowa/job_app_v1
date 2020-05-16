import React, { useContext, useEffect } from 'react';
import { JobContext } from '../../context/jobs/JobState';
import FeaturedJobList from './FeaturedJobList';
import Spinner from '../layout/Spinner';
import Title from '../home/Title';

const FeaturedJobs = () => {
  const { jobs, loading, getJobs, filtered } = useContext(JobContext);

  // console.log(jobs);

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className='container featured-jobs text-center'>
      <Title title='featured jobs' />
      <div style={grid}>
        {filtered !== null
          ? filtered.map((job) => <FeaturedJobList key={job._id} job={job} />)
          : jobs.map((job) => <FeaturedJobList key={job._id} job={job} />)}
      </div>
    </div>
  );
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gridGap: '2rem',
};

export default FeaturedJobs;
