import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBill } from '../../actions/profile';

const AddBill = ({ addBill, history }) => {
    const [formData, setFormData] = useState({
        text: '',
        name: '',
        dueDate: '',
        amount: ''
    });

    const [toDateDisabled, toggleDissabled] = useState(false);

    const {text, name, dueDate, amount} = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name] : e.target.value});

  return (
    <Fragment>
        <h1 className="large text-primary">
       Add An Bill
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any previous bills
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit = {e => {
          e.preventDefault();
          addBill(formData, history);
      }}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="* Bill Title" 
            name="text" 
            value = {text}
            onChange = {onChange}
            required 
            />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="* Company Name" 
            name="name" 
            value = {name}
            onChange = {onChange}
            required 
            />
        </div>
        <div className="form-group">
          <h4>Due Date</h4>
          <input 
            type="date" 
            name="dueDate"
            value = {dueDate}
            onChange = {onChange}
           />
        </div>
        <div className="form-group">
          <h4>Bill Amount</h4>
          <input 
            type="text" 
            name="amount" 
            value = {amount}
            onChange = {onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddBill.propTypes = {
    addBill: PropTypes.func.isRequired
};

export default connect(null, { addBill })(AddBill);