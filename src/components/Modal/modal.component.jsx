import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import "./modal.css";

const divStyle = {
  display: "block"
};

const Modal = ({
  isShowing,
  hide,
  post: { image, caption, userAlias, userProfileImage }
}) =>
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
                    <Link className="header-alias" to={`/profile/${userAlias}`}>
                      <img
                        className="rounded-circle float-left fontAwesome border border-info"
                        alt="100x100"
                        src={`data:image/jpeg;base64,${userProfileImage}`}
                        data-holder-rendered="true"
                        style={{ height: "33px", width: "33px" }}
                      />
                      <text
                        className=" align-self-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        {userAlias}
                      </text>
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
