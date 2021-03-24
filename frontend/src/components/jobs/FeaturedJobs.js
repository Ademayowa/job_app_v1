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

  // if (loading) return <Spinner />;
  return (
    <div className='container featured-jobs text-center'>
      <Title title='featured jobs' />
      <>
        {jobs.length > 0 && filtered !== null ? (
          filtered.map((job) => <FeaturedJobList key={job._id} job={job} />)
        ) : (
          <h3>There are no jobs available at the moment</h3>
        )}
      </>
    </div>
  );
};

export default FeaturedJobs;
