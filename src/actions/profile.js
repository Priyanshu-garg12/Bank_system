import axios from "axios";
import { setAlert } from './alert';
import { PROFILES_LOADED, PROFILES_ERROR, HISTORY_LOADED, HISTORY_ERROR, TRANSFER_SUCCESS, TRANSFER_ERROR, ADD_CUSTOMER, ADD_CUSTOMER_ERROR } from "./types";

export const loadProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/allUsers')
        dispatch({
            type: PROFILES_LOADED,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: PROFILES_ERROR,
            payload: { msg: error, status: error.response.status }
        })
    }
}

export const loadHistory = () => async dispatch => {
    try{
        const res = await axios.get('/api/history')
        dispatch({
            type: HISTORY_LOADED,
            payload: res.data
        })
    }catch(error){
        dispatch({
            type: HISTORY_ERROR,
            payload: { msg: error, status: error.response.status }
        })
    }
}

export const transfer = ({From, To, amount}, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({From, To, amount})
    try{
        const res = await axios.post('/api/transaction', body, config)
        dispatch({
            type: TRANSFER_SUCCESS,
            payload: res.data
        })
        history.push('/profile')
        alert(`${res.data}`)
    }catch(error){
        dispatch({
            type: TRANSFER_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}

// Add new customer
export const addCustomer = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('Sending customer data:', formData);

    // formData already has the correct field names (name, email, acc_balance)
    const customerData = {
      ...formData,
      acc_no: String(Math.floor(Math.random() * 9000000000) + 1000000000),
      profession: 'NA'
    };

    const res = await axios.post('/api/users', customerData, config);
    console.log('Server response:', res.data);

    dispatch({
      type: ADD_CUSTOMER,
      payload: res.data
    });

    dispatch(setAlert('Customer added successfully', 'success'));
    // Reload profiles after adding new customer
    dispatch(loadProfile());
  } catch (err) {
    console.error('Error in addCustomer action:', err.response?.data);
    
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert('Error adding customer', 'danger'));
    }

    dispatch({
      type: ADD_CUSTOMER_ERROR
    });
  }
};