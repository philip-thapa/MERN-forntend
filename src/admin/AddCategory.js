import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <Link className="btn btn-sm btn-info mb-3 mb-3" to="/admin/dashboard">
      Admin Home
    </Link>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Categegory created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to add category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            placeholder="For Ex. Summer"
            required
            autoFocus
            className="form-control my-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={onSubmit}
            type="button"
            className="btn btn-outline-dark"
          >
            Create category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a category here "
      description=" Add a new categegory for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
