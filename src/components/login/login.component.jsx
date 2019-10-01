import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../redux/auth/auth.actions";

import formLogo from "../../images/instagram.png";

import "./login.css";

const Login = ({ login, isAuthenticated }, props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-md-center">
          <div
            className="col-sm-4 border border-primary shadow rounded pt-2"
            style={{ backgroundColor: "white" }}
          >
            <div className="text-center">
              <h1>Sign In!</h1>
              <img src={formLogo} alt="registration from logo" />
              <div>
                <div className="col-sm-12 text-left">
                  <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="username"
                        value={username}
                        onChange={e => onChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                    <small
                      id="toRegister"
                      className="form-text text-muted text-center"
                    >
                      Don't have an account?{" "}
                      <Link to="/register">Click to register!</Link>
                    </small>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
