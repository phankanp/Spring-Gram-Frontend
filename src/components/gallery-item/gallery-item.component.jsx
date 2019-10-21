import React from "react";

import Modal from "../Modal/modal.component";
import useModal from "../../utils/modal/useModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart as farHeartFilled,
  faTrashAlt,
  faEllipsisH,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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
    likeCount,
    imageUrl
  }
}) => {
  const { isShowing, toggle } = useModal();
  return (
    <div className="col-lg-4 col-md-6">
      <div className="hovereffect">
        <button
          type="button"
          className="btn toggle-button imageButton"
          id="centered-toggle-button"
          onClick={toggle}
        >
          <img
            src={imageUrl}
            className="img-fluid galleryItemImgFluid"
            alt=""
          ></img>
          <div class="overlay">
            <div className="row overlayRow justify-content-center">
              <p className="mr-3 text-white">
                <FontAwesomeIcon
                  icon={farHeartFilled}
                  className="fontAwesome overlayHeart fa-lg"
                />{" "}
                {likes.length}
              </p>
              <p className="mr-3 text-white">
                <FontAwesomeIcon
                  icon={faComment}
                  className="fontAwesome overlayComment fa-lg"
                />{" "}
                {comments.length}
              </p>
            </div>
          </div>
        </button>
        <Modal isShowing={isShowing} hide={toggle} post={post} />
      </div>
    </div>
  );
};

export default GalleryItem;
