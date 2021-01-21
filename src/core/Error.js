import React from "react";
import Base from "./Base";
import errorImage from "../Images/404.svg";

const Error = () => {
  return (
    <Base title="Error">
      <div className="container">
        <div className="row text-center">
          <div className="col-12 col-md-6">
            <img src={errorImage} alt="" />
          </div>
          <div className="col-12 col-md-6 mt-5 text-center">
            <h2 className="text-warning">Page not found</h2>
            <h4>We're sorry, we couldn't find the page you requested.</h4>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Error;
