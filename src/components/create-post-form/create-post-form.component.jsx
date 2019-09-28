import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { createPost } from "../../redux/post/post.actions";

const PostForm = ({ props, createPost, history }) => {
  const [postData, setPostData] = useState({
    image: "",
    caption: null
  });

  const { image, caption } = postData;

  const onFileChange = e =>
    setPostData({ ...postData, [e.target.name]: e.target.files[0] });

  const onChange = e =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    let newPost = new FormData();

    newPost.append("image", image);
    newPost.append("caption", caption);

    createPost(newPost, history);
  };

  return (
    <div>
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Post</h5>
              <hr />
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="inputGroupFile01">Choose Image</label>
                  <div className="input-group mb-3">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        name="image"
                        // value={image}
                        onChange={e => onFileChange(e)}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        {image === "" ? (
                          <span>Choose a file...</span>
                        ) : (
                          <span>File Selected - {image.name}</span>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">Caption</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Enter a image caption"
                    name="caption"
                    value={caption}
                    onChange={e => onChange(e)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  props: ownProps
});

export default connect(
  mapStateToProps,
  { createPost }
)(withRouter(PostForm));
