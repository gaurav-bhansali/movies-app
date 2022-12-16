import React from "react";
import cross from "./assets/cross.png";

const map = (month) => {
  if (month === "01") return "Jan";
  if (month === "02") return "Feb";
  if (month === "03") return "March";
  if (month === "04") return "Apr";
  if (month === "05") return "May";
  if (month === "06") return "June";
  if (month === "07") return "July";
  if (month === "08") return "Aug";
  if (month === "09") return "Sep";
  if (month === "10") return "Oct";
  if (month === "11") return "Nov";
  if (month === "12") return "Dec";
};

const formatDate = (date) => {
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const year = date.substring(0, 4);
  return map(month) + " " + day + ", " + year;
};

//Modal is opened when a user clicks on the card title and is closed when
// user clicks on the cross button or the backdrop
const Modal = ({
  title,
  rating,
  overview,
  image,
  vote_count,
  release_date,
  closeModel,
}) => {
  return (
    <div className="backdrop" onClick={closeModel}>
      <div className="modal">
        <div className="modal-header">
          <h1>{title}</h1>
          <img
            alt="cross"
            src={cross}
            onClick={closeModel}
            className="modal-header-img"
          ></img>
        </div>
        <div className="modal-container">
          <img src={image} alt={title} className="modal-img"></img>
          <div className="modal-info">
            <p className="release-date">
              <b>Release date : </b>
              {formatDate(release_date)}
            </p>
            <p>{overview}</p>
            <span>
              <b>{rating}</b> / 10 ({vote_count} total votes)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
