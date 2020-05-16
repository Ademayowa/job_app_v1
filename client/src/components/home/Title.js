import React from 'react';

const Title = ({ title }) => {
  return (
    <div>
      <h2 className='text-center text-capitalize mb-2'>{title}</h2>
      <div className='center-line mb-5' />
    </div>
  );
};

export default Title;
