import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Biling System for Everyday USe</h1>
          <p className='lead'>
            Create a profie and enter your bills to not be worried about due dates and reminders
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>Register</Link>
            <Link to='/login' className='btn btn-light'>Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
};

export default Landing;