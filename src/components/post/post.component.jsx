import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../redux/post/post.actions";

import PostItem from "../post-item/post-item.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Post = ({ getPosts, post: { posts, loading }, state }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
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
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Post);
