import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Profile = ({}) => {};

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Profile);
