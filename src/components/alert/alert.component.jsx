import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./alert.css";

const Alert = ({ alerts }) => {
  return (
    <div className="container">
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert, i) => (
          <div
            key={i}
            className={`alert alert-${alert.alertType}`}
            role="alert"
          >
            {alert.message}
          </div>
        ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
