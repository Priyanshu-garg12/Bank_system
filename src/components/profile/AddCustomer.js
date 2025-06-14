import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCustomer } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const AddCustomer = ({ addCustomer, setAlert }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    acc_balance: ''
  });

  const { name, email, acc_balance } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    
    if (!name || !email || !acc_balance) {
      setAlert('Please fill in all fields', 'danger');
      return;
    }

    try {
      await addCustomer(formData);
      setFormData({
        name: '',
        email: '',
        acc_balance: ''
      });
      setTimeout(() => {
        history.push('/profile');
      }, 2000);
    } catch (error) {
      console.error('Error adding customer:', error);
      setAlert('Error adding customer. Please try again.', 'danger');
    }
  };

  return (
    <div className="add-customer-container">
      <div className="add-customer-card">
        <div className="card-header">
          <h1>Add New Customer</h1>
          <p className="lead">
            <i className="fas fa-user-plus"></i> Create a New Bank Account
          </p>
        </div>
        <form className="add-customer-form" onSubmit={onSubmit}>
          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <i className="fas fa-user"></i>
              </div>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <i className="fas fa-rupee-sign"></i>
              </div>
              <input
                type="number"
                placeholder="Initial Balance"
                name="acc_balance"
                value={acc_balance}
                onChange={onChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            <i className="fas fa-plus-circle"></i> Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

AddCustomer.propTypes = {
  addCustomer: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { addCustomer, setAlert })(AddCustomer);
