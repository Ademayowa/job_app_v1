import React, { useContext, useEffect } from 'react';
import { JobContext } from '../../context/jobs/JobState';
import FeaturedJobList from '../FeaturedJobList/FeaturedJobList';
import Spinner from '../layout/Spinner';
import Title from '../home/Title';
import '../FeaturedJobList/FeaturedJobs.css';

const FeaturedJobs = () => {
  const { jobs, loading, getJobs, filtered } = useContext(JobContext);

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;
  return (
    <div className='container featured-jobs text-center'>
      <Title title='featured jobs' />
      <div>
        {filtered !== null
          ? filtered.map((job) => <FeaturedJobList key={job._id} job={job} />)
          : jobs.map((job) => <FeaturedJobList key={job._id} job={job} />)}
      </div>
    </div>
  );
};

export default FeaturedJobs;
