import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPosts } from "../../redux/post/post.actions";

import GalleryItem from "../gallery-item/gallery-item.component";

const Gallery = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        {posts.map((post, i) => (
          <GalleryItem key={i} post={post} />
        ))}
      </div>
    </div>
  );
};

Gallery.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Gallery);
