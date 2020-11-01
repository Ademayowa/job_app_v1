import React, { useReducer, createContext } from 'react';
import JobReducer from './JobReducer';
import axios from 'axios';

// Initial state
const initialState = {
  jobs: [],
  job: [],
  apply: [],
  filtered: null,
  loading: true,
};

// Create context
export const JobContext = createContext(initialState);

// Provider component
export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(JobReducer, initialState);

  // Actions
  async function getJobs() {
    try {
      const res = await axios.get('api/v1/jobs');

      dispatch({
        type: 'GET_JOBS',
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function getJob(_id) {
    try {
      const res = await axios.get(`/api/v1/jobs/${_id}`);

      dispatch({
        type: 'GET_JOB',
        payload: res.data.data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const filteredJobs = (text) => {
    dispatch({
      type: 'FILTERED_JOBS',
      payload: text,
    });
  };

  // Apply for jobs
  const apply = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/v1/jobs/apply', formData, config);

      dispatch({
        type: 'APPLICATION_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'APPLICATION_FAIL',
        payload: err.response.data.msg,
      });
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs: state.jobs,
        job: state.job,
        apply: state.apply,
        loading: state.loading,
        filtered: state.filtered,
        getJobs,
        getJob,
        filteredJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
