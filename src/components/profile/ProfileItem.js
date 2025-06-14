import React from "react";
import {Link} from 'react-router-dom'

const ProfileItem = (props) => {
  return (
    <div className="box">
      <div className="glass"></div>
      <div className="glass-content">
        <h2>{props.name}</h2>
        <br />
        <p className="profession">
        </p>
        <p>Email: {props.email}</p>
        <p>Account No: {props.acc_no}</p>
        <p>Account Balance: {props.acc_balance}</p>
        <br />
        <Link to="/transaction">TRANSFER</Link>
      </div>
    </div>
  );
};

export default ProfileItem;
