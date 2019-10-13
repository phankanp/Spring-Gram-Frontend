import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../redux/post/post.actions";

import PostItem from "../post-item/post-item.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Post = ({ getPosts, post: { posts, loading }, auth }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <div className="d-flex justify-content-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="fa-spin"
        style={{ height: "50px", width: "50px", color: "white" }}
      />
    </div>
  ) : (
    <div className="posts">
      {posts.map((post, i) => (
        <PostItem key={i} post={post} />
      ))}
    </div>
  );
};

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Post);
