import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileItem from "./ProfileItem";
import { loadProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Profiles = ({ loadProfile, profile: { profiles, loading } }) => {
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div className="profile-box">
      <div className="profile-actions">
        <Link to="/add-customer" className="btn btn-primary">
          Add New Customer
        </Link>
      </div>
      {loading ? (
        <h1>loading</h1>
      ) : profiles.length > 0 ? (
        profiles.map((profile) => (
          <ProfileItem
            key={profile._id}
            name={profile.name}
            profession={profile.profession}
            acc_no={profile.acc_no}
            email={profile.email}
            acc_balance={profile.acc_balance}
          />
        ))
      ) : (
        <h4>No profiles found...</h4>
      )}
    </div>
  );
};

Profiles.protoTypes = {
  loadProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { loadProfile })(Profiles);
