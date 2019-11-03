import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Map from '../maps-autocomplete/maps-autocomplete.component'

import { createPost } from "../../redux/post/post.actions";

const PostForm = ({ props, createPost, history }) => {
  const [postData, setPostData] = useState({
    image: "",
    caption: null,
    location: null
  });

  const { image, caption, location } = postData;
  
  const onFileChange = e =>
    setPostData({ ...postData, [e.target.name]: e.target.files[0] });

  const onChange = e =>
    setPostData({ ...postData, [e.target.name]: e.target.value });
  
  const updateLocation = location => {
    setPostData({ ...postData, location: location });
    console.log(location)
  }

  const onSubmit = async e => {
    e.preventDefault();
    let newPost = new FormData();

    newPost.append("image", image);
    newPost.append("caption", caption);
    newPost.append("location", location);

    createPost(newPost, history);
  };

  return (
    <div>
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center" style={{ color: "white" }}>
                Create Post
              </h5>
              <hr style={{ border: ".5px solid black" }} />
              <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="inputGroupFile01" style={{ color: "white" }}>
                    Choose Image*
                  </label>
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
                  <label
                    htmlFor="formGroupExampleInput"
                    style={{ color: "white" }}
                  >
                    Caption*
                  </label>
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
                <label
                    htmlFor=""
                    style={{ color: "white" }}
                  >
                    Location
                  </label>
                <Map updateLocation={updateLocation}/>
                <button type="submit" className="btn btn-dark btn-block mt-4">
                  Submit
                </button>
                <small className="text-white">Fields marked with * are required</small>
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
