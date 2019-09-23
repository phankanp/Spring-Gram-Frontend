import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setAlert } from "../../redux/alert/alert.actions";
import { register } from "../../redux/auth/auth.actions";

import "./register.css";
import formLogo from "../../images/instagram.png";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    alias: "",
    fullName: "",
    password: "",
    confirmPassword: ""
  });

  const { username, alias, fullName, password, confirmPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ username, alias, fullName, password, confirmPassword });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="register-form d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-sm-4 border border-primary shadow rounded pt-2">
            <div className="text-center">
              <h1>Register!</h1>
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
                      <label htmlFor="alias">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="alias"
                        placeholder="Enter Username"
                        name="alias"
                        value={alias}
                        onChange={e => onChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter First and Last Name"
                        name="fullName"
                        value={fullName}
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
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={e => onChange(e)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                    <small
                      id="toRegister"
                      className="form-text text-muted text-center"
                    >
                      Already have an account?{" "}
                      <Link to="/login">Sign in here!</Link>
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
