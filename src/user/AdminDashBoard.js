import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Naviation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              to="/admin/create/category"
              className="nav nav-link text-success"
            >
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to="/admin/create/product"
              className="nav nav-link text-success"
            >
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav nav-link text-success">
              Manage products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/order" className="nav nav-link text-success">
              Mange Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin area"
      description="Manage all your products here"
      className="container bg-info p-4"
    >
      <div className="row">
        <div className="col-12 col-lg-3 order-2 order-lg-1">
          {adminLeftSide()}
        </div>
        <div className="col-12 col-lg-9 order-1 order-lg-2">
          {adminRightSide()}
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
