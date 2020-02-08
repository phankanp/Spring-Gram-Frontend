import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../redux/auth/auth.actions";

import "./login.css";

const GuestLogin = ({ login, isAuthenticated }, props) => {
  const onGuestSubmit = e => {
    const username = "guestUser@gmail.com";
    const password = "password";

    login(username, password);
  };

  return (
    <small id="toRegister" className="form-text text-muted text-center">
      Don't want to register?
      <Link onClick={() => onGuestSubmit()}> Click to Login as a Guest!</Link>
    </small>
  );
};

GuestLogin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(GuestLogin);
