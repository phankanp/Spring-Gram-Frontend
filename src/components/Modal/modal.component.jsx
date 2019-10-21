import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CommentForm from "../comment-form/comment-form.component";
import CommentItem from "../comment-item/comment-item.component";

import { addLike, removeLike, deletePost } from "../../redux/post/post.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeartFilled,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import "./modal.css";

const divStyle = {
  display: "block"
};

const Modal = ({
  isShowing,
  hide,
  post: { image, caption, userAlias, userProfileImage, comments, id, likes, imageUrl }, 
  auth, 
  addLike,
  removeLike,
  deletePost
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="modal"
            id="ModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="ModalCenterTitle"
            aria-hidden="true"
            display="block"
            style={divStyle}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header rounded-0 border-bottom-0">
                  <h5 className="modal-title" id="ModalCenterTitle">
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
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-content rounded-0 border-bottom-0">
                  <img
                    src={imageUrl}
                    className="modal-content rounded-0 border-0"
                    alt=""
                  ></img>
                </div>
                <div class="modal-body">
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
        </React.Fragment>,
        document.body
      )
    : null;

Modal.propTypes = {
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
)(Modal);