export default (state, action) => {
  switch (action.type) {
    case 'GET_JOBS':
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case 'GET_JOB':
      return {
        ...state,
        job: action.payload,
        loading: false,
      };
    case 'FILTERED_JOBS':
      return {
        ...state,
        filtered: state.jobs.filter((job) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return job.location.match(regex) || job.title.match(regex);
        }),
      };
    default:
      return state;
  }
};
