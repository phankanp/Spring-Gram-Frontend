import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

import CommentForm from "../comment-form/comment-form.component";
import CommentItem from "../comment-item/comment-item.component";

import { addLike, removeLike, deletePost } from "../../redux/post/post.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart as farHeartFilled,
  faTrashAlt,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCompass } from "@fortawesome/free-regular-svg-icons";

import "./post-item.css";

const PostItem = ({
  auth,
  post: {
    id,
    image,
    caption,
    createDateTime,
    updateDateTime,
    likes,
    comments,
    userAlias,
    likeCount,
    userProfileImage,
    imageUrl,
    location
  },
  addLike,
  removeLike,
  deletePost
}) => {
  return (
    <div className="container ">
      <div className="row justify-content-center align-self-center">
        <div
          className="card rounded-0 d-flex flex-column shadow-lg"
          style={{ marginBottom: "40px" }}
        >
          <div className="card-header">
            <Link className="header-alias" to={`/profile/${userAlias}`}>
              <img
                className="rounded-circle float-left fontAwesome border border-info"
                alt="100x100"
                src={userProfileImage}
                data-holder-rendered="true"
                style={{ height: "33px", width: "33px" }}
              />
              <text
                className=" align-self-center"
                style={{ verticalAlign: "middle" }}
              >
                {userAlias}
              </text>
            </Link>

            {!auth.loading &&
            auth.user !== null &&
            userAlias === auth.user.alias ? (
              <div className="btn-group float-right ">
                <button
                className="btn btnCustom btn-sm dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faEllipsisH} className="fontAwesome" />
                </button>
                <div
                className="dropdown-menu dropdown-menu-right"
                  style={{ textAlign: "center" }}
                >
                  <button
                    type="button"
                    className="btn btn-danger btn-sm float-sm-middle "
                    onClick={e => deletePost(id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="fontAwesome"
                    />
                    Delete Post
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <img
            src={imageUrl}
            className="card-img-top rounded-0"
            alt="..."
          />
          <div className="card-body d-flex flex-column">
            <h6 className="card-title">
              {!auth.loading && auth.user === null ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fontAwesome"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Login or Register to like"
                />
              ) : !auth.loading &&
                auth.user !== null &&
                likes.find(like => like.username === auth.user.username) ? (
                <FontAwesomeIcon
                  icon={farHeartFilled}
                  className="fontAwesome heartFilled"
                  onClick={e => removeLike(id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fontAwesome emptyHeart"
                  onClick={e => addLike(id)}
                />
              )}
              {likes.length} Likes
              <small className="creation-date float-right">
                <i>
                  Created on{" "}
                  <Moment format="MM/DD/YYYY">{createDateTime}</Moment>
                </i>
              </small>
            </h6>

            <h5 className="card-text">
              <FontAwesomeIcon icon={faUser} className="fontAwesome" />"
              {caption}"
            </h5>
            
            <small className="mb-3">
              <i>
                {location != null ? (
                  <span>
                  <FontAwesomeIcon icon={faCompass} className="fontAwesome" />
                  {location}
                  </span>
                ) : null}
              </i>
            </small>

            <ul className="list-group rounded-0">
              {comments === null ? (
                <li className="list-group-item rounded-0">
                  <b>No Comments</b>
                </li>
              ) : (
                comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} postId={id} />
                ))
              )}
            </ul>
            <CommentForm postId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
