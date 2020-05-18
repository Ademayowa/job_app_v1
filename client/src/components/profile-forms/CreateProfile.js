import React from 'react';

const CreateProfile = () => {
  return (
    <div className='container mt-5 mb-5'>
      <h2 className='text-center mb-5'>Create Profile</h2>
      <form>
        <div className='form-row'>
          <div className='col-md-6 mb-4'>
            <input
              type='text'
              className='form-control'
              placeholder='First name'
            />
          </div>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control'
              placeholder='Last name'
            />
          </div>
          <div className='col'>
            <input type='text' className='form-control' placeholder='Gender' />
          </div>
          <div className='col'>
            <input
              type='text'
              className='form-control'
              placeholder='Profile handle'
            />
          </div>
        </div>
        <input type='submit' value='submit' className='btn btn-danger mt-4' />
      </form>
    </div>
  );
};

export default CreateProfile;
