import React, { useState } from "react";
import Modal from "./Modal";

import dummy from "./assets/dummy.jpg";

const Card = ({ image, title, rating, release_date, vote_count, overview }) => {
  let img = "";
  if (image === "default") {
    img = dummy;
  } else img = `https://image.tmdb.org/t/p/original/${image}`;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="card">
      <img
        src={img}
        alt={title}
        className="card-img"
        style={{ width: "100%" }}
      />
      <div className="container">
        <h2 onClick={openModal}>{title}</h2>
        <span className="rating">{rating}</span>
      </div>

      {isModalOpen && (
        <Modal
          release_date={release_date}
          vote_count={vote_count}
          image={img}
          overview={overview}
          rating={rating}
          title={title}
          closeModel={closeModel}
        />
      )}
    </div>
  );
};

export default Card;
