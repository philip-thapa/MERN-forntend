import React from "react";
import NavBar from "./NavBar";
import "../styles.css";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Base = ({ title = "", description = "", className = "", children }) => {
  return (
    <div>
      <ToastContainer position="bottom-center" />
      <NavBar />
      <div className="container-fluid px-0">
        <div
          className={`jumbotron bg-Secondary text-dark text-center my-5 my-md-3 py-md-5 ${className}`}
        >
          <h2 className="display-4 text-dark animate__animated animate__bounceInDown jumbo-title mt-3">
            <strong>{title}</strong>
          </h2>
          <p className="lead animate__animated animate__slideInLeft">
            {description}
          </p>
        </div>
        <div className="container">
          <div className="my-4">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
