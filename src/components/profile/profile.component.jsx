import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GalleryItem from "../gallery-item/gallery-item.component";

import {
  getProfile,
  addFollow,
  removeFollow
} from "../../redux/profile/profile.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import yosemite from "../../images/yosemite.jpg";

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
  }, [getProfile]);

  return loading ? (
    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
  ) : (
    <div className="container ">
      <div className="row">
        <div className="col-md-12 align-self-center">
          <img
            className="rounded-circle float-left"
            alt="100x100"
            src={yosemite}
            data-holder-rendered="true"
            style={{ height: "200px", width: "200px" }}
          />
          <div
            className="vertical-center"
            style={{ marginLeft: "260px", marginTop: "50px" }}
          >
            <h2>
              <b>{userAlias}</b>
            </h2>
            <p>
              <b> {userProfile.posts.length} </b> posts
              <b> {userProfile.followers.length} </b> followers
              <b> {userProfile.following.length} </b> following
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
