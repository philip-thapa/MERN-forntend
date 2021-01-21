import React from "react";
import { Link } from "react-router-dom";
import quote1 from "../Images/quote1.png";
import quote2 from "../Images/quote2.png";
import quote3 from "../Images/quote3.png";

const CarouselFunc = () => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide container-fluid px-0 my-4"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src={quote1}
            alt="First slide"
            height="350px"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={quote2}
            alt="Second slide"
            height="350px"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src={quote3}
            alt="Third slide"
            height="350px"
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default CarouselFunc;
