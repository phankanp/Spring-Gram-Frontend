import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../redux/post/post.actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./comment-item.css";

const CommentItem = ({
  postId,
  comment: { id, comment, userAlias },
  auth,
  deleteComment
}) => {
  return auth.loading || auth.user === null ? null : (
    <li className="list-group-item rounded-0">
      <b>{userAlias}</b> {comment}
      {!auth.loading &&
        auth.isAuthenticated &&
        userAlias === auth.user.alias && (
          <FontAwesomeIcon
            icon={faTimes}
            className="fontAwesome float-right"
            onClick={e => deleteComment(postId, id)}
          />
        )}
    </li>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
