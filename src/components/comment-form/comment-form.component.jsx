import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../redux/post/post.actions";

import "./comment-form.css";

const CommentForm = ({ auth, postId, addComment }) => {
  const [comment, setComment] = useState("");

  return (
    <form
      className="addCommentForm"
      onSubmit={e => {
        e.preventDefault();
        addComment(postId, { comment });
        setComment("");
      }}
    >
      <div className="input-group mb-3" type="submit" value="Submit">
        {!auth.loading && auth.user === null ? (
          <input
            className="mt-auto form-control rounded-0 border border-primary"
            type="text"
            placeholder="Add Comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
            disabled
            data-toggle="tooltip"
            data-placement="bottom"
            title="Login or Register to comment"
          />
        ) : (
          <input
            className="mt-auto form-control rounded-0 border border-primary"
            type="text"
            placeholder="Add Comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
        )}
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
