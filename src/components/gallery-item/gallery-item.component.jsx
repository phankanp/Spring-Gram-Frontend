import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Modal from "../Modal/modal.component";
import useModal from "../../utils/modal/useModal";

import "./gallery-item.css";

const GalleryItem = ({
  post,
  post: {
    id,
    image,
    caption,
    createDateTime,
    updateDateTime,
    likes,
    comments,
    userAlias,
    likeCount
  }
}) => {
  const { isShowing, toggle } = useModal();
  return (
    <div className="col-lg-4 col-md-6">
      <div className="hvr-grow">
        <button
          type="button"
          className="btn toggle-button"
          id="centered-toggle-button"
          onClick={toggle}
        >
          <img
            src={`data:image/jpeg;base64,${image}`}
            className="img-fluid"
            alt=""
          ></img>
        </button>
        <Modal isShowing={isShowing} hide={toggle} post={post} />
      </div>
    </div>
  );
};

export default GalleryItem;
