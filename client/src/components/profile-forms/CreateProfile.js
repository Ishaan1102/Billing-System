import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const CreateProfile = ({ createProfile, history }) => {
  const [ formData, setFormData ] = useState({
    company: '',
  website: '',
  location: '',
  status: ''
  });
  
  const {
    company,
    website,
    location,
    status
  } = formData;
  
const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value} );

const onSubmit = (e) => {
  e.preventDefault();
  createProfile(formData, history);
};
    return (
    <Fragment>
        <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> 
        Let's get some information to make your
        profile 
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit = {onSubmit}>
        <div className="form-group">
          <select name="status" value = {status} onChange= {onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Business">Business</option>
            <option value="Teacher">Teacher</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Militar">Military</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Company" 
            name="company" 
            value = {company} 
            onChange = {onChange} 
            />
          <small className="form-text">
              Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Website" 
            name="website" 
            value = {website} 
            onChange = {onChange}
            />
          <small className="form-text">
                Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Location" 
            name="location" 
            value = {location} 
            onChange = {onChange}
            />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
        </small>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  );
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};


export default connect(null, { createProfile })(withRouter(CreateProfile));