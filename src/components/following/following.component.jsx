import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProfile } from "../../redux/profile/profile.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./following.css";

const Following = ({ getProfile, auth, profile: { userProfile, loading } }) => {
  useEffect(() => {
    getProfile(auth.user.alias);

  }, [getProfile]);

  return !auth.isAuthenticated ? null : loading ? (
    <div className="d-flex justify-content-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="fa-spin"
        style={{ height: "50px", width: "50px", color: "white" }}
      />
    </div>
  ) : (
    <div class="card d-flex justify-content-sm-middle justify-content-center text-center following-card mx-auto shadow-lg  rounded-0" id="followingComponent">
      <div className="card-header">
        <b>Following</b>
      </div>
      <div className="card-body">
        <div className="col-md-12 align-self-center">
          {userProfile.following.map((profile, i) => (
            <Link className="" to={`/profile/${profile.userAlias}`} >
              <img
                className="rounded-circle border border-info"
                alt="100x100"
                src={profile.getFollowingUserProfileImageUrl}
                data-holder-rendered="true"
                style={{ height: "60px", width: "60px" }}
              />
              <div
                className="vertical-center"
                style={{ marginBottom: "20px", color: "black" }}
              >
                <h5>{profile.userAlias}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

Following.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  profile: state.profile,
  props: ownProps
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Following);
