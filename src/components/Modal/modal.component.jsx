import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./modal.css";

const divStyle = {
  display: "block"
};

const Modal = ({ isShowing, hide, post: { image, caption, userAlias } }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="modal"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            display="block"
            style={divStyle}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header rounded-0 border-bottom-0">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    <Link className="" to={`/profile/${userAlias}`}>
                      <FontAwesomeIcon icon={faUser} className="fontAwesome" />
                      {userAlias}
                    </Link>
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-content rounded-0 border-bottom-0">
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    className="modal-content rounded-0 border-0"
                    alt=""
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
