import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { editProfile } from "../../redux/profile/profile.actions";

const ProfileEdit = ({ editProfile, user, props, history }) => {
  const [profileData, setProfileData] = useState({
    profileImage: "",
    fullName: user.fullName
  });

  const { profileImage, fullName } = profileData;

  const onFileChange = e =>
    setProfileData({ ...profileData, [e.target.name]: e.target.files[0] });

  const onChange = e =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    let profile = new FormData();

    profile.append("profileImage", profileImage);
    profile.append("fullName", fullName);

    editProfile(profile, history);
  };

  return (
    <div>
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit Profile</h5>
              <hr />
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="inputGroupFile01">Choose Image</label>
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        name="profileImage"
                        // value={image}
                        onChange={e => onFileChange(e)}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        {profileImage === "" ? (
                          <span>Choose a file...</span>
                        ) : (
                          <span>File Selected - {profileImage.name}</span>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Fill Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Enter a image caption"
                    name="fullName"
                    value={fullName}
                    onChange={e => onChange(e)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileEdit.propTypes = {
  editProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  props: ownProps
});

export default connect(
  mapStateToProps,
  { editProfile }
)(ProfileEdit);
