import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../redux/auth/auth.actions.js";
import homeLogo from "../../images/instagram-home.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import "./navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authenticatedUserLinks = (
    <div className="navbar-nav">
      <Link className="nav-item nav-link" to="/gallery">
        <FontAwesomeIcon icon={faImages} className="fontAwesome" />
        Gallery
      </Link>
      <Link className="nav-item nav-link" to="/addPost">
        <FontAwesomeIcon icon={faPlus} className="fontAwesome" />
        Create Post
      </Link>
      {user === null ? (
        <Link className="nav-item nav-link" to="/profile">
          <FontAwesomeIcon icon={faUser} className="fontAwesome" />
          Profile
        </Link>
      ) : (
        <Link className="nav-item nav-link" to={`/profile/${user.alias}`}>
          <FontAwesomeIcon icon={faUser} className="fontAwesome" />
          Profile
        </Link>
      )}
      <Link className="nav-item nav-link" onClick={logout} to="/">
        <FontAwesomeIcon icon={faSignOutAlt} className="fontAwesome" />
        Logout
      </Link>
    </div>
  );

  const guestLinks = (
    <div className="navbar-nav">
      <Link className="nav-item nav-link" to="/gallery">
        <FontAwesomeIcon icon={faImages} className="fontAwesome" />
        Gallery
      </Link>
      <Link className="nav-item nav-link" to="/login">
        <FontAwesomeIcon icon={faSignInAlt} className="fontAwesome" />
        Login
      </Link>
      <Link className="nav-item nav-link" to="/register">
        <FontAwesomeIcon icon={faUserPlus} className="fontAwesome" />
        Sign-Up
      </Link>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <Link className="navbar-brand" to="/">
        <img
          src={homeLogo}
          className="d-inline-block align-top"
          width="30"
          height="30"
          alt=""
        />
        Spring-Gram
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavAltMarkup"
      >
        {!loading && (
          <Fragment>
            {isAuthenticated ? authenticatedUserLinks : guestLinks}
          </Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
