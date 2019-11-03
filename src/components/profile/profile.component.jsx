import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import GalleryItem from "../gallery-item/gallery-item.component";

import "./profile.css";

import {
  getProfile,
  addFollow,
  removeFollow
} from "../../redux/profile/profile.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUserEdit } from "@fortawesome/free-solid-svg-icons";

const Profile = ({
  getProfile,
  addFollow,
  removeFollow,
  auth,
  profile: { userProfile, loading },
  props
}) => {
  const userAlias = props.match.params.alias;

  useEffect(() => {
    getProfile(userAlias);
  }, [getProfile, userAlias]);

  return loading ? (
    <div class="d-flex justify-content-center">
      <FontAwesomeIcon icon={faSpinner} className="fa-spin faSpinProfile" />
    </div>
  ) : (
    <div className="container ">
      <div className="row">
        <div className="col-md-12 align-self-center">
          <img
            className="rounded-circle float-left shadow-lg profileImg"
            alt="100x100"
            src={userProfile.userProfileImage}
            data-holder-rendered="true"
          />
          <div className="vertical-center profileUsername">
            <h2>
              {auth.user === null || auth.user.alias !== userAlias ? (
                <b style={{ color: "white" }}>{userAlias}</b>
              ) : auth.user.alias === userAlias ? (
                <b style={{ color: "white" }}>
                  {userAlias}
                  <Link className="" to="/profile/edit">
                    <FontAwesomeIcon
                      icon={faUserEdit}
                      className="fontAwesome profileEditLink"
                    />
                  </Link>
                </b>
              ) : (
                <b>{userAlias}</b>
              )}
            </h2>
            <p>
              <b style={{ color: "white" }}>
                {" "}
                {userProfile.posts.length} Posts
              </b>
              <b style={{ color: "white" }}>
                {" "}
                {userProfile.followers.length} Followers{" "}
              </b>
              <b style={{ color: "white" }}>
                {" "}
                {userProfile.following.length} Following{" "}
              </b>
            </p>
            {auth.user === null || auth.user.alias === userAlias ? null : auth
                .user.alias !== userAlias &&
              userProfile.followers.some(
                e => e.userAlias === auth.user.alias
              ) ? (
              <button
                type="button"
                className="btn btn-primary btn-lg "
                onClick={e => removeFollow(userProfile.userId)}
              >
                Following
              </button>
            ) : auth.user.alias !== userAlias ? (
              <button
                type="button"
                className="btn btn-primary btn-lg "
                onClick={e => addFollow(userProfile.userId)}
              >
                Not Following
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg "
                disabled
              >
                Follow/Unfollow
              </button>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="row d-flex justify-content-center">
        {userProfile.posts.map((post, i) => (
          <GalleryItem key={i} post={post} />
        ))}
      </div>
      {userProfile.following.length > 0 ? (
        <div>
          <h1 className="text-white text-center mt-5">Following</h1>
          <hr />
          <div className="row justify-content-center text-center px-auto">
            {userProfile.following.map((profile, i) => (
              <Link className="mx-auto" to={`/profile/${profile.userAlias}`}>
                <img
                  className="rounded-circle border border-info m-4 profileFollowingImage"
                  alt="100x100"
                  src={profile.getFollowingUserProfileImageUrl}
                  data-holder-rendered="true"
                />
                <div className="vertical-center mb-3 text-white">
                  <h5>{profile.userAlias}</h5>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  profile: state.profile,
  props: ownProps
});

export default connect(
  mapStateToProps,
  { getProfile, addFollow, removeFollow }
)(Profile);
