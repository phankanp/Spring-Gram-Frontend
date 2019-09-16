import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../redux/post/post.actions";
import classnames from "classnames";

class AddPostForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "",
      caption: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFileChange(e) {
    this.setState({
      image: e.target.files[0]
    });
  }

  onChange(e) {
    this.setState({
      caption: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let newPost = new FormData();

    newPost.append("file", this.state.image);
    newPost.append("caption", this.state.caption);

    this.props.createPost(newPost, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Post</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="inputGroupFile01">Choose Image</label>
                    <div className="input-group mb-3">
                      <div className="custom-file">
                        <input
                          type="file"
                          className={classnames("custom-file-input", {
                            "is-invalid": errors.message
                          })}
                          id="inputGroupFile01"
                          aria-describedby="inputGroupFileAddon01"
                          name="image"
                          onChange={this.onFileChange}
                        />
                        {errors.message && (
                          <div className="invalid-feedback">
                            {errors.message}
                          </div>
                        )}
                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile01"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Caption</label>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.caption
                      })}
                      id="formGroupExampleInput"
                      placeholder="Enter a image caption"
                      name="caption"
                      // value={this.state.caption}
                      onChange={this.onChange}
                    />
                    {errors.caption && (
                      <div className="invalid-feedback">{errors.caption}</div>
                    )}
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
  }
}

AddPostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPost }
)(AddPostForm);
