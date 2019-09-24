import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

import CommentForm from "../comment-form/comment-form.component";
import CommentItem from "../comment-item/comment-item.component";

import { addLike, removeLike, deletePost } from "../../redux/post/post.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart as farHeartFilled,
  faTrashAlt,
  faCommentDots
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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
    likeCount
  },
  addLike,
  removeLike,
  deletePost
}) => {
  return (
    <div className="container ">
      <div className="row justify-content-center align-self-center">
        <div className="card rounded-0 d-flex flex-column">
          <div className="card-header">
            <Link className="" to="/gallery">
              <FontAwesomeIcon icon={faUser} className="fontAwesome" />
              Gallery
            </Link>
            {!auth.loading &&
            auth.user !== null &&
            userAlias === auth.user.alias ? (
              <button
                type="button"
                className="btn btn-danger btn-sm float-sm-right"
                onClick={e => deletePost(id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="fontAwesome" />
                Delete Post
              </button>
            ) : null}
          </div>
          <img
            src={`data:image/jpeg;base64,${image}`}
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
              {likes.length} likes
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
            <ul className="list-group rounded-0">
              {comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} postId={id} />
              ))}
            </ul>
            <CommentForm postId={id} auth={auth} />
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
