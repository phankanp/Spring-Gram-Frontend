import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Post from "../../components/post/post.component";
import Following from "../../components/following/following.component";

const HomePage = ({ auth }) => {
  return (
    <div className="container">
      {auth.loading ? (
        <div className=" container text-center">null</div>
      ) : auth.user === null ? (
        <div>
          <Post />
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-8">
            <Post />
          </div>
          <div className="col-sm-4 col-sm-offset-1">
            <div className="col-sm-4 position-fixed">
              <Following auth={auth} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Following.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HomePage);
