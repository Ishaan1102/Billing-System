import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const initialState = {
    company: '',
    website: '',
    location: '',
    status: ''
};

const EditProfile = ({ profile: { profile, loading}, createProfile, history, getCurrentProfile }) => {
  
    const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  
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
        profile stand out
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
          <small className="form-text">
              Give us an idea of where you are at in your career</small>
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile : state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));