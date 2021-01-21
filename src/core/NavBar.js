import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signOut } from "../auth/helper";
import "../styles.css";
import brand from "../Images/brand.png";

const currentTab = (history, path) => {
  if (history.location.pathname == path) {
    return { color: "#fff", background: "#1988FE", borderRadius: "15px" };
  } else {
    return { color: "#ffffff" };
  }
};

const NavBar = ({ history, path }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top navBackgroundClassChanger">
      <div className="container">
        <Link className="navbar-brand" to="#">
          <img
            src={brand}
            width="140"
            height="40"
            className="d-inline-block align-top animate__animated animate__pulse"
            alt=""
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                style={currentTab(history, "/")}
                to="/"
                className="nav-link nav-custom-class mr-1 mb-1 pl-2"
              >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>

            {isAuthenticated() && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/cart")}
                  className="nav-link nav-custom-class mr-1 mb-1 pl-2"
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/user/dashboard")}
                  className="nav-link nav-custom-class mr-1 mb-1 pl-2"
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/admin/dashboard")}
                  className="nav-link nav-custom-class mr-1 mb-1 pl-2"
                  to="/admin/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                style={currentTab(history, "/about")}
                className="nav-link nav-custom-class mr-1 mb-1 pl-2"
                to="/about"
              >
                About
              </Link>
            </li>

            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signup")}
                    className="nav-link nav-custom-class mr-1 mb-1 pl-2"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={currentTab(history, "/signin")}
                    className="nav-link nav-custom-class mr-1 mb-1 pl-2"
                    to="/signin"
                  >
                    Signin
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <li className="nav-item nav__signout">
                <span
                  onClick={() => {
                    signOut(() => {
                      history.push("/");
                    });
                  }}
                  className="nav-link text-white mr-1 mb-1 pl-2"
                >
                  Signout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(NavBar);
