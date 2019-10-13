import React, { useEffect } from "react";
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
      <h5 className="display-4 text-center" style={{ color: "white" }}>
        Gallery
      </h5>
      <hr style={{ border: ".5px solid black" }} />
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
